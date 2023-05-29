import ProductCard from '../components/ProductCardForCart';
import PriceDetailsComponent from '../components/PriceDetailsComponent';
import { useAppSelector } from '../hooks';
import ScrollToTop from '../components/ScrollToTop';

const Cart = () => {
  const cartData = useAppSelector(state => state.cart.cartData);
  return (
    <>
      {cartData.length ? (
        <div className="flex flex-wrap gap-4 p-4 justify-center min-h-screen relative">
          <div className=" flex flex-col gap-y-6">
            {cartData.map(item => (
              <ProductCard key={item.id} itemInfo={item} />
            ))}
          </div>
          <div>
            <PriceDetailsComponent />
          </div>
          <ScrollToTop/>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="font-semibold text-center">
            Your cart is currently empty. Please add something...
          </h1>
        </div>
      )}
    </>
  );
};

export default Cart;
