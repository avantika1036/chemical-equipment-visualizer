import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import EquipmentDataset
from .serializers import CSVUploadSerializer


class CSVUploadAPIView(APIView):
    serializer_class = CSVUploadSerializer

    def post(self, request):
        serializer = CSVUploadSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        file = serializer.validated_data["file"]

        # =====================
        # READ CSV
        # =====================
        try:
            df = pd.read_csv(file)
        except Exception:
            return Response(
                {"error": "Invalid CSV file"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        required_columns = [
            "Equipment Name",
            "Type",
            "Flowrate",
            "Pressure",
            "Temperature",
        ]

        for col in required_columns:
            if col not in df.columns:
                return Response(
                    {"error": f"Missing column: {col}"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        # =====================
        # 🔥 CRITICAL FIX
        # Convert to numeric
        # =====================
        df["Flowrate"] = pd.to_numeric(df["Flowrate"], errors="coerce")
        df["Pressure"] = pd.to_numeric(df["Pressure"], errors="coerce")
        df["Temperature"] = pd.to_numeric(df["Temperature"], errors="coerce")

        # Remove invalid rows
        df = df.dropna(
            subset=["Flowrate", "Pressure", "Temperature"]
        )

        # =====================
        # CSV ROWS
        # =====================
        rows = []
        for _, row in df.iterrows():
            rows.append({
                "equipmentName": str(row["Equipment Name"]),
                "type": str(row["Type"]),
                "flowrate": float(row["Flowrate"]),
                "pressure": float(row["Pressure"]),
                "temperature": float(row["Temperature"]),
            })

        # =====================
        # CALCULATIONS
        # =====================
        total_equipment = len(rows)

        avg_flowrate = float(df["Flowrate"].mean())
        avg_pressure = float(df["Pressure"].mean())
        avg_temperature = float(df["Temperature"].mean())

        type_distribution = (
            df["Type"]
            .value_counts()
            .to_dict()
        )

        # =====================
        # SAVE DATASET
        # =====================
        dataset = EquipmentDataset.objects.create(
            file=file,
            total_equipment=total_equipment,
            avg_flowrate=avg_flowrate,
            avg_pressure=avg_pressure,
            avg_temperature=avg_temperature,
            type_distribution=type_distribution,
            data=rows,
        )

        # Keep only last 5 uploads
        datasets = EquipmentDataset.objects.order_by("-uploaded_at")
        if datasets.count() > 5:
            for d in datasets[5:]:
                d.delete()

        # =====================
        # ✅ FRONTEND RESPONSE
        # =====================
        return Response(
            {
                "id": dataset.id,
                "fileName": file.name,
                "uploadDate": dataset.uploaded_at.isoformat(),

                "total_equipment": total_equipment,
                "avg_flowrate": avg_flowrate,
                "avg_pressure": avg_pressure,
                "avg_temperature": avg_temperature,

                "type_distribution": type_distribution,
                "data": rows,
            },
            status=status.HTTP_201_CREATED,
        )


class DatasetHistoryAPIView(APIView):
    def get(self, request):
        datasets = EquipmentDataset.objects.order_by("-uploaded_at")[:5]

        history = []

        for dataset in datasets:
            history.append({
                "id": dataset.id,
                "fileName": (
                    dataset.file.name
                    if dataset.file else "dataset.csv"
                ),
                "uploadDate": dataset.uploaded_at.isoformat(),

                "total_equipment": dataset.total_equipment,
                "avg_flowrate": dataset.avg_flowrate,
                "avg_pressure": dataset.avg_pressure,
                "avg_temperature": dataset.avg_temperature,

                "type_distribution": dataset.type_distribution,
                "data": dataset.data or [],
            })

        return Response(history)
