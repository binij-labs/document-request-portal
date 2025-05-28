import React from "react";
import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  error: string | null;
}

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="flex items-start px-4 py-3 mb-4 border rounded bg-error-50 border-error-200 text-error-700">
      <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
      <div>{error}</div>
    </div>
  );
};

export default FormError;
