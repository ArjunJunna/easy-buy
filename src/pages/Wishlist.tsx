import ProductCard from '../components/ProductCard';
import { useAppSelector } from '../hooks';

const Wishlist = () => {
  const wishlistData = useAppSelector(state => state.products.wishlistData);

  return (
    <>
      <div>
        {wishlistData.length ? (
          <>
            <h2 className="text-start font-body font-semibold p-4">
              You have total {wishlistData?.length} items in wishlist...
            </h2>
          </>
        ) : null}
      </div>

      <div className=" min-h-screen flex flex-wrap gap-6 p-8 justify-center">
        {wishlistData.length ? (
          wishlistData.map(item => (
            <ProductCard key={item.id} itemInfo={item} />
          ))
        ) : (
          <h1 className="font-semibold flex justify-center items-center">
            The product you are looking for is currently unavailable...
          </h1>
        )}
      </div>
    </>
  );
};

export default Wishlist;
