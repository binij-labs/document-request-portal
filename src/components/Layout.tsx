import { Link } from "gatsby";
import { FileText } from "lucide-react";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="bg-white shadow-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/\" className="flex items-center">
                <FileText className="w-8 h-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  DocuRequest
                </span>
              </Link>
            </div>
            <nav className="flex space-x-8">
              <Link
                to="/"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600"
              >
                Home
              </Link>
              <Link
                to="/status"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600"
              >
                Check Status
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      {/* Footer Section */}
      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-center">
              <FileText className="w-6 h-6 text-primary-600" />
              <span className="ml-2 text-lg font-semibold text-gray-900">
                DocuRequest
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-600 md:mt-0">
              &copy; {new Date().getFullYear()} DocuRequest. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
