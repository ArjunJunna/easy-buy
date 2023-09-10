import { useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';

const PriceDetailsComponent = () => {
  const navigate = useNavigate();
  const cartData = useAppSelector(state => state.cart.cartData);

  const amount = cartData.reduce((acc, curr) => {
    return (acc = acc + curr.price * curr.quantity);
  }, 0);

  const totalQuantity = cartData.reduce((acc, curr) => {
    acc = acc + curr.quantity;
    return acc;
  }, 0);

  return (
    <>
      <div className="h-fit w-64 bg-slate-200 font-semibold font-body flex flex-col gap-y-4 p-2 text-gray-600 sticky rounded-md shadow-lg md:top-16">
        <h2 className="px-3 text-lg text-center pt-2">Price Details</h2>
        <div className="bg-gray-300 h-[1px] w-full"></div>
        <div className="flex justify-between px-4">
          <p className="text-sm">No. of Items </p>
          <span className="text-sm">{totalQuantity}</span>
        </div>
        <div className="flex justify-between px-4">
          <p className="text-sm">Price</p>
          <span className="text-sm">$ {amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between px-4">
          <p className="text-sm">Delivery Charges </p>
          <span className="text-sm">$ 00.00</span>
        </div>
        <div className="bg-gray-300 h-[1px] w-full"></div>
        <div className="flex justify-between px-4">
          <p className="text-lg">Total Amount </p>
          <span className="text-lg">$ {amount.toFixed(2)}</span>
        </div>
        <div className="bg-gray-300 h-[1px] w-full"></div>
        <button
          className="w-full h-fit text-gray-100 bg-slate-700 hover:bg-slate-600 p-2 rounded font-semibold shadow-lg text-sm"
          onClick={() => navigate('/checkout')}
        >
          Checkout
        </button>
      </div>
    </>
  );
};

export default PriceDetailsComponent;
