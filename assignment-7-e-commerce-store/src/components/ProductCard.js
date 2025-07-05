import React from 'react';
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const isProductInCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <Link to={`/products/${product.id}`}>
                <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-1">
                  {product.name}
                </h3>
              </Link>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
              </button>
            </div>
            
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
              <span className="ml-2 text-sm text-gray-500">
                ({product.reviews} reviews)
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-800">
                  ${product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Link to={`/products/${product.id}`}>
                  <button className="p-2 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                </Link>
                <button
                  onClick={handleAddToCart}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isProductInCart
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="w-4 h-4" />
                    <span>
                      {isProductInCart ? `In Cart (${quantity})` : 'Add to Cart'}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {product.originalPrice > product.price && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
          </button>
          <Link to={`/products/${product.id}`}>
            <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
              <Eye className="w-4 h-4 text-gray-600" />
            </button>
          </Link>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-1">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="ml-2 text-sm text-gray-500">
            ({product.reviews})
          </span>
        </div>
        
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors mb-1 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-800">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.brand}
          </span>
        </div>
        
        <button
          onClick={handleAddToCart}
          className={`w-full py-2 rounded-lg font-medium transition-colors ${
            isProductInCart
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <ShoppingCart className="w-4 h-4" />
            <span>
              {isProductInCart ? `In Cart (${quantity})` : 'Add to Cart'}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
