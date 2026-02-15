// utils/generatePDF.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type EstimateData = {
  roomType: string;
  sqft: number;
  material: string;
  laborCost: number;
  materialCost: number;
  total: number;
};

export function generateEstimatePDF(data: EstimateData) {
  const pdf = new jsPDF({ unit: "pt" });

  /* -------- BRAND HEADER (Bold Contractor Style) -------- */
  pdf.setFillColor(30, 30, 30); // black header
  pdf.rect(0, 0, 600, 90, "F");

  pdf.setFontSize(26);
  pdf.setTextColor(255, 130, 0); // orange
  pdf.setFont("helvetica", "bold");
  pdf.text("MARK-REMODELING", 30, 55);

  pdf.setFontSize(11);
  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "normal");
  pdf.text("Official Renovation Estimate", 32, 75);

  /* -------- CUSTOMER SECTION -------- */
  pdf.setFontSize(14);
  pdf.setTextColor(0, 0, 0);
  pdf.setFont("helvetica", "bold");
  pdf.text("Project Summary", 30, 130);

  autoTable(pdf, {
    startY: 150,
    theme: "grid",
    headStyles: { fillColor: [255, 130, 0] },
    bodyStyles: { fontSize: 11 },
    head: [["Field", "Value"]],
    body: [
      ["Room Type", data.roomType],
      ["Square Footage", `${data.sqft} sq ft`],
      ["Material Choice", data.material],
    ],
  });

  /* -------- COST BREAKDOWN -------- */
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("Cost Breakdown", 30, (pdf as any).lastAutoTable?.finalY + 40);

  autoTable(pdf, {
    startY: (pdf as any).lastAutoTable?.finalY + 60,
    theme: "grid",
    headStyles: { fillColor: [0, 0, 0] },
    head: [["Description", "Amount"]],
    body: [
      ["Labor Cost", `$${data.laborCost.toLocaleString()}`],
      ["Material Cost", `$${data.materialCost.toLocaleString()}`],
    ],
  });

  /* -------- TOTAL BOX -------- */
  const finalY = (pdf as any).lastAutoTable?.finalY + 50;

  pdf.setFillColor(255, 130, 0); // bold orange box
  pdf.rect(30, finalY, 540, 70, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.text("ESTIMATED TOTAL:", 40, finalY + 32);

  pdf.setFontSize(28);
  pdf.text(`$${data.total.toLocaleString()}`, 40, finalY + 62);

  /* -------- FOOTER -------- */
  pdf.setTextColor(120);
  pdf.setFontSize(10);
  pdf.text(
    "This estimate is based on average labor & material pricing in your area. Final quote may vary after inspection.",
    30,
    780
  );

  pdf.save(`estimate-${data.roomType.replace(" ", "_")}.pdf`);
}
