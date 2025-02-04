import  { useEffect, useState } from 'react';
import { PAGE_SIZE } from '../../Utils/constants';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/Slice/productsSlice';

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const { products, totalProducts, loading, error } = useSelector(
    (state) => state.products
  );

  const startRange = currentPage * PAGE_SIZE;
  const endRange = startRange + PAGE_SIZE;
  const totalNoPages = Math.ceil(totalProducts / PAGE_SIZE);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const onPageClickHandler = (pageNo) => {
    setCurrentPage(pageNo);
  };
  const onNextPageClickHandler = () => {
    setCurrentPage(currentPage + 1);
  };
  const onPrevPageClickHandler = () => {
    setCurrentPage(currentPage - 1);
  };
  
  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-6">
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
      <div className="flex flex-row flex-wrap gap-6 justify-center">
        {products?.slice(startRange, endRange)?.map((ele) => (
          <ProductCard
            key={ele?.id}
            title={ele?.title}
            price={ele?.price}
            image={ele?.thumbnail}
            id={ele?.id}
          />
  
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
