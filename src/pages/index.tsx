import "../styles/global.css";
import * as React from "react";
import { Link, type PageProps } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";

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
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;
