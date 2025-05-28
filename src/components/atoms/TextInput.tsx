import React from "react";
import { Field, FieldProps } from "formik";
import { AlertCircle } from "lucide-react";

interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  type = "text",
  placeholder = "",
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
            <input
              {...field}
              type={type}
              id={name}
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

export default TextInput;
