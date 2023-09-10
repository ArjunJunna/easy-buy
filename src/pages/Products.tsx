import { useState, useRef } from 'react';
import Filters from '../components/Filters';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import ScrollToTop from '../components/ScrollToTop';
import useFilteredData from '../utils/useFilteredData';
import useOnClickOutside from '../utils/useOnClickOutside';

const Products = () => {
  const [hiddenFilters, showHiddenFilters] = useState(false);
  const { filteredData, loading } = useFilteredData();
  const filterRef = useRef<HTMLDivElement>(null);
  const filterHandler = () => {
    showHiddenFilters(false);
  };
  useOnClickOutside(filterRef, filterHandler);

  return (
    <>
      <div className="flex justify-between px-4 pt-4 pb-1 relative">
        <span className="font-body font-semibold">Let's Shop Easy Buy...</span>
        <button>
          <i
            className="bi bi-funnel-fill md:hidden"
            onClick={() => showHiddenFilters(prev => !prev)}
          ></i>
        </button>
      </div>
      <div className="flex ">
        <div className=" gap-y-3 flex flex-col px-4 py-2 w-full max-w-[17rem] min-h-screen max-md:hidden items-center">
          <Filters />
        </div>
        <div className="min-h-screen w-full z-0 relative p-4">
          {hiddenFilters && (
            <>
              <div
                className="absolute z-10 right-2 w-2/3 min-[600px]:w-1/3"
                ref={filterRef}
              >
                <div className="bg-slate-100 gap-y-3 flex flex-col px-4 py-2 w-full md:hidden max-w-xs h-fit items-center rounded-md shadow-md">
                  <Filters />
                </div>
              </div>
            </>
          )}
          <div className="flex flex-wrap justify-center items-center gap-10 pb-3 ">
            {loading ? (
              Array.from({ length: 20 }, (_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : filteredData.length ? (
              filteredData.map(item => (
                <ProductCard key={item._id} itemInfo={item} />
              ))
            ) : (
              <h1 className="font-semibold">
                The product you are looking for is currently unavailable...
              </h1>
            )}
          </div>
        </div>
        <ScrollToTop />
      </div>
    </>
  );
};

export default Products;
