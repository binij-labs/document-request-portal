import React from "react";
import { Field, FieldProps } from "formik";
import { AlertCircle } from "lucide-react";

interface SelectInputProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  options,
  placeholder = "Select an option",
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
            <select
              {...field}
              id={name}
              disabled={disabled}
              className={`input-field ${
                meta.touched && meta.error
                  ? "border-error-500 focus:border-error-500 focus:ring-error-500"
                  : ""
              }`}
            >
              <option value="" disabled>
                {placeholder}
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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

export default SelectInput