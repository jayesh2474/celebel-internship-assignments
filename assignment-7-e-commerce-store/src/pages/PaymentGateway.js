import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Building, ArrowLeft, Lock, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const PaymentGateway = () => {
  const navigate = useNavigate();
  const { total, itemCount, clearCart, items } = useCart();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const tax = total * 0.18;
  const shipping = total > 4000 ? 0 : 500;
  const finalTotal = total + tax + shipping;

  const paymentMethods = [
    {
      id: 'card',
      icon: CreditCard,
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, RuPay'
    },
    {
      id: 'upi',
      icon: Smartphone,
      name: 'UPI Payment',
      description: 'PhonePe, GPay, Paytm'
    },
    {
      id: 'netbanking',
      icon: Building,
      name: 'Net Banking',
      description: 'All major banks supported'
    }
  ];

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Generate order data
    const orderData = {
      orderId: `ORD-2024-${Date.now()}`,
      orderDate: new Date().toLocaleDateString('en-IN'),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'),
      status: 'confirmed',
      transactionId: `TXN${Date.now()}`,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || '/api/placeholder/100/100'
      })),
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main Street, Sector 15',
        city: 'Gurgaon',
        state: 'Haryana',
        pincode: '122001',
        phone: '+91 98765 43210'
      },
      subtotal: total,
      gst: tax,
      shipping: shipping,
      total: finalTotal
    };
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
      clearCart();
      
      // Redirect to order details after 3 seconds
      setTimeout(() => {
        navigate(`/order/${orderData.orderId}`, { 
          state: { orderData },
          replace: true 
        });
      }, 3000);
    }, 3000);
  };

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully. You will receive a confirmation email shortly.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Transaction ID</p>
            <p className="font-bold text-gray-800">TXN{Date.now()}</p>
          </div>
          <p className="text-sm text-gray-500">
            Redirecting to order details in 3 seconds...
          </p>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Processing Payment</h2>
          <p className="text-gray-600 mb-4">
            Please wait while we process your payment securely...
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <Lock className="w-4 h-4 inline mr-1" />
              Do not refresh or close this page
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Payment Gateway</h1>
          <Link
            to="/checkout"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Checkout</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Choose Payment Method
              </h2>

              <div className="space-y-4 mb-8">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        checked={selectedMethod === method.id}
                        onChange={() => setSelectedMethod(method.id)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <method.icon className="w-6 h-6 text-gray-600" />
                      <div>
                        <h3 className="font-semibold text-gray-800">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Form Based on Selected Method */}
              {selectedMethod === 'card' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Card Details</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="Name as on card"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {selectedMethod === 'upi' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">UPI Payment</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      placeholder="yourname@paytm"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      You can also scan QR code from your UPI app to complete the payment.
                    </p>
                  </div>
                </div>
              )}

              {selectedMethod === 'netbanking' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Net Banking</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Your Bank
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Choose your bank</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                      <option value="pnb">Punjab National Bank</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="mt-8">
                <button
                  onClick={handlePayment}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Lock className="w-5 h-5" />
                  <span>Pay ₹{finalTotal.toLocaleString('en-IN')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Order Summary
              </h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({itemCount})</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold">
                      ₹{finalTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-800">256-bit SSL Encryption</span>
                </div>
              </div>

              <div className="text-xs text-gray-500 text-center">
                By proceeding, you agree to our Terms & Conditions and Privacy Policy
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
