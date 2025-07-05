import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Calendar, MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';
import { formatPrice } from '../utils/helpers';

const OrderDetails = () => {
  const location = useLocation();
  const orderData = location.state?.orderData;

  // Mock order data if not passed through navigation
  const mockOrder = {
    orderId: 'ORD-2024-001234',
    orderDate: new Date().toLocaleDateString('en-IN'),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'),
    status: 'confirmed',
    items: [
      { id: 1, name: 'Smartphone XYZ', price: 25999, quantity: 1, image: '/api/placeholder/100/100' },
      { id: 2, name: 'Wireless Earbuds', price: 2999, quantity: 1, image: '/api/placeholder/100/100' }
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street, Sector 15',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122001',
      phone: '+91 98765 43210'
    },
    subtotal: 28998,
    gst: 5220,
    shipping: 0,
    total: 34218
  };

  const order = orderData || mockOrder;

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'shipped': return 'text-orange-600 bg-orange-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle size={20} />;
      case 'processing': return <Package size={20} />;
      case 'shipped': return <Truck size={20} />;
      case 'delivered': return <CheckCircle size={20} />;
      default: return <Package size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/account"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Account
          </Link>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
                <p className="text-gray-600">Order ID: {order.orderId}</p>
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <Calendar size={16} />
                  Placed on {order.orderDate}
                </p>
              </div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-lg font-semibold text-orange-600">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin size={20} />
                Shipping Address
              </h2>
              <div className="text-gray-700">
                <p className="font-medium">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                <p className="flex items-center gap-2 mt-2">
                  <Phone size={16} />
                  {order.shippingAddress.phone}
                </p>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Truck size={20} />
                Delivery Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Delivery:</span>
                  <span className="font-medium">{order.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Method:</span>
                  <span className="font-medium">Standard Delivery</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tracking Number:</span>
                  <span className="font-medium text-orange-600">TRK123456789</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%):</span>
                  <span>{formatPrice(order.gst)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className={order.shipping === 0 ? 'text-green-600' : ''}>
                    {order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-orange-600">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Need Help?</h2>
              <div className="space-y-3">
                <p className="text-gray-600 text-sm">
                  Have questions about your order? Our customer support team is here to help.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={16} className="text-orange-600" />
                    <span>1800-123-4567</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={16} className="text-orange-600" />
                    <span>support@shopindia.com</span>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="inline-block w-full text-center bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors mt-4"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
