import React, { useState } from 'react';
import { navigate } from 'gatsby';
import Layout from '@/components/Layout';
import { Formik, Form } from 'formik';
import { Helmet } from 'react-helmet';
import { FormError, TextInput } from '@/components/atoms';
import z from 'zod';
import { FileText, Search } from 'lucide-react';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const StatusPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const validationSchema = z.object({
    requestId: z.string()
      .min(4, 'Request ID must be at least 4 characters'),
  });
  
  const handleSubmit = (values: { requestId: string }) => {
    const formattedId = values.requestId.trim().toUpperCase();
    
    if (formattedId) {
      navigate(`/status/${formattedId}`);
    } else {
      setErrorMessage('Please enter a valid request ID');
    }
  };
  
  return (
    <Layout>
      <Helmet>
        <title>Check Request Status - DocuRequest</title>
      </Helmet>
      
      <div className="py-8 text-white bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-3xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-bold text-white">Check Request Status</h1>
          <p className="max-w-xl mx-auto mb-0 text-primary-100">
            Enter your request ID to track the current status of your document request
          </p>
        </div>
      </div>
      
      <div className="max-w-3xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <div className="p-6 -mt-8 bg-white rounded-lg shadow md:p-8 animate-fade-in">
          <Formik
            initialValues={{ requestId: '' }}
            validationSchema={toFormikValidationSchema(validationSchema)}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormError error={errorMessage} />
                
                <div className="mb-6">
                  <TextInput 
                    label="Request ID" 
                    name="requestId" 
                    placeholder="Enter your request ID (e.g., ABC123)" 
                    required 
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Your request ID was provided when you submitted your document request.
                  </p>
                </div>
                
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center w-full btn-primary sm:w-auto"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Check Status
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        
        <div className="mt-12">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Request Information</h2>
          
          <div className="p-6 border rounded-lg bg-primary-50 border-primary-200">
            <div className="flex items-start">
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 rounded-full bg-primary-100 text-primary-600">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">Can't find your Request ID?</h3>
                <p className="mb-4 text-gray-600">
                  If you've lost your request ID, please contact our support team with your full name and email address used during submission.
                </p>
                <a 
                  href="mailto:support@docurequest.example.com"
                  className="font-medium text-primary-600 hover:text-primary-800"
                >
                  support@docurequest.example.com
                </a>
              </div>
            </div>
          </div>
          
          <div className="grid gap-6 mt-8 md:grid-cols-2">
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-medium text-gray-900">Typical Processing Times</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-xs font-medium rounded-full bg-primary-100 text-primary-600">1</span>
                  Birth/Marriage Certificates: 7-10 days
                </li>
                <li className="flex items-start">
                  <span className="flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-xs font-medium rounded-full bg-primary-100 text-primary-600">2</span>
                  Property Records: 10-14 days
                </li>
                <li className="flex items-start">
                  <span className="flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-xs font-medium rounded-full bg-primary-100 text-primary-600">3</span>
                  License Copies: 5-7 days
                </li>
                <li className="flex items-start">
                  <span className="flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-xs font-medium rounded-full bg-primary-100 text-primary-600">4</span>
                  Other Documents: 7-14 days
                </li>
              </ul>
            </div>
            
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-medium text-gray-900">Request Status Meanings</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="px-2 py-1 mr-2 text-xs font-medium rounded-full bg-warning-50 text-warning-700">Pending</span>
                  <p className="text-sm text-gray-600">
                    Your request has been received and is waiting to be processed.
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="px-2 py-1 mr-2 text-xs font-medium rounded-full bg-primary-50 text-primary-700">Under Review</span>
                  <p className="text-sm text-gray-600">
                    Your request is currently being processed by our staff.
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="px-2 py-1 mr-2 text-xs font-medium rounded-full bg-success-50 text-success-700">Completed</span>
                  <p className="text-sm text-gray-600">
                    Your document has been processed and is ready for access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StatusPage;