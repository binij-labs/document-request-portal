import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { Field, FieldProps } from "formik";
import { AlertCircle } from "lucide-react";

interface FileInputProps {
  label: string;
  name: string;
  accept?: string;
  required?: boolean;
  disabled?: boolean;
  onFileChange?: (file: File | null) => void;
  initialFile?: File | null;
}

export interface FileInputRef {
  clearInput: () => void;
}

const FileInput = forwardRef<FileInputRef, FileInputProps>(
  (
    {
      label,
      name,
      accept = "image/*,application/pdf",
      required = false,
      disabled = false,
      onFileChange,
      initialFile = null,
    },
    ref
  ) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const formikSetFieldValueRef = useRef<
      ((field: string, value: any) => void) | null
    >(null);

    const [fileName, setFileName] = useState(initialFile?.name || "");

    useEffect(() => {
      if (initialFile && formikSetFieldValueRef.current) {
        formikSetFieldValueRef.current(name, initialFile);
        setFileName(initialFile.name);
      }
    }, [initialFile, name]);

    useImperativeHandle(ref, () => ({
      clearInput: () => {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        if (formikSetFieldValueRef.current) {
          formikSetFieldValueRef.current(name, null);
        }
        setFileName("");
        if (onFileChange) {
          onFileChange(null);
        }
      },
    }));

    return (
      <div className="mb-4">
        <label htmlFor={name} className="form-label">
          {label} {required && <span className="text-error-500">*</span>}
        </label>
        <Field name={name}>
          {({ form, meta }: FieldProps) => {
            formikSetFieldValueRef.current = form.setFieldValue;

            return (
              <div>
                <div
                  className={`cursor-pointer flex items-center w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                    rounded-md border border-gray-300 px-4 py-2
                    ${meta.touched && meta.error ? "border-error-500" : ""}
                    ${
                      disabled
                        ? "bg-gray-100 cursor-not-allowed"
                        : "hover:bg-primary-50"
                    }
                  `}
                  onClick={() => !disabled && fileInputRef.current?.click()}
                >
                  <span className="truncate">{fileName || "Choose file"}</span>
                </div>

                <input
                  ref={fileInputRef}
                  id={name}
                  type="file"
                  accept={accept}
                  disabled={disabled}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0] || null;
                    form.setFieldValue(name, file);
                    setFileName(file?.name || "");
                    if (onFileChange) {
                      onFileChange(file);
                    }
                  }}
                />

                {meta.touched && meta.error && (
                  <div className="flex items-center mt-1 text-sm error-message text-error-500">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    <span>{meta.error}</span>
                  </div>
                )}
              </div>
            );
          }}
        </Field>
      </div>
    );
  }
);

export default FileInput;
