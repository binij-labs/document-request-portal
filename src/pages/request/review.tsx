import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import Layout from "@/components/Layout";
import { useRequestStore } from "@/store/requestStore";
import {
  FileText,
  User,
  Mail,
  Phone,
  Calendar,
  Hash,
  AlertTriangle,
  Download,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { documentTypes, requestSteps } from "@/constants";
import StepProgress from "@/components/molecules/StepProgress";
import { generateRequestSummaryPDF } from "@/services/pdfService";
import { submitRequest } from "@/services/apiService";

const ReviewPage: React.FC = () => {
  const {
    personalInfo,
    documentInfo,
    fileInfo,
    setStep,
    isSubmitting,
    setIsSubmitting,
    submissionError,
    setSubmissionError,
    setRequestStatus,
    isSubmitted,
    setIsSubmitted,
    requestStatus,
  } = useRequestStore();

  const [currentDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    if (!personalInfo.fullName || !documentInfo.type || !fileInfo.file) {
      navigate("/request/step1");
    }
  }, [personalInfo, documentInfo, fileInfo]);

  const handleEdit = (step: number) => {
    setStep(step);
    navigate(`/request/step${step + 1}`);
  };

  const handleSubmit = async () => {
    if (!fileInfo.file) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
        const response = await submitRequest(
          personalInfo,
          documentInfo,
          fileInfo
        );

        setRequestStatus({
          id: response.requestId,
          status: 'Pending',
          estimatedCompletionDate: response.estimatedCompletionDate,
          submittedDate: currentDate,
          notes: 'Your request has been received and is in the queue for processing.',
        });

      setIsSubmitted(true);
    } catch (error) {
      setSubmissionError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGeneratePDF = () => {
    if (!requestStatus) return;

  
  };

  const handleViewStatus = () => {
    if (!requestStatus) return;
    navigate(`/status/${requestStatus.id}`);
  };

  const getDocumentTypeName = (value: string) => {
    return documentTypes.find((type) => type.value === value)?.label || value;
  };

  return (
    <Layout>
      <Helmet>
        <title>Review Request - DocuRequest</title>
      </Helmet>

      <div className="max-w-3xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <StepProgress currentStep={3} steps={requestSteps} />

        <div className="p-6 bg-white rounded-lg shadow md:p-8 animate-fade-in">
          {!isSubmitted ? (
            <>
              <h1 className="mb-6 text-2xl font-bold text-gray-900">
                Review Your Request
              </h1>

              <div className="space-y-8">
                {/* Personal Information */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Personal Information
                    </h2>
                    <button
                      type="button"
                      onClick={() => handleEdit(0)}
                      className="text-sm text-primary-600 hover:text-primary-800"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="text-gray-900">{personalInfo.fullName}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="text-gray-900">{personalInfo.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="text-gray-900">{personalInfo.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Document Information */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Document Information
                    </h2>
                    <button
                      type="button"
                      onClick={() => handleEdit(1)}
                      className="text-sm text-primary-600 hover:text-primary-800"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start">
                      <FileText className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Document Type</p>
                        <p className="text-gray-900">
                          {getDocumentTypeName(documentInfo.type)}
                        </p>
                      </div>
                    </div>

                    {documentInfo.licenseNumber && (
                      <div className="flex items-start">
                        <Hash className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">
                            License Number
                          </p>
                          <p className="text-gray-900">
                            {documentInfo.licenseNumber}
                          </p>
                        </div>
                      </div>
                    )}

                    {documentInfo.referenceNumber && (
                      <div className="flex items-start">
                        <Hash className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">
                            Reference Number
                          </p>
                          <p className="text-gray-900">
                            {documentInfo.referenceNumber}
                          </p>
                        </div>
                      </div>
                    )}

                    {documentInfo.issueDate && (
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Issue Date</p>
                          <p className="text-gray-900">
                            {documentInfo.issueDate}
                          </p>
                        </div>
                      </div>
                    )}

                    {documentInfo.additionalInfo && (
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">
                            Additional Information
                          </p>
                          <p className="text-gray-900">
                            {documentInfo.additionalInfo}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Supporting Document */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Supporting Document
                    </h2>
                    <button
                      type="button"
                      onClick={() => handleEdit(2)}
                      className="text-sm text-primary-600 hover:text-primary-800"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="space-y-2">
                    {fileInfo.file && (
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-gray-400" />
                        <div>
                          <p className="text-gray-900">{fileInfo.file.name}</p>
                          <p className="text-sm text-gray-500">
                            {(fileInfo.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    )}

                    {fileInfo.preview && (
                      <div className="mt-2 overflow-hidden border border-gray-200 rounded-md">
                        <img
                          src={fileInfo.preview}
                          alt="Document preview"
                          className="mx-auto max-h-40"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Section */}
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <p className="mb-4 text-gray-700">
                    Please review all information carefully before submitting
                    your document request. Once submitted, you will receive a
                    confirmation with a unique tracking ID.
                  </p>

                  {submissionError && (
                    <div className="flex items-start p-3 mb-4 rounded-md bg-error-50 text-error-700">
                      <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <p>{submissionError}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleEdit(2)}
                      className="btn-secondary"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex items-center btn-primary"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="py-6 text-center animate-fade-in">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-success-50 text-success-500">
                <CheckCircle className="w-8 h-8" />
              </div>

              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                Request Submitted!
              </h1>

              <p className="max-w-lg mx-auto mb-6 text-gray-600">
                Your document request has been successfully submitted. You can
                track the status of your request using the information below.
              </p>

              <div className="max-w-md p-6 mx-auto mb-6 text-left rounded-lg bg-gray-50">
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Request ID</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {requestStatus?.id}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500">Submission Date</p>
                  <p className="text-gray-900">
                    {requestStatus?.submittedDate}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Estimated Completion</p>
                  <p className="text-gray-900">
                    {requestStatus?.estimatedCompletionDate}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                <button
                  type="button"
                  onClick={handleGeneratePDF}
                  className="flex items-center justify-center btn-secondary"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Summary
                </button>

                <button
                  type="button"
                  onClick={handleViewStatus}
                  className="flex items-center justify-center btn-primary"
                >
                  View Request Status
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ReviewPage;
