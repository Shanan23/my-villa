import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Number */}
          <div className="text-9xl font-bold text-gray-200 mb-4">404</div>
          
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          
          {/* Description */}
          <p className="text-lg text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. 
            The page might have been moved, deleted, or you entered the wrong URL.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              to="/"
              className="btn-primary inline-flex items-center justify-center w-full py-3 text-lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Go to Homepage
            </Link>
            
            <Link
              to="/villas"
              className="btn-secondary inline-flex items-center justify-center w-full py-3 text-lg"
            >
              <Search className="w-5 h-5 mr-2" />
              Browse Villas
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center w-full py-3 text-lg text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-12 text-sm text-gray-500">
            <p>Need help? Contact our support team</p>
            <a 
              href="mailto:support@villalux.com" 
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              support@villalux.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage; 