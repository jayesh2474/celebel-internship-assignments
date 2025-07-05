import React, { useState, useMemo } from 'react';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import { products } from '../data/products';

const Products = ({ searchTerm = '' }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    category: 'All',
    brand: 'All',
    priceRange: '',
    minRating: 0,
    sortBy: 'featured'
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'All',
      brand: 'All',
      priceRange: '',
      minRating: 0,
      sortBy: 'featured'
    });
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.brand.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }

      // Brand filter
      if (filters.brand !== 'All' && product.brand !== filters.brand) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (max === Infinity) {
          if (product.price < min) return false;
        } else {
          if (product.price < min || product.price > max) return false;
        }
      }

      // Rating filter
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'featured':
      default:
        // Keep original order for featured
        break;
    }

    return filtered;
  }, [searchTerm, filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <Filters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {searchTerm ? `Search Results for "${searchTerm}"` : 'All Products'}
              </h1>
              <p className="text-gray-600">
                Showing {filteredAndSortedProducts.length} of {products.length} products
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(filters.category !== 'All' || filters.brand !== 'All' || filters.priceRange || filters.minRating > 0 || searchTerm) && (
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {searchTerm && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Search: "{searchTerm}"
                  </span>
                )}
                {filters.category !== 'All' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Category: {filters.category}
                  </span>
                )}
                {filters.brand !== 'All' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Brand: {filters.brand}
                  </span>
                )}
                {filters.priceRange && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Price: {filters.priceRange.replace('-Infinity', '+')}
                  </span>
                )}
                {filters.minRating > 0 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Rating: {filters.minRating}+ stars
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Products Grid/List */}
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <SlidersHorizontal className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters to find what you're looking for.
              </p>
              <button
                onClick={clearFilters}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {filteredAndSortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}

          {/* Load More Button (for future pagination) */}
          {filteredAndSortedProducts.length > 0 && (
            <div className="text-center mt-12">
              <button className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                Load More Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
