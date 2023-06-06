import { useState } from 'react';
import Filters from '../components/Filters';
import ProductCard from '../components/ProductCard';
import { useAppSelector } from '../hooks';
import SkeletonCard from '../components/SkeletonCard';
import {
  filteredByCategory,
  sortByPrice,
  filterByRating,
  filterDataByPricing,
  filterBySearch,
} from '../utils/utilities';
import ScrollToTop from '../components/ScrollToTop';

const Products = () => {
  const [hiddenFilters, showHiddenFilters] = useState(false);
  const data = useAppSelector(state => state.products.productsData);
  const loading = useAppSelector(state => state.products.loading);
  const userSearchValue = useAppSelector(state => state.products.searchValue);

  const selectedCategory = useAppSelector(state => state.filters.category);
  const selectedSortPrice = useAppSelector(state => state.filters.sortPrice);
  const selectedRating = useAppSelector(state => state.filters.rating);
  const selectedPricingCategory = useAppSelector(
    state => state.filters.pricing
  );

  const filteredDataByCategory = filteredByCategory(data, selectedCategory);

  const filteredDataByHL = sortByPrice(
    filteredDataByCategory,
    selectedSortPrice
  );

  const filteredDataByRating = filterByRating(filteredDataByHL, selectedRating);

  const filteredDataByPrice = filterDataByPricing(
    filteredDataByRating,
    selectedPricingCategory
  );

  const filteredFinalData = filterBySearch(
    filteredDataByPrice,
    userSearchValue
  );

  return (
    <>
      <div className="flex justify-between p-4 relative">
        <span className="font-body font-semibold">Let's do Easy Buy.</span>
        <button>
          <i
            className="bi bi-funnel-fill md:hidden"
            onClick={() => showHiddenFilters(prev => !prev)}
          ></i>
        </button>
      </div>
      <div className="flex">
        <div className=" gap-y-3 flex flex-col px-4 py-2 w-full max-w-[17rem] min-h-screen max-md:hidden items-center">
          <Filters />
        </div>
        <div className="min-h-screen w-full z-0 relative p-4">
          {hiddenFilters && (
            <>
              <div className="absolute z-10 right-2 w-2/3 min-[600px]:w-1/3">
                <div className="bg-slate-100 gap-y-3 flex flex-col px-4 py-2 w-full md:hidden max-w-xs h-fit items-center rounded-md shadow-md">
                  <Filters />
                </div>
              </div>
            </>
          )}
          <div className="flex flex-wrap justify-center items-center gap-10 py-3">
            {loading ? (
              Array.from({ length: 20 }, (_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : filteredFinalData.length ? (
              filteredFinalData.map(item => (
                <ProductCard key={item.id} itemInfo={item} />
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
