import jsPDF from 'jspdf';

/**
 * Generate a PDF visibility report for the user
 * @param {Object} userData - User's onboarding data (brandName, websiteUrl, etc.)
 * @returns {Blob} PDF blob for download
 */
export function generateVisibilityReport(userData) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Brand colors
    const primaryColor = [220, 38, 38]; // Red
    const textColor = [15, 23, 42]; // Slate 900
    const lightGray = [241, 245, 249]; // Slate 100

    // Header Section
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('AI Visibility Report', pageWidth / 2, 20, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Powered by Searchlyst', pageWidth / 2, 30, { align: 'center' });

    // Company Info Section
    let yPos = 55;
    doc.setTextColor(...textColor);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(userData.brandName || 'Your Brand', 20, yPos);

    yPos += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139); // Slate 500
    doc.text(userData.websiteUrl || 'website.com', 20, yPos);

    yPos += 6;
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    doc.text(`Generated: ${currentDate}`, 20, yPos);

    // Divider
    yPos += 10;
    doc.setDrawColor(...lightGray);
    doc.setLineWidth(0.5);
    doc.line(20, yPos, pageWidth - 20, yPos);

    // Performance Summary Section
    yPos += 15;
    doc.setTextColor(...textColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('AI Platform Visibility Score', 20, yPos);

    yPos += 10;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Your brand\'s visibility across major AI search platforms', 20, yPos);

    // Mock visibility data (in real app, this would come from actual scans)
    const platforms = [
        { name: 'ChatGPT', score: 78, mentions: 12, citations: 8 },
        { name: 'Claude', score: 65, mentions: 9, citations: 5 },
        { name: 'Perplexity', score: 82, mentions: 15, citations: 11 },
        { name: 'Gemini', score: 71, mentions: 10, citations: 7 },
        { name: 'Bing AI', score: 58, mentions: 7, citations: 4 },
    ];

    // Table Header
    yPos += 15;
    const tableStartY = yPos;
    const colWidths = [60, 35, 35, 35];
    const colX = [20, 80, 115, 150];

    doc.setFillColor(...lightGray);
    doc.rect(20, yPos - 5, pageWidth - 40, 10, 'F');

    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Platform', colX[0] + 2, yPos);
    doc.text('Score', colX[1] + 2, yPos);
    doc.text('Mentions', colX[2] + 2, yPos);
    doc.text('Citations', colX[3] + 2, yPos);

    // Table Rows
    yPos += 10;
    doc.setFont('helvetica', 'normal');
    platforms.forEach((platform, index) => {
        if (index % 2 === 0) {
            doc.setFillColor(249, 250, 251);
            doc.rect(20, yPos - 5, pageWidth - 40, 10, 'F');
        }

        doc.setTextColor(...textColor);
        doc.text(platform.name, colX[0] + 2, yPos);

        // Score with color
        const scoreColor = platform.score >= 75 ? [34, 197, 94] : platform.score >= 60 ? [251, 146, 60] : [239, 68, 68];
        doc.setTextColor(...scoreColor);
        doc.setFont('helvetica', 'bold');
        doc.text(`${platform.score}%`, colX[1] + 2, yPos);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...textColor);
        doc.text(platform.mentions.toString(), colX[2] + 2, yPos);
        doc.text(platform.citations.toString(), colX[3] + 2, yPos);

        yPos += 10;
    });

    // Summary Stats
    yPos += 10;
    const avgScore = Math.round(platforms.reduce((sum, p) => sum + p.score, 0) / platforms.length);
    const totalMentions = platforms.reduce((sum, p) => sum + p.mentions, 0);
    const totalCitations = platforms.reduce((sum, p) => sum + p.citations, 0);

    doc.setFillColor(254, 242, 242); // Red 50
    doc.roundedRect(20, yPos, pageWidth - 40, 25, 3, 3, 'F');

    yPos += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...textColor);
    doc.text('Overall Summary', 25, yPos);

    yPos += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Average Visibility Score: ${avgScore}%  |  Total Mentions: ${totalMentions}  |  Total Citations: ${totalCitations}`, 25, yPos);

    // Onboarding Info Section
    yPos += 20;
    doc.setTextColor(...textColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Your Brand Profile', 20, yPos);

    yPos += 10;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');

    const profileData = [
        { label: 'Experience Level', value: userData.seoLevel || 'N/A' },
        { label: 'Primary Location', value: userData.primaryLocation || 'N/A' },
        { label: 'Core Topics', value: userData.coreTopics || 'N/A' },
        { label: 'Target Audience', value: userData.targetAudience || 'N/A' },
    ];

    profileData.forEach(item => {
        doc.setTextColor(100, 116, 139);
        doc.text(`${item.label}:`, 25, yPos);
        doc.setTextColor(...textColor);
        doc.text(item.value, 75, yPos);
        yPos += 6;
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // Slate 400
    doc.text('This report was generated automatically. Data is updated daily.', pageWidth / 2, pageHeight - 15, { align: 'center' });
    doc.text('© 2026 Searchlyst', pageWidth / 2, pageHeight - 10, { align: 'center' });

    // Return blob for download
    return doc.output('blob');
}

/**
 * Download the PDF report
 * @param {Blob} pdfBlob - PDF blob from generateVisibilityReport
 * @param {string} filename - Name of the file to download
 */
export function downloadPDF(pdfBlob, filename = 'ai-visibility-report.pdf') {
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
