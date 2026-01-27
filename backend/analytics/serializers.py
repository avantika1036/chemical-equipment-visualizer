from rest_framework import serializers
from .models import EquipmentDataset


# ============================
# CSV upload serializer
# ============================
class CSVUploadSerializer(serializers.Serializer):
    file = serializers.FileField()


# ============================
# Dataset serializer (FULL)
# Used for history + API responses
# ============================
class EquipmentDatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipmentDataset
        fields = [
            "id",
            "file",
            "uploaded_at",

            "total_equipment",
            "avg_flowrate",
            "avg_pressure",
            "avg_temperature",

            "type_distribution",
            "data",
        ]
