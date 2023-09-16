import ProductCard from '../components/ProductCard';
import ScrollToTop from '../components/ScrollToTop';
import { useAppSelector } from '../hooks';

const Wishlist = () => {
  const wishlistData = useAppSelector(state => state.products.wishlistData);

  return (
    <>
      <div>
        {wishlistData.length>0 ? (
          <>
            <h2 className="text-start font-body font-semibold p-4">
              You have total {wishlistData?.length} items in wishlist...
            </h2>
          </>
        ) : null}
      </div>

      <div className=" min-h-screen flex flex-wrap gap-6 p-8 justify-center relative">
        {wishlistData.length>0 ? (
          wishlistData.map(item => (
            <ProductCard key={item._id} itemInfo={item} />
          ))
        ) : (
          <h1 className="font-semibold flex justify-center items-center">
            Your wishlist is currently empty...
          </h1>
        )}
        <ScrollToTop />
      </div>
    </>
  );
};

export default Wishlist;
