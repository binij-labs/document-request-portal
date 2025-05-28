import { DocumentInfo, FileInfo, PersonalInfo } from "@/store/requestStore";

export const toFormData = (
  personalInfo: PersonalInfo,
  documentInfo: DocumentInfo,
  fileInfo: FileInfo
): FormData => {
  const formData = new FormData();

  formData.append("fullName", personalInfo.fullName);
  formData.append("email", personalInfo.email);
  formData.append("phone", personalInfo.phone);

  formData.append("documentType", documentInfo.type);
  if (documentInfo.licenseNumber)
    formData.append("licenseNumber", documentInfo.licenseNumber);
  if (documentInfo.referenceNumber)
    formData.append("referenceNumber", documentInfo.referenceNumber);
  if (documentInfo.issueDate)
    formData.append("issueDate", documentInfo.issueDate);
  if (documentInfo.additionalInfo)
    formData.append("additionalInfo", documentInfo.additionalInfo);

  if (fileInfo.file) {
    formData.append("file", fileInfo.file);
  }
  return formData;
};
