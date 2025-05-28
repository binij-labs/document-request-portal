import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import { Formik, Form } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import Layout from '@/components/Layout';
import { useRequestStore } from '@/store/requestStore';
import { Helmet } from 'react-helmet';
import StepProgress from '@/components/molecules/StepProgress';
import { SelectInput, TextArea, TextInput } from '@/components/atoms';
import { documentTypes, requestSteps } from '@/constants';

const Step2Page: React.FC = () => {
  const { personalInfo, documentInfo, updateDocumentInfo, setStep } = useRequestStore();
  
  useEffect(() => {
    if (!personalInfo.fullName || !personalInfo.email || !personalInfo.phone) {
      navigate('/request/step1');
    }
  }, [personalInfo]);
  
  const validationSchema = z.object({
    type: z.string().min(1, 'Document type is required'),
    licenseNumber: z.string().optional()
      .refine(val => {
        if (documentInfo.type === 'drivers_license') {
          return val && val.length > 0;
        }
        return true;
      }, 'License number is required for driver\'s license requests'),
    referenceNumber: z.string().optional()
      .refine(val => {
        if (['tax_records', 'property_deed', 'business_registration'].includes(documentInfo.type)) {
          return val && val.length > 0;
        }
        return true;
      }, 'Reference number is required for this document type'),
    issueDate: z.string().optional()
      .refine(val => {
        if (['birth_certificate', 'marriage_certificate'].includes(documentInfo.type)) {
          return val && val.length > 0;
        }
        return true;
      }, 'Issue date is required for this document type'),
    additionalInfo: z.string().optional(),
  });
  
  
  const handleSubmit = (values: typeof documentInfo) => {
    updateDocumentInfo(values);
    setStep(2);
    navigate('/request/step3');
  };
  
  const handleBack = () => {
    setStep(0);
    navigate('/request/step1');
  };
  
  return (
    <Layout>
      <Helmet>
        <title>Document Type - DocuRequest</title>
      </Helmet>
      
      <div className="max-w-3xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <StepProgress currentStep={1} steps={requestSteps} />
        
        <div className="p-6 bg-white rounded-lg shadow md:p-8 animate-fade-in">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">Select Document Type</h1>
          
          <Formik
            initialValues={documentInfo}
            validationSchema={toFormikValidationSchema(validationSchema)}
            onSubmit={handleSubmit}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({ values, isValid }) => (
              <Form className="space-y-4">
                <SelectInput 
                  label="Document Type" 
                  name="type" 
                  options={documentTypes}
                  placeholder="Select document type" 
                  required 
                />
                
                {values.type === 'drivers_license' && (
                  <TextInput 
                    label="License Number" 
                    name="licenseNumber" 
                    placeholder="Enter your license number" 
                    required 
                  />
                )}
                
                {['tax_records', 'property_deed', 'business_registration'].includes(values.type) && (
                  <TextInput 
                    label="Reference Number" 
                    name="referenceNumber" 
                    placeholder="Enter reference/account number" 
                    required 
                  />
                )}
                
                {['birth_certificate', 'marriage_certificate'].includes(values.type) && (
                  <TextInput 
                    label="Issue Date" 
                    name="issueDate" 
                    type="date" 
                    required 
                  />
                )}
                
                <TextArea 
                  label="Additional Information" 
                  name="additionalInfo" 
                  placeholder="Please provide any additional details that may help us process your request faster." 
                  rows={4} 
                />
                
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
                    disabled={!(isValid)}
                    className={`btn-primary ${
                      !(isValid) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Continue to Supporting Documents
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

export default Step2Page;