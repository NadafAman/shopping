import { useEffect, useState } from 'react';
import { PAGE_SIZE } from '../../Utils/constants';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/Slice/productsSlice';

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const { products, totalProducts, loading, error } = useSelector(
    (state) => state.products
  );

  const startRange = currentPage * PAGE_SIZE;
  const endRange = startRange + PAGE_SIZE;
  const totalNoPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Update filtered products based on filters
  useEffect(() => {
    let updatedProducts = [...products];

    if (categoryFilter) {
      updatedProducts = updatedProducts.filter(
        (product) => product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (priceRange) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      );
    }

    if (ratingFilter) {
      updatedProducts = updatedProducts.filter(
        (product) => product.rating >= ratingFilter
      );
    }

    if (searchQuery) {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
    setCurrentPage(0); // Reset page when filters change
  }, [products, categoryFilter, priceRange, ratingFilter, searchQuery]);

  const onPageClickHandler = (pageNo) => {
    setCurrentPage(pageNo);
  };

  const onNextPageClickHandler = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalNoPages - 1));
  };

  const onPrevPageClickHandler = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-6">
      {/* Filter and Search Section */}
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Category Filter */}


        {/* Price Range Filter */}
        <div className="flex flex-col items-start">
          <label className="text-sm font-medium">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="">All Categories</option>
          <option value="beauty">Beauty</option>
          <option value="furniture">Furniture</option>
          <option value="mobile-accessories">Mobile Accessories</option>
        </select>
        {/* Rating Filter */}
        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(Number(e.target.value))}
          className="border p-2 rounded-md"
        >
          <option value="0">All Ratings</option>
          <option value="4">4 Stars & Above</option>
          <option value="3">3 Stars & Above</option>
        </select>

        {/* Search Bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title..."
          className="border p-2 rounded-md w-64"
        />
      </div>

      {/* Pagination */}
      {!loading && !error && (
        <div className="w-full h-auto p-3.5 flex flex-row justify-center gap-3">
          <div
            className={`w-7 h-7 flex justify-center items-center rounded-sm border-2 ${
              currentPage === 0
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer'
            }`}
            onClick={() => onPrevPageClickHandler()}
          >
            ⬅️
          </div>
          {[...Array(totalNoPages)?.keys()].map((ele) => (
            <div
              className={`w-7 h-7 flex justify-center items-center rounded-sm border-2 cursor-pointer ${
                currentPage === ele
                  ? 'bg-blue-400 text-neutral-50 border-blue-950'
                  : ''
              }`}
              onClick={() => onPageClickHandler(ele)}
              key={ele}
            >
              {ele + 1}
            </div>
          ))}
          <div
            className={`w-7 h-7 flex justify-center items-center rounded-sm border-2 ${
              currentPage === totalNoPages - 1
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer'
            }`}
            onClick={() => onNextPageClickHandler()}
          >
            ➡️
          </div>
        </div>
      )}

      {/* Product Cards */}
      <div className="flex flex-row flex-wrap gap-6 justify-center">
        {filteredProducts.slice(startRange, endRange).map((ele) => (
          <ProductCard
            key={ele?.id}
            title={ele?.title}
            price={ele?.price}
            image={ele?.thumbnail}
            id={ele?.id}
            rating={ele?.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
