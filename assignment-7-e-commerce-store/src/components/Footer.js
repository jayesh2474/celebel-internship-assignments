import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold">ShopStore</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your one-stop destination for quality products at unbeatable
              prices. Shop with confidence and enjoy our exceptional customer
              service.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  className="text-gray-300 hover:text-white transition-colors text-left"
                  onClick={() => alert('Help Center - Coming Soon!')}
                >
                  Help Center
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="text-gray-300 hover:text-white transition-colors text-left"
                  onClick={() => alert('Shipping Info - Coming Soon!')}
                >
                  Shipping Info
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="text-gray-300 hover:text-white transition-colors text-left"
                  onClick={() => alert('Returns & Exchanges - Coming Soon!')}
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="text-gray-300 hover:text-white transition-colors text-left"
                  onClick={() => alert('Size Guide - Coming Soon!')}
                >
                  Size Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="text-gray-300 hover:text-white transition-colors text-left"
                  onClick={() => alert('Track Your Order - Coming Soon!')}
                >
                  Track Your Order
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Bhuwana, Udaipur, Rajasthan, India 313001
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">+91 9211 420420</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">support@shopstore.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 mb-4 md:mb-0">
              <p>&copy; 2025 Jayesh Joshi ShopStore. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <button
                type="button"
                className="text-gray-300 hover:text-white transition-colors text-sm"
                onClick={() => alert('Privacy Policy - Coming Soon!')}
              >
                Privacy Policy
              </button>
              <button
                type="button"
                className="text-gray-300 hover:text-white transition-colors text-sm"
                onClick={() => alert('Terms of Service - Coming Soon!')}
              >
                Terms of Service
              </button>
              <button
                type="button"
                className="text-gray-300 hover:text-white transition-colors text-sm"
                onClick={() => alert('Cookie Policy - Coming Soon!')}
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
