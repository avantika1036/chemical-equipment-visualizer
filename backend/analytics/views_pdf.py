from io import BytesIO
from django.http import FileResponse, Http404
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
)
from reportlab.lib import colors
from datetime import datetime

from .models import EquipmentDataset


def generate_pdf(request, dataset_id):
    try:
        dataset = EquipmentDataset.objects.get(id=dataset_id)
    except EquipmentDataset.DoesNotExist:
        raise Http404("Dataset not found")

    buffer = BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=2 * cm,
        leftMargin=2 * cm,
        topMargin=2 * cm,
        bottomMargin=2 * cm,
    )

    styles = getSampleStyleSheet()

    # =====================
    # CUSTOM STYLES (Lovable-like)
    # =====================
    title_style = ParagraphStyle(
        "title",
        parent=styles["Title"],
        alignment=TA_CENTER,
        fontSize=20,
        spaceAfter=10,
    )

    subtitle_style = ParagraphStyle(
        "subtitle",
        parent=styles["Normal"],
        alignment=TA_CENTER,
        fontSize=10,
        textColor=colors.grey,
        spaceAfter=4,
    )

    section_style = ParagraphStyle(
        "section",
        parent=styles["Heading2"],
        fontSize=14,
        spaceBefore=20,
        spaceAfter=10,
    )

    elements = []

    # =====================
    # TITLE
    # =====================
    elements.append(
        Paragraph("Chemical Equipment Report", title_style)
    )

    elements.append(
        Paragraph(
            f"Generated from: {dataset.file.name.split('/')[-1]}",
            subtitle_style,
        )
    )

    elements.append(
        Paragraph(
            f"Upload Date: {dataset.uploaded_at.strftime('%d %b %Y, %H:%M')}",
            subtitle_style,
        )
    )

    elements.append(
        Paragraph(
            f"Report Generated: {datetime.now().strftime('%d %b %Y, %H:%M')}",
            subtitle_style,
        )
    )

    elements.append(Spacer(1, 20))

    # =====================
    # SUMMARY
    # =====================
    elements.append(
        Paragraph("Summary Statistics", section_style)
    )

    summary_table = Table(
        [
            ["Metric", "Value"],
            ["Total Equipment", dataset.total_equipment],
            ["Average Flowrate", f"{dataset.avg_flowrate:.2f} m³/h"],
            ["Average Pressure", f"{dataset.avg_pressure:.2f} bar"],
            ["Average Temperature", f"{dataset.avg_temperature:.2f} °C"],
        ],
        colWidths=[8 * cm, 6 * cm],
    )

    summary_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#2980b9")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.lightgrey),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("BOTTOMPADDING", (0, 0), (-1, 0), 10),
                ("TOPPADDING", (0, 0), (-1, 0), 10),
            ]
        )
    )

    elements.append(summary_table)

    # =====================
    # TYPE DISTRIBUTION
    # =====================
    elements.append(
        Paragraph("Equipment Type Distribution", section_style)
    )

    type_rows = [["Equipment Type", "Count", "Percentage"]]

    total = dataset.total_equipment or 1

    for k, v in dataset.type_distribution.items():
        percent = (v / total) * 100
        type_rows.append([k, v, f"{percent:.1f}%"])

    type_table = Table(
        type_rows,
        colWidths=[6 * cm, 4 * cm, 4 * cm],
    )

    type_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#27ae60")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.lightgrey),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("BOTTOMPADDING", (0, 0), (-1, 0), 10),
                ("TOPPADDING", (0, 0), (-1, 0), 10),
            ]
        )
    )

    elements.append(type_table)
    elements.append(PageBreak())

    # =====================
    # EQUIPMENT DATA
    # =====================
    elements.append(
        Paragraph("Equipment Data", section_style)
    )

    equipment_rows = [
        ["Name", "Type", "Flowrate", "Pressure", "Temperature"]
    ]

    for row in dataset.data:
        equipment_rows.append(
            [
                row["equipmentName"],
                row["type"],
                f'{row["flowrate"]} m³/h',
                f'{row["pressure"]} bar',
                f'{row["temperature"]} °C',
            ]
        )

    equipment_table = Table(
        equipment_rows,
        repeatRows=1,
        colWidths=[6 * cm, 3 * cm, 3 * cm, 3 * cm, 3 * cm],
    )

    equipment_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#8e44ad")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.25, colors.lightgrey),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, 0), 8),
                ("TOPPADDING", (0, 0), (-1, 0), 8),
            ]
        )
    )

    elements.append(equipment_table)

    # =====================
    # BUILD
    # =====================
    doc.build(elements)

    buffer.seek(0)

    return FileResponse(
        buffer,
        as_attachment=True,
        filename=f"equipment_report_{dataset.id}.pdf",
        content_type="application/pdf",
    )
