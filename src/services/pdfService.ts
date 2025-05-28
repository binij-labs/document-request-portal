import { jsPDF } from 'jspdf';
import { PersonalInfo, DocumentInfo } from '@/store/requestStore';

export const generateRequestSummaryPDF = (
  requestId: string,
  personalInfo: PersonalInfo,
  documentInfo: DocumentInfo,
  submissionDate: string
): void => {
  const doc = new jsPDF();
  
  // Add logo/header
  doc.setFontSize(22);
  doc.setTextColor(37, 99, 235); // primary-600
  doc.text('DocuRequest', 105, 20, { align: 'center' });
  
  // Title
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text('Document Request Summary', 105, 30, { align: 'center' });
  
  // Request ID and Date
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Request ID: ${requestId}`, 20, 45);
  doc.text(`Submission Date: ${submissionDate}`, 20, 52);
  
  // Horizontal line
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 58, 190, 58);
  
  // Personal Information
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Personal Information', 20, 70);
  
  doc.setFontSize(12);
  doc.setTextColor(60, 60, 60);
  doc.text(`Full Name: ${personalInfo.fullName}`, 30, 80);
  doc.text(`Email: ${personalInfo.email}`, 30, 87);
  doc.text(`Phone: ${personalInfo.phone}`, 30, 94);
  
  // Document Information
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Document Information', 20, 110);
  
  doc.setFontSize(12);
  doc.setTextColor(60, 60, 60);
  doc.text(`Document Type: ${documentInfo.type}`, 30, 120);
  
  let yPos = 127;
  
  if (documentInfo.licenseNumber) {
    doc.text(`License Number: ${documentInfo.licenseNumber}`, 30, yPos);
    yPos += 7;
  }
  
  if (documentInfo.referenceNumber) {
    doc.text(`Reference Number: ${documentInfo.referenceNumber}`, 30, yPos);
    yPos += 7;
  }
  
  if (documentInfo.issueDate) {
    doc.text(`Issue Date: ${documentInfo.issueDate}`, 30, yPos);
    yPos += 7;
  }
  
  if (documentInfo.additionalInfo) {
    doc.text('Additional Information:', 30, yPos);
    yPos += 7;
    
    // Wrap additional info text
    const splitText = doc.splitTextToSize(documentInfo.additionalInfo, 150);
    doc.text(splitText, 30, yPos);
  }
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text('This is an automatically generated document summary.', 105, 280, { align: 'center' });
    doc.text(`Page ${i} of ${pageCount}`, 105, 287, { align: 'center' });
  }
  
  // Save the PDF
  doc.save(`DocuRequest_${requestId}.pdf`);
};