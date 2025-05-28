import React from 'react';
import { Check } from 'lucide-react';

interface StepProgressProps {
  currentStep: number;
  steps: string[];
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep, steps }) => {
  return (
    <div className="py-12">
      {/* Desktop view */}
      <div className="hidden sm:block">
        <div className="relative max-w-3xl mx-auto">
          <nav className="flex items-center justify-between">
            <div className="flex items-center w-full">
              {steps.map((step, index) => (
                <React.Fragment key={step}>
                  {/* Connector line between steps */}
                  {index > 0 && (
                    <div 
                      className={`flex-1 h-0.5 transition-colors duration-200 ${
                        index <= currentStep ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  {/* Step circle and label */}
                  <div className="relative flex flex-col items-center group">
                    <div 
                      className={`
                        h-10 w-10 flex items-center justify-center rounded-full 
                        border-2 transition-all duration-200
                        ${index < currentStep 
                          ? 'bg-primary-600 border-primary-600 text-white' 
                          : index === currentStep 
                            ? 'border-primary-600 text-primary-600' 
                            : 'border-gray-300 text-gray-500'
                        }
                      `}
                    >
                      {index < currentStep ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <span 
                      className={`
                        absolute mt-14 text-sm font-medium text-center w-32 
                        transition-colors duration-200
                        ${index <= currentStep ? 'text-gray-900' : 'text-gray-500'}
                      `}
                    >
                      {step}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile view */}
      <div className="sm:hidden">
        <div className="flex items-center justify-center space-x-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`
                h-2 w-2 rounded-full transition-all duration-200
                ${index <= currentStep 
                  ? 'bg-primary-600' 
                  : 'bg-gray-300'
                }
              `}
            />
          ))}
        </div>
        <p className="mt-4 text-sm font-medium text-center text-gray-900">
          Step {currentStep + 1} of {steps.length}:{' '}
          <span className="text-primary-600">{steps[currentStep]}</span>
        </p>
      </div>
    </div>
  );
};

export default StepProgress;