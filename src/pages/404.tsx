import React from 'react';
import { Link } from 'gatsby';
import Layout from '@/components/Layout';
import { FileQuestion } from 'lucide-react';
import { Helmet } from 'react-helmet';

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Page Not Found - DocuRequest</title>
      </Helmet>
      
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-primary-100 text-primary-600">
            <FileQuestion className="w-12 h-12" />
          </div>
          
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Page Not Found</h1>
          
          <p className="max-w-md mx-auto mb-8 text-xl text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
            
            <Link to="/status" className="btn-secondary">
              Check Request Status
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;