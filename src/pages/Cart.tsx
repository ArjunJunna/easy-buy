import ProductCard from '../components/ProductCardForCart';
import PriceDetailsComponent from '../components/PriceDetailsComponent';
import { useAppSelector } from '../hooks';
import ScrollToTop from '../components/ScrollToTop';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const cartData = useAppSelector(state => state.cart.cartData);
  return (
    <>
      <div className="text-center py-4 text-2xl">
        <span>YOUR CART</span>
        {cartData.length ? (
          <div className="flex justify-around py-1">
            <button
              className="border-2 border-slate-800 text-sm py-1 px-2 font-semibold hover:bg-black hover:text-white"
              onClick={() => navigate('/products')}
            >
              CONTINUE SHOPPING
            </button>
            <button
              className="border-2 border-slate-800 text-sm py-1 px-2 font-semibold bg-black text-white hover:bg-slate-50 hover:text-black"
              onClick={() => navigate('/checkout')}
            >
              CHECKOUT NOW
            </button>
          </div>
        ) : null}
      </div>
      {cartData.length ? (
        <div className="flex flex-wrap gap-4 p-4 justify-center min-h-screen relative">
          <div className=" flex flex-col gap-y-6">
            {cartData.map(item => (
              <ProductCard key={item._id} itemInfo={item} />
            ))}
          </div>
          <div>
            <PriceDetailsComponent />
          </div>
          <ScrollToTop />
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
