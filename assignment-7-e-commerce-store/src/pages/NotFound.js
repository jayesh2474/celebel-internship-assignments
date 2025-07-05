import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, ShoppingBag } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-9xl font-bold text-orange-500 mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Go to Home
          </Link>
          
          <Link
            to="/products"
            className="w-full bg-white text-orange-500 border border-orange-500 px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={20} />
            Browse Products
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full text-gray-600 hover:text-gray-800 px-6 py-3 flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>Need help? <Link to="/contact" className="text-orange-500 hover:underline">Contact us</Link></p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
