import "../styles/global.css";
import * as React from "react";
import { Link, type PageProps } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "@/components/Layout";
import { ArrowRight, CheckCircle, Clock, FileText } from "lucide-react";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Helmet>
        <title>DocuRequest - Document Request Portal</title>
        <meta
          name="description"
          content="Request official documents online with DocuRequest - fast, secure, and easy."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="text-white bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 md:py-20">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 md:pr-10 animate-fade-in">
              <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
                Request Documents <br className="hidden md:block" />
                with Ease
              </h1>
              <p className="max-w-xl mb-8 text-xl text-primary-100">
                A simple, secure way to request official documents online. Get
                your birth certificates, licenses, and official records without
                the hassle.
              </p>
              <Link
                to="/request/step1"
                className="inline-flex items-center px-6 py-3 text-base font-medium transition-colors duration-200 bg-white border border-transparent rounded-md shadow-sm text-primary-700 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-700 focus:ring-white"
              >
                Start Your Request
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
            <div className="hidden mt-10 md:block md:w-1/2 md:mt-0 animate-slide-up">
              <div className="relative h-64 md:h-96">
                <div className="absolute inset-0 transform bg-white rounded-lg shadow-2xl -rotate-6 opacity-20"></div>
                <div className="absolute inset-0 transform bg-white rounded-lg shadow-2xl rotate-3 opacity-20"></div>
                <div className="absolute inset-0 transform bg-white rounded-lg shadow-2xl rotate-1 opacity-20"></div>
                <div className="absolute inset-0 bg-white rounded-lg shadow-xl">
                  <div className="p-6">
                    <div className="w-1/4 h-4 mb-4 rounded bg-primary-200"></div>
                    <div className="w-3/4 h-4 mb-4 rounded bg-primary-200"></div>
                    <div className="w-1/2 h-4 mb-6 rounded bg-primary-200"></div>

                    <div className="w-full h-10 mb-4 rounded-md bg-primary-100"></div>
                    <div className="w-full h-10 mb-4 rounded-md bg-primary-100"></div>
                    <div className="w-full h-10 mb-4 rounded-md bg-primary-100"></div>

                    <div className="w-1/3 h-12 mx-auto mt-8 rounded-md bg-primary-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
              Our simple 3-step process makes requesting documents quick and
              hassle-free
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="p-6 transition-shadow duration-300 rounded-lg shadow-sm bg-gray-50 hover:shadow-md">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary-100 text-primary-600">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Fill Your Details</h3>
              <p className="text-gray-600">
                Complete our simple form with your personal information and
                specify which document you need.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 transition-shadow duration-300 rounded-lg shadow-sm bg-gray-50 hover:shadow-md">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary-100 text-primary-600">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Track Your Request</h3>
              <p className="text-gray-600">
                Use your unique reference number to check the status of your
                document request at any time.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 transition-shadow duration-300 rounded-lg shadow-sm bg-gray-50 hover:shadow-md">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary-100 text-primary-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Receive Document</h3>
              <p className="text-gray-600">
                Once processed, you'll be notified and can access your official
                document securely online.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/request/step1"
              className="inline-flex items-center px-4 py-2 text-base font-medium transition-colors text-primary-600 hover:text-primary-800"
            >
              Start Your Document Request{" "}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Documents Available: TODO */}

      {/* CTA Section : TODO */}
    </Layout>
  );
};

export default IndexPage;
