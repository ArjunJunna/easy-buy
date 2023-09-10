import TrendingCard from './TrendingCard';
import { useAppSelector } from '../hooks';
import { useState } from 'react';
import Loader from './Loader';

const TrendingProducts = () => {
  const [page, setPage] = useState(1);
  const productData = useAppSelector(state => state.products.productsData);
  const isLoading=useAppSelector(state=>state.products.loading);
  const selectPageHandler = (selectedPage: number) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= productData.length / 5 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return isLoading ? (
      
      <Loader />
   
  ) : (
    <>
      <div className="flex flex-wrap w-full gap-x-2 gap-y-4 justify-around px-4">
        {productData.slice(page * 5 - 5, page * 5).map(item => (
          <TrendingCard itemInfo={item} key={item._id} />
        ))}
      </div>
      <div className="flex justify-center gap-x-6 mt-4 mb-8 font-body font-semibold">
        <button
          className={
            page > 1 ? 'hover:opacity-30 text-orange-900' : ' hover:opacity-30'
          }
          onClick={() => selectPageHandler(page - 1)}
        >
          Prev
        </button>
        {[...Array(4)].map((_, i) => {
          return (
            <button
              key={i}
              className={
                page === i + 1
                  ? 'text-orange-900  bg-slate-200 rounded-full px-2 py-1'
                  : 'hover:text-orange-900'
              }
              onClick={() => selectPageHandler(i + 1)}
            >
              {i + 1}
            </button>
          );
        })}
        <button
          className={
            page < productData.length / 6
              ? 'hover:opacity-30 text-orange-900'
              : ' text-black hover:opacity-30'
          }
          onClick={() => selectPageHandler(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );

};

export default TrendingProducts;
