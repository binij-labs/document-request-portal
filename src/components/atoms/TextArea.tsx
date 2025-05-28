import React from "react";
import { Field, FieldProps } from "formik";
import { AlertCircle } from "lucide-react";

interface TextAreaProps {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  placeholder = "",
  rows = 4,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label} {required && <span className="text-error-500">*</span>}
      </label>
      <Field name={name}>
        {({ field, meta }: FieldProps) => (
          <div>
            <textarea
              {...field}
              id={name}
              rows={rows}
              placeholder={placeholder}
              disabled={disabled}
              className={`input-field ${
                meta.touched && meta.error
                  ? "border-error-500 focus:border-error-500 focus:ring-error-500"
                  : ""
              }`}
            />
            {meta.touched && meta.error && (
              <div className="flex items-center mt-1 error-message">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>{meta.error}</span>
              </div>
            )}
          </div>
        )}
      </Field>
    </div>
  );
};

export default TextArea