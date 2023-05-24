import ProductCard from '../components/ProductCardForCart';
import PriceDetailsComponent from '../components/PriceDetailsComponent';
import { useAppSelector } from '../hooks';

const Cart = () => {
  const cartData = useAppSelector(state => state.cart.cartData);
  return (
    <>
      {cartData.length ? (
        <div className="flex flex-wrap gap-y-4 md:gap-x-8 p-4 justify-center min-h-screen">
          <div className="min-h-screen flex flex-col gap-6">
            {cartData.map(item => (
              <ProductCard key={item.id} itemInfo={item} />
            ))}
          </div>
          <PriceDetailsComponent />
        </div>
      ) : (
        <div className='flex items-center justify-center min-h-screen'>
          <h1 className="font-semibold text-center">
            Your cart is currently empty. Please add something...
          </h1>
        </div>
      )}
    </>
  );
};

export default Cart;
