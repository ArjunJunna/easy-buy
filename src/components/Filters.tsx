import { useState, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { SetCategory } from '../features/filters/filterSlice';
import { Category } from '../features/filters/filterSlice';
import {
  SortPrice,
  SortByRating,
  SortByPricing,
  ClearFilters,
} from '../features/filters/filterSlice';


const Filters = () => {

  const [category, showCategory] = useState(false);
  const [categoryValue, setCategoryValue] = useState<
    Category | 'Show All Products'
  >('Show All Products');
  const ratingValue = useAppSelector(state => state.filters.rating);
  const sortPriceValue = useAppSelector(state => state.filters.sortPrice);
  const sortPricingRange = useAppSelector(state => state.filters.pricing);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(SetCategory(categoryValue));
  }, [categoryValue]);
 
  const clearFilters = () => {
    dispatch(ClearFilters());
    setCategoryValue('Show All Products');
  };
  const setCategory = (value: Category) => {
    setCategoryValue(value);
    showCategory(prev => !prev);
  };

  return (
    <div className="w-full flex flex-col gap-y-2 sticky top-20 pl-4 ">
      <div className="flex justify-between items-center font-medium text-sm w-full">
        <span>Filters</span>
        <button
          className=" px-1.5 py-0.5 rounded-md text-xs cursor-pointer hover:bg-gray-200"
          onClick={() => clearFilters()}
        >
          Clear
        </button>
      </div>
      <div className="w-[80%] cursor-pointer border-gray-300 rounded-md border-2 p-2 flex items-center">
        <span
          className="relative font-medium text-sm w-full"
          onClick={() => showCategory(prev => !prev)}
        >
          {categoryValue}
          {category ? (
            <>
              <i className="bi bi-caret-up absolute right-1 -top-0.5 text-xl"></i>
            </>
          ) : (
            <>
              <i className="bi bi-caret-down absolute right-1 -top-0.5 text-xl"></i>
            </>
          )}
        </span>
      </div>
      {category && (
        <>
          <div className="flex flex-col w-[80%] cursor-pointer border-gray-300 rounded-md border-2 py-1 items-start font-medium text-sm">
            <span
              className="hover:bg-slate-200 w-full text-center py-1"
              onClick={() => setCategory('Show All Products')}
            >
              Show All products
            </span>
            <span
              className="hover:bg-slate-200 w-full text-center py-1"
              onClick={() => setCategory('electronics')}
            >
              electronics
            </span>
            <span
              className="hover:bg-slate-200 w-full text-center py-1"
              onClick={() => setCategory('jewelery')}
            >
              jewellery
            </span>
            <span
              className="hover:bg-slate-200 w-full text-center py-1"
              onClick={() => setCategory(`men's clothing`)}
            >
              men's clothing
            </span>
            <span
              className="hover:bg-slate-200 w-full text-center py-1"
              onClick={() => setCategory(`women's clothing`)}
            >
              women's clothing
            </span>
          </div>
        </>
      )}
      <div className="flex flex-col items-start justify-start w-[80%]">
        <label className="font-semibold text-sm">Price</label>
        <div>
          <input
            type="radio"
            name="price"
            id="low-to-high"
            value="low-to-high"
            className="mr-1 accent-slate-800"
            checked={sortPriceValue === 'LOW_TO_HIGH'}
            onChange={() => dispatch(SortPrice('LOW_TO_HIGH'))}
          />
          <label className="font-body text-sm">Low to High</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            name="price"
            id="high-to-low"
            value="high-to-low"
            className="mr-1 accent-slate-800"
            checked={sortPriceValue === 'HIGH_TO_LOW'}
            onChange={() => dispatch(SortPrice('HIGH_TO_LOW'))}
          />
          <label className="font-body text-sm">High to Low</label>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-[80%]">
        <label className="font-semibold text-sm">Ratings</label>
        <div className="flex justify-between w-full text-xs mt-2 font-semibold px-1">
          <label htmlFor="">1</label>
          <label htmlFor="">2</label>
          <label htmlFor="">3</label>
          <label htmlFor="">4</label>
          <label htmlFor="">5</label>
        </div>
        <input
          type="range"
          className="w-full accent-slate-800 cursor-pointer"
          min="1"
          max="5"
          step="1"
          value={ratingValue}
          onChange={e => dispatch(SortByRating(Number(e.target.value)))}
        />
      </div>
      <div className="flex flex-col items-start justify-start w-[80%]">
        <label className="font-semibold text-sm">Pricing $</label>
        <div>
          <input
            type="radio"
            name="price-range"
            value="Below 200"
            className="mr-1 accent-slate-800"
            checked={sortPricingRange === 'Below 200'}
            onChange={e => dispatch(SortByPricing(e.target.value))}
          />
          <label className="font-body text-sm">Below 200 $</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            name="price-range"
            value="200 - 400"
            className="mr-1 accent-slate-800"
            checked={sortPricingRange === '200 - 400'}
            onChange={e => dispatch(SortByPricing(e.target.value))}
          />
          <label className="font-body text-sm">200 $ - 400 $</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            name="price-range"
            value="400 - 600"
            className="mr-1 accent-slate-800"
            checked={sortPricingRange === '400 - 600'}
            onChange={e => dispatch(SortByPricing(e.target.value))}
          />
          <label className="font-body text-sm">400 $ - 600 $</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            name="price-range"
            value="600 - 800"
            className="mr-1 accent-slate-800"
            checked={sortPricingRange === '600 - 800'}
            onChange={e => dispatch(SortByPricing(e.target.value))}
          />
          <label className="font-body text-sm">600 $ - 800 $</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            name="price-range"
            value="Above 800"
            className="mr-1 accent-slate-800"
            checked={sortPricingRange === 'Above 800'}
            onChange={e => dispatch(SortByPricing(e.target.value))}
          />
          <label className="font-body text-sm">Above 800 $</label>
        </div>
      </div>
    </div>
  );
};

export default Filters;
