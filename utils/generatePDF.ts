import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// 1. Updated Type Definition for AI Projects
export type EstimateData = {
  service: string;      // e.g., "AI_SaaS_Platform"
  units: number;        // e.g., 5 (Modules/Pages)
  aiModel: string;      // e.g., "L3: Agentic System"
  devCost: number;      // Engineering Hours
  computeCost: number;  // API/Token/Training Costs
  total: number;
};

export function generateEstimatePDF(data: EstimateData) {
  const doc = new jsPDF({ unit: "pt" });
  
  // Brand Colors (Gold & Black Theme)
  const COLOR_BG = [10, 10, 10] as [number, number, number];       // Almost Black
  const COLOR_ACCENT = [212, 175, 55] as [number, number, number]; // Gold (#d4af37)
  const COLOR_TEXT_MUTED = [150, 150, 150] as [number, number, number];

  /* --------------------------------------------------------
     1. HEADER: "The Terminal Look"
  -------------------------------------------------------- */
  // Dark Header Block
  doc.setFillColor(...COLOR_BG);
  doc.rect(0, 0, 600, 100, "F");

  // Logo / Brand Name
  doc.setFontSize(22);
  doc.setTextColor(...COLOR_ACCENT);
  doc.setFont("courier", "bold"); // Monospaced for tech feel
  doc.text("WEBAIGEN_CORE", 40, 55);

  // Subtitle / Protocol ID
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.setFont("courier", "normal");
  doc.text(`PROTOCOL_ID: ${Math.floor(Math.random() * 1000000)}`, 40, 75);
  
  // Timestamp
  doc.setTextColor(...COLOR_TEXT_MUTED);
  doc.text(`GENERATED: ${new Date().toLocaleDateString()}`, 400, 75);

  /* --------------------------------------------------------
     2. SYSTEM PARAMETERS (Project Specs)
  -------------------------------------------------------- */
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.text("SYSTEM ARCHITECTURE", 40, 140);

  autoTable(doc, {
    startY: 150,
    theme: "grid",
    styles: {
      font: "courier",
      fontSize: 10,
      cellPadding: 8,
      lineColor: [200, 200, 200],
      lineWidth: 0.5,
    },
    headStyles: {
      fillColor: COLOR_BG,
      textColor: COLOR_ACCENT,
      fontStyle: "bold",
    },
    head: [["PARAMETER", "CONFIGURATION"]],
    body: [
      ["ARCH_TYPE", data.service.toUpperCase()],
      ["SCALE_UNITS", `${data.units} UNITS`],
      ["NEURAL_MODEL", data.aiModel.toUpperCase()],
    ],
  });

  /* --------------------------------------------------------
     3. RESOURCE ALLOCATION (Cost Breakdown)
  -------------------------------------------------------- */
  const finalY1 = (doc as any).lastAutoTable?.finalY || 150;
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("RESOURCE ALLOCATION", 40, finalY1 + 40);

  autoTable(doc, {
    startY: finalY1 + 50,
    theme: "striped",
    styles: { font: "courier", fontSize: 10, cellPadding: 8 },
    headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255] },
    head: [["RESOURCE", "ALLOCATION (USD)"]],
    body: [
      ["Engineering & Dev Protocols", `$${data.devCost.toLocaleString()}`],
      ["Neural Compute & Training", `$${data.computeCost.toLocaleString()}`],
    ],
  });

  /* --------------------------------------------------------
     4. TOTAL COMPUTE (The Big Box)
  -------------------------------------------------------- */
  const finalY2 = (doc as any).lastAutoTable?.finalY + 40;

  // Gold Accent Bar
  doc.setFillColor(...COLOR_ACCENT);
  doc.rect(40, finalY2, 515, 5, "F");

  // Total Container
  doc.setFillColor(245, 245, 245); // Light grey box
  doc.rect(40, finalY2 + 5, 515, 70, "F");

  // Labels
  doc.setTextColor(...COLOR_BG);
  doc.setFont("courier", "bold");
  doc.setFontSize(14);
  doc.text("TOTAL PROJECTED COMPUTE:", 60, finalY2 + 45);

  // Big Price
  doc.setFontSize(24);
  doc.setTextColor(...COLOR_ACCENT); // Gold Text
  doc.text(`$${data.total.toLocaleString()}`, 350, finalY2 + 45);

  /* --------------------------------------------------------
     5. FOOTER
  -------------------------------------------------------- */
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.setFont("helvetica", "normal");
  doc.text(
    "NOTE: This data packet is an algorithmic estimate. Final resource consumption may vary based on neural complexity.",
    40,
    780
  );
  doc.text("WebAiGen Systems © 2024 // END OF LINE", 40, 795);

  // Save File
  const filename = `WEBAIGEN_${data.service.replace(/\s+/g, "_")}_EST.pdf`;
  doc.save(filename);
}