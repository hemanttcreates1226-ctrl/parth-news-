import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Converts any CSS color string (including oklch, oklab, color(display-p3), etc.)
 * into standard hex or rgba using an off-screen canvas context.
 */
function sanitizeColorValue(val: string): string {
  if (!val || typeof val !== 'string') return val;
  if (
    !val.includes('oklch') &&
    !val.includes('oklab') &&
    !val.includes('color(') &&
    !val.includes('color-mix') &&
    !val.includes('lch(')
  ) {
    return val;
  }

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '#222222';

    return val.replace(/oklch\([^)]+\)|oklab\([^)]+\)|color\([^)]+\)|color-mix\([^)]+\)/gi, (match) => {
      try {
        ctx.fillStyle = '#000000';
        ctx.fillStyle = match;
        return ctx.fillStyle || '#333333';
      } catch {
        return '#333333';
      }
    });
  } catch {
    return '#333333';
  }
}

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

    // Capture with high scale and oklch-sanitization in cloned document
    const canvas = await html2canvas(cardElement, {
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#FFFFFF',
      logging: false,
      onclone: (clonedDoc: Document, clonedEl: HTMLElement) => {
        // 1. Sanitize all stylesheet rules in the cloned document that might contain oklch
        try {
          const styleElements = clonedDoc.querySelectorAll('style');
          styleElements.forEach((styleTag) => {
            if (
              styleTag.textContent &&
              (styleTag.textContent.includes('oklch') ||
                styleTag.textContent.includes('oklab') ||
                styleTag.textContent.includes('color('))
            ) {
              styleTag.textContent = sanitizeColorValue(styleTag.textContent);
            }
          });
        } catch (e) {
          console.warn('Style tag sanitization warning:', e);
        }

        // 2. Explicitly sanitize inline & computed colors on all nodes of the ID card
        try {
          const allNodes = [clonedEl, ...Array.from(clonedEl.querySelectorAll('*'))] as HTMLElement[];
          allNodes.forEach((node) => {
            if (!node || !node.style) return;

            const computed = window.getComputedStyle(node);
            const checkProps = [
              'backgroundColor',
              'color',
              'borderColor',
              'borderTopColor',
              'borderRightColor',
              'borderBottomColor',
              'borderLeftColor',
              'outlineColor',
              'boxShadow'
            ] as const;

            checkProps.forEach((prop) => {
              const val = computed[prop];
              if (val && typeof val === 'string' && (val.includes('oklch') || val.includes('oklab'))) {
                (node.style as any)[prop] = sanitizeColorValue(val);
              }
            });

            // Clean inline style attribute if present
            const styleAttr = node.getAttribute('style');
            if (styleAttr && (styleAttr.includes('oklch') || styleAttr.includes('oklab'))) {
              node.setAttribute('style', sanitizeColorValue(styleAttr));
            }
          });
        } catch (e) {
          console.warn('Node style sanitization warning:', e);
        }
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
