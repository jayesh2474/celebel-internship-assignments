import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Users, Award, Target, ArrowLeft } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Happy Customers', value: '50,000+' },
    { label: 'Products Sold', value: '200,000+' },
    { label: 'Years in Business', value: '5+' },
    { label: 'Team Members', value: '100+' }
  ];

  const values = [
    {
      icon: ShoppingBag,
      title: 'Quality Products',
      description: 'We curate only the best products from trusted brands and manufacturers.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Our customers are at the heart of everything we do. Your satisfaction is our priority.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our business, from products to service.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'We continuously innovate to bring you the latest and greatest shopping experience.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-800">About ShopStore</h1>
          <p className="text-xl text-gray-600 mt-2">
            Your trusted partner for online shopping in India
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Bringing Quality Products to Your Doorstep
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Founded in 2020, ShopStore has been dedicated to providing Indian customers with 
            access to high-quality products at competitive prices. We believe that great 
            shopping experiences should be accessible to everyone, which is why we've built 
            a platform that combines convenience, quality, and affordability.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Our Story */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Story</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 mb-4">
                ShopStore was born out of a simple idea: to make quality products 
                accessible to everyone across India. Our founder, Jayesh Joshi, noticed 
                that many great products were either too expensive or difficult to find 
                in local markets.
              </p>
              <p className="text-gray-600 mb-4">
                Starting from a small office in Udaipur, we've grown to serve customers 
                across the country. Our commitment to quality, customer service, and 
                competitive pricing has made us a trusted name in Indian e-commerce.
              </p>
              <p className="text-gray-600">
                Today, we continue to expand our product range and improve our services, 
                always keeping our customers' needs at the forefront of our decisions.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8">
              <img
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop"
                alt="Our Journey"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Our Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {value.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Meet Our Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Jayesh Joshi',
                role: 'Founder & CEO',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'
              },
              {
                name: 'Priya Sharma',
                role: 'Head of Operations',
                image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=200&h=200&fit=crop&crop=face'
              },
              {
                name: 'Rahul Kumar',
                role: 'Head of Technology',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-lg font-semibold text-gray-800">
                  {member.name}
                </h4>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Start Shopping?
          </h3>
          <p className="text-gray-600 mb-6">
            Discover thousands of quality products at unbeatable prices.
          </p>
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
