// import axios from "axios";
// import { toFormData } from "@/utils/formDataUtil";

// export const submitRequest = async (
//   personalInfo: Parameters<typeof toFormData>[0],
//   documentInfo: Parameters<typeof toFormData>[1],
//   fileInfo: Parameters<typeof toFormData>[2]
// ) => {
//   const formData = toFormData(personalInfo, documentInfo, fileInfo);

//   const response = await axios.post("/api/submit-request", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return response.data;
// };

// Mock


import { PersonalInfo, DocumentInfo, FileInfo, RequestStatus } from '@/store/requestStore';

export interface SubmitRequestPayload {
  personalInfo: PersonalInfo;
  documentInfo: DocumentInfo;
  fileInfo: {
    fileName: string;
    fileType: string;
    fileSize: number;
  };
}

export interface SubmitRequestResponse {
  success: boolean;
  requestId: string;
  estimatedCompletionDate: string;
  message: string;
}

export interface GetStatusResponse {
  success: boolean;
  requestStatus: RequestStatus;
}

const API_DELAY = 1500; // Simulate network delay

// Submit a new document request
export const submitRequest = async (
  personalInfo: PersonalInfo,
  documentInfo: DocumentInfo,
  fileInfo: FileInfo
): Promise<SubmitRequestResponse> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (!fileInfo.file) {
          throw new Error('No file provided');
        }

        // Generate a random request ID
        const requestId = Math.random().toString(36).substring(2, 10).toUpperCase();
        
        // Calculate estimated completion date (7-14 days from now)
        const days = Math.floor(Math.random() * 7) + 7;
        const estimatedDate = new Date();
        estimatedDate.setDate(estimatedDate.getDate() + days);
        
        // Format as YYYY-MM-DD
        const estimatedCompletionDate = estimatedDate.toISOString().split('T')[0];

        resolve({
          success: true,
          requestId,
          estimatedCompletionDate,
          message: 'Your document request has been submitted successfully.',
        });
      } catch (error) {
        reject({
          success: false,
          message: error instanceof Error ? error.message : 'An unexpected error occurred',
        });
      }
    }, API_DELAY);
  });
};

export const getRequestStatus = async (requestId: string): Promise<GetStatusResponse> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Randomly determine status based on request ID
        const statusOptions: Array<RequestStatus['status']> = ['Pending', 'Under Review', 'Completed'];
        const randomIndex = Math.floor(Math.random() * statusOptions.length);
        const status = statusOptions[randomIndex];
        
        // Calculate dates
        const now = new Date();
        const submittedDate = new Date(now);
        submittedDate.setDate(submittedDate.getDate() - Math.floor(Math.random() * 30));
        
        const estimatedCompletionDate = new Date(submittedDate);
        estimatedCompletionDate.setDate(estimatedCompletionDate.getDate() + 14);
        
        const requestStatus: RequestStatus = {
          id: requestId,
          status,
          submittedDate: submittedDate.toISOString().split('T')[0],
          estimatedCompletionDate: estimatedCompletionDate.toISOString().split('T')[0],
          notes: status === 'Completed' 
            ? 'Your document is ready for collection.' 
            : status === 'Under Review'
              ? 'Your request is currently being processed by our team.'
              : 'Your request has been received and is in the queue for processing.',
        };

        resolve({
          success: true,
          requestStatus,
        });
      } catch (error) {
        reject({
          success: false,
          message: error instanceof Error ? error.message : 'Failed to retrieve request status',
        });
      }
    }, API_DELAY);
  });
};