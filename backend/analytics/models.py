from django.db import models


class EquipmentDataset(models.Model):
    file = models.FileField(upload_to="uploads/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    total_equipment = models.IntegerField()
    avg_flowrate = models.FloatField()
    avg_pressure = models.FloatField()
    avg_temperature = models.FloatField()

    # Stores count per equipment type
    type_distribution = models.JSONField()

    # ✅ NEW: stores full CSV rows
    data = models.JSONField(default=list)

    def __str__(self):
        return f"Dataset {self.id} - {self.uploaded_at.strftime('%Y-%m-%d %H:%M')}"
