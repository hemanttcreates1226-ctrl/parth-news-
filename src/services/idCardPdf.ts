import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export async function generateAndDownloadIdCardPdf(
  elementId: string,
  reporterName: string,
  reporterId: string
): Promise<boolean> {
  try {
    const cardElement = document.getElementById(elementId);
    if (!cardElement) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    // Capture with html2canvas-pro which natively parses modern CSS color spaces (oklch, oklab, etc.)
    const canvas = await html2canvas(cardElement, {
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#FFFFFF',
      logging: false,
      onclone: (_clonedDoc: Document, clonedEl: HTMLElement) => {
        // Ensure card container is fully rendered and styled
        clonedEl.style.display = 'block';
      }
    });

    const imgData = canvas.toDataURL('image/png', 1.0);

    // Create PDF in portrait orientation (A4 format)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = 210;
    // Fit width nicely in A4
    const imgWidth = 140; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const x = (pdfWidth - imgWidth) / 2;
    const y = 28;

    // Header strip on the PDF
    pdf.setFillColor(200, 16, 46); // Parth Red #C8102E
    pdf.rect(0, 0, 210, 18, 'F');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(13);
    pdf.setTextColor(255, 255, 255);
    pdf.text('PARTH NEWS DIGITAL MEDIA — OFFICIAL PRESS CREDENTIAL', 105, 12, { align: 'center' });

    // Subtitle
    pdf.setFontSize(9);
    pdf.setTextColor(80, 80, 80);
    pdf.text('Authorized Identity Card for News Gathering & Investigative Journalism', 105, 24, { align: 'center' });

    // Add captured ID Card
    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);

    // Verification footer note
    const footerY = Math.min(y + imgHeight + 12, 275);
    pdf.setFontSize(9);
    pdf.setTextColor(40, 40, 40);
    pdf.text(`Reporter ID: ${reporterId}   |   Name: ${reporterName}`, 105, footerY, { align: 'center' });

    pdf.setFontSize(8.5);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Digital Verification URL: https://parthnews.in/verify-reporter/${reporterId}`, 105, footerY + 5.5, { align: 'center' });
    pdf.text('To verify this credential, scan the official QR code on the card or visit the verification portal.', 105, footerY + 10.5, { align: 'center' });

    // Save PDF
    const sanitizedId = (reporterId || 'PN-RPT').replace(/[^a-zA-Z0-9_-]/g, '_');
    pdf.save(`Parth_News_Press_ID_${sanitizedId}.pdf`);

    return true;
  } catch (error) {
    console.error('Failed to generate ID card PDF:', error);
    return false;
  }
}
