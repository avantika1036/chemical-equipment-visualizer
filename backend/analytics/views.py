import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import EquipmentDatasetSerializer

from .models import EquipmentDataset
from .serializers import CSVUploadSerializer


class CSVUploadAPIView(APIView):
    serializer_class = CSVUploadSerializer

    def post(self, request):
        serializer = CSVUploadSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        file = serializer.validated_data["file"]

        try:
            df = pd.read_csv(file)
        except Exception:
            return Response({"error": "Invalid CSV file"}, status=400)

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
                    status=400,
                )

        total_equipment = len(df)
        avg_flowrate = float(df["Flowrate"].mean())
        avg_pressure = float(df["Pressure"].mean())
        avg_temperature = float(df["Temperature"].mean())
        type_distribution = df["Type"].value_counts().to_dict()

        dataset = EquipmentDataset.objects.create(
            file=file,
            total_equipment=total_equipment,
            avg_flowrate=avg_flowrate,
            avg_pressure=avg_pressure,
            avg_temperature=avg_temperature,
            type_distribution=type_distribution,
        )

        # keep only last 5 uploads
        datasets = EquipmentDataset.objects.order_by("-uploaded_at")
        if datasets.count() > 5:
            for d in datasets[5:]:
                d.delete()

        return Response(
            {
                "id": dataset.id,
                "total_equipment": total_equipment,
                "avg_flowrate": avg_flowrate,
                "avg_pressure": avg_pressure,
                "avg_temperature": avg_temperature,
                "type_distribution": type_distribution,
            },
            status=201,
        )

class DatasetHistoryAPIView(APIView):

    def get(self, request):
        datasets = EquipmentDataset.objects.order_by("-uploaded_at")[:5]
        serializer = EquipmentDatasetSerializer(datasets, many=True)
        return Response(serializer.data)

