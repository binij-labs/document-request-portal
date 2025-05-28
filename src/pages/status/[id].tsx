import React, { useEffect, useState } from 'react';
import { navigate, PageProps } from 'gatsby';
import Layout from '@/components/Layout';
import { RequestStatus } from '@/store/requestStore';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  FileText, 
  AlertCircle,
  Loader,
  ArrowLeft,
  Download,
  RefreshCw
} from 'lucide-react';
import { Helmet } from 'react-helmet';
import { getRequestStatus } from '@/services/apiService';

interface StatusPageProps extends PageProps {
  params: {
    id: string;
  };
}

const StatusDetailPage: React.FC<StatusPageProps> = ({ params }) => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  
  const fetchStatus = async () => {
    if (!params.id) {
      navigate('/status');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getRequestStatus(params.id);
      setRequestStatus(response.requestStatus);
    } catch (err) {
      setError('Unable to retrieve request status. Please check your request ID and try again.');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };
  
  useEffect(() => {
    fetchStatus();
  }, [params.id]);
  
  const handleRefresh = () => {
    setRefreshing(true);
    fetchStatus();
  };
  
  const getStatusColor = () => {
    if (!requestStatus) return 'bg-gray-100 text-gray-600';
    
    switch (requestStatus.status.toLowerCase()) {
      case 'pending':
        return 'bg-warning-50 text-warning-700';
      case 'under review':
        return 'bg-primary-50 text-primary-700';
      case 'completed':
        return 'bg-success-50 text-success-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
  
  const getStatusIcon = () => {
    if (!requestStatus) return <Clock className="w-5 h-5" />;
    
    switch (requestStatus.status.toLowerCase()) {
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'under review':
        return <Loader className="w-5 h-5" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };
  
  return (
    <Layout>
      <Helmet>
        <title>Request Status - DocuRequest</title>
      </Helmet>
      
      <div className="py-8 text-white bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/status')}
            className="inline-flex items-center mb-4 transition-colors text-primary-100 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Status Search
          </button>
          <h1 className="mb-2 text-3xl font-bold text-white">Request Status</h1>
          <p className="text-primary-100">
            {params.id ? `Request ID: ${params.id}` : 'Request Details'}
          </p>
        </div>
      </div>
      
      <div className="max-w-3xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="p-8 -mt-8 text-center bg-white rounded-lg shadow animate-fade-in">
            <div className="flex flex-col items-center justify-center py-8">
              <Loader className="w-12 h-12 mb-4 text-primary-500 animate-spin" />
              <h2 className="mb-2 text-xl font-semibold text-gray-900">Retrieving Request Status</h2>
              <p className="text-gray-600">Please wait while we fetch the latest information...</p>
            </div>
          </div>
        ) : error ? (
          <div className="p-8 -mt-8 bg-white rounded-lg shadow animate-fade-in">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-error-50 text-error-500">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-gray-900">Request Not Found</h2>
              <p className="max-w-md mb-6 text-gray-600">{error}</p>
              <button
                onClick={() => navigate('/status')}
                className="btn-primary"
              >
                Return to Status Search
              </button>
            </div>
          </div>
        ) : requestStatus ? (
          <div className="-mt-8 overflow-hidden bg-white rounded-lg shadow animate-fade-in">
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
                    {getStatusIcon()}
                    <span className="ml-2">{requestStatus.status}</span>
                  </div>
                  <h2 className="mt-2 text-2xl font-bold text-gray-900">Document Request</h2>
                </div>
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="text-gray-500 transition-colors hover:text-primary-600"
                >
                  <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
              
              <div className="grid gap-6 mb-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-500">Submitted Date</h3>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                    <p className="font-medium text-gray-900">{requestStatus.submittedDate}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-500">Estimated Completion</h3>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                    <p className="font-medium text-gray-900">{requestStatus.estimatedCompletionDate}</p>
                  </div>
                </div>
              </div>
              
              {requestStatus.notes && (
                <div className="p-4 mb-6 rounded-lg bg-gray-50">
                  <h3 className="mb-2 text-lg font-medium text-gray-900">Status Notes</h3>
                  <p className="text-gray-700">{requestStatus.notes}</p>
                </div>
              )}
              
              <div className="flex flex-col items-center pt-4 border-t border-gray-200 sm:flex-row sm:justify-between">
                <div className="flex items-center mb-4 sm:mb-0">
                  <FileText className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="text-gray-700">
                    Request ID: <span className="font-medium">{requestStatus.id}</span>
                  </span>
                </div>
                
                <button
                  type="button"
                  className="flex items-center w-full btn-secondary sm:w-auto"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Status Report
                </button>
              </div>
            </div>
            
            {requestStatus.status === 'Completed' && (
              <div className="p-6 border-t bg-success-50 border-success-100">
                <div className="flex items-start">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 rounded-full bg-success-100 text-success-700">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-medium text-success-900">Your document is ready!</h3>
                    <p className="mb-4 text-success-800">
                      Your requested document has been processed and is now available for download or pickup.
                    </p>
                    <button className="btn-primary bg-success-600 hover:bg-success-700 focus:ring-success-500">
                      Access Document
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : null}
        
        <div className="mt-12">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Request Timeline</h2>
          
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <ul className="divide-y divide-gray-200">
              <li className="p-4">
                <div className="flex items-start">
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3 rounded-full bg-primary-100 text-primary-600">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Request Submitted</p>
                    <p className="text-sm text-gray-500">
                      {requestStatus?.submittedDate || 'N/A'}
                    </p>
                  </div>
                </div>
              </li>
              
              <li className={`p-4 ${requestStatus?.status === 'Pending' ? 'opacity-50' : ''}`}>
                <div className="flex items-start">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                    requestStatus?.status === 'Under Review' || requestStatus?.status === 'Completed'
                      ? 'bg-primary-100 text-primary-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Under Review</p>
                    <p className="text-sm text-gray-500">
                      {requestStatus?.status === 'Under Review' || requestStatus?.status === 'Completed'
                        ? 'Your request is being processed by our team'
                        : 'Pending processing'}
                    </p>
                  </div>
                </div>
              </li>
              
              <li className={`p-4 ${requestStatus?.status !== 'Completed' ? 'opacity-50' : ''}`}>
                <div className="flex items-start">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                    requestStatus?.status === 'Completed'
                      ? 'bg-success-100 text-success-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Request Completed</p>
                    <p className="text-sm text-gray-500">
                      {requestStatus?.status === 'Completed'
                        ? 'Your document is ready for access'
                        : `Estimated: ${requestStatus?.estimatedCompletionDate || 'N/A'}`}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StatusDetailPage;