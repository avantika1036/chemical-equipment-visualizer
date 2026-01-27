from django.db import models


class EquipmentDataset(models.Model):
    file = models.FileField(upload_to="uploads/")
    original_filename = models.CharField(
        max_length=255,
        default="dataset.csv"
    )

    uploaded_at = models.DateTimeField(auto_now_add=True)

    total_equipment = models.IntegerField()
    avg_flowrate = models.FloatField()
    avg_pressure = models.FloatField()
    avg_temperature = models.FloatField()

    # Stores count per equipment type
    type_distribution = models.JSONField()

    # Stores full CSV rows
    data = models.JSONField(default=list)

    def __str__(self):
        return f"{self.original_filename} ({self.id})"
