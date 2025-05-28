import React, { useEffect, useState, useRef } from "react";
import { navigate } from "gatsby";
import { Formik, Form } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Layout from "@/components/Layout";
import { useRequestStore } from "@/store/requestStore";
import { FileText, XCircle } from "lucide-react";
import { Helmet } from "react-helmet";
import { documentTypes, requestSteps } from "@/constants";
import { StepProgress } from "@/components/molecules";
import { FileInput } from "@/components/atoms";
import { FileInputRef } from "@/components/atoms/FileInput";

const Step3Page: React.FC = () => {
  const { personalInfo, documentInfo, fileInfo, updateFileInfo, setStep } =
    useRequestStore();

  const [filePreview, setFilePreview] = useState<string | null>(
    fileInfo.preview
  );
  
  const fileInputRef = useRef<FileInputRef>(null);

  useEffect(() => {
    if (!personalInfo.fullName || !documentInfo.type) {
      navigate("/request/step1");
    }
  }, [personalInfo, documentInfo]);

  const validationSchema = z.object({
    file: z
      .any()
      .refine((file) => file instanceof File, "Supporting document is required")
      .refine((file) => {
        if (!file) return false;
        const supportedFormats = [
          "application/pdf",
          "image/jpeg",
          "image/png",
          "image/gif",
        ];
        return supportedFormats.includes(file.type);
      }, "Unsupported file format. Please upload a PDF or image file.")
      .refine((file) => {
        if (!file) return false;
        const maxSize = 5 * 1024 * 1024; // 5MB
        return file.size <= maxSize;
      }, "File size is too large. Maximum allowed size is 5MB."),
  });

  const handleFileChange = (file: File | null) => {
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setFilePreview(result);
          updateFileInfo({ file, preview: result });
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
        updateFileInfo({ file, preview: null });
      }
    } else {
      setFilePreview(null);
      updateFileInfo({ file: null, preview: null });
    }
  };

  const handleSubmit = () => {
    setStep(3);
    navigate("/request/review");
  };

  const handleBack = () => {
    setStep(1);
    navigate("/request/step2");
  };

  const clearFile = (setFieldValue: (field: string, value: any) => void) => {
    setFilePreview(null);
    updateFileInfo({ file: null, preview: null });
    setFieldValue("file", null);
    fileInputRef.current?.clearInput();
  };

  return (
    <Layout>
      <Helmet>
        <title>Supporting Documents - DocuRequest</title>
      </Helmet>

      <div className="max-w-3xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <StepProgress currentStep={2} steps={requestSteps} />

        <div className="p-6 bg-white rounded-lg shadow md:p-8 animate-fade-in">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">
            Upload Supporting Documents
          </h1>

          <div className="mb-4 text-gray-600">
            <p>
              Please upload any supporting documentation that will help us
              process your request for a{" "}
              <span className="font-semibold">
                {documentTypes.find((d) => d.value === documentInfo.type)
                  ?.label || documentInfo.type}
              </span>
              .
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Accepted formats: PDF, JPEG, PNG, GIF. Maximum file size: 5MB.
            </p>
          </div>

          <Formik
            initialValues={{ file: fileInfo.file }}
            validationSchema={toFormikValidationSchema(validationSchema)}
            onSubmit={handleSubmit}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({ isValid, values, setFieldValue }) => (
              <Form className="space-y-4">
                <FileInput
                  ref={fileInputRef}
                  label="Supporting Document"
                  name="file"
                  accept="image/*,application/pdf"
                  required
                  onFileChange={handleFileChange}
                  initialFile={fileInfo.file}
                />

                {filePreview && (
                  <div className="relative mt-4">
                    <div className="absolute z-10 -top-2 -right-2">
                      <button
                        type="button"
                        onClick={() => clearFile(setFieldValue)}
                        className="text-gray-500 transition-colors hover:text-error-500"
                      >
                        <XCircle className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="overflow-hidden border border-gray-200 rounded-md">
                      <img
                        src={filePreview}
                        alt="Document preview"
                        className="mx-auto max-h-60"
                      />
                    </div>
                  </div>
                )}

                {values.file && !filePreview && (
                  <div className="relative flex items-center p-4 mt-4 border border-gray-200 rounded-md bg-gray-50">
                    <div className="absolute -top-2 -right-2">
                      <button
                        type="button"
                        onClick={() => clearFile(setFieldValue)}
                        className="text-gray-500 transition-colors hover:text-error-500"
                      >
                        <XCircle className="w-6 h-6" />
                      </button>
                    </div>
                    <FileText className="w-8 h-8 mr-3 text-primary-600" />
                    <div>
                      <p className="font-medium text-gray-700">
                        {values.file.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {(values.file.size / 1024 / 1024).toFixed(2)} MB •{" "}
                        {values.file.type}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-secondary"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={!isValid || !values.file}
                    className={`btn-primary ${
                      !isValid || !values.file
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Continue to Review
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default Step3Page;