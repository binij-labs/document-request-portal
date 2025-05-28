import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define types for our document request
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
}

export interface DocumentInfo {
  type: string;
  licenseNumber?: string;
  referenceNumber?: string;
  issueDate?: string;
  additionalInfo?: string;
}

export interface FileInfo {
  file: File | null;
  preview: string | null;
}

export interface RequestStatus {
  id: string;
  status: "Pending" | "Under Review" | "Completed";
  estimatedCompletionDate: string;
  submittedDate: string;
  notes?: string;
}

export interface RequestState {
  step: number;
  personalInfo: PersonalInfo;
  documentInfo: DocumentInfo;
  fileInfo: FileInfo;
  requestStatus: RequestStatus | null;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submissionError: string | null;

  // Actions
  setStep: (step: number) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateDocumentInfo: (info: Partial<DocumentInfo>) => void;
  updateFileInfo: (info: Partial<FileInfo>) => void;
  setRequestStatus: (status: RequestStatus) => void;
  resetRequest: () => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
  setSubmissionError: (error: string | null) => void;
}

// Default/initial state
const initialState = {
  step: 0,
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
  },
  documentInfo: {
    type: "",
    licenseNumber: "",
    referenceNumber: "",
    issueDate: "",
    additionalInfo: "",
  },
  fileInfo: {
    file: null,
    preview: null,
  },
  requestStatus: null,
  isSubmitting: false,
  isSubmitted: false,
  submissionError: null,
};

// Create store with persistence
export const useRequestStore = create<RequestState>()(
  persist(
    (set) => ({
      ...initialState,

      setStep: (step) => set({ step }),

      updatePersonalInfo: (info) =>
        set((state) => ({
          personalInfo: { ...state.personalInfo, ...info },
        })),

      updateDocumentInfo: (info) =>
        set((state) => ({
          documentInfo: { ...state.documentInfo, ...info },
        })),

      updateFileInfo: (info) =>
        set((state) => ({
          fileInfo: { ...state.fileInfo, ...info },
        })),

      setRequestStatus: (status) => set({ requestStatus: status }),

      resetRequest: () =>
        set({
          ...initialState,
          // We don't reset the request status
          requestStatus: null,
        }),

      setIsSubmitting: (isSubmitting) => set({ isSubmitting }),

      setIsSubmitted: (isSubmitted) => set({ isSubmitted }),

      setSubmissionError: (submissionError) => set({ submissionError }),
    }),

    {
      name: "document-request-store",
    }
  )
);
