import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { SetTotalAmount } from '../features/cartlist/cartSlice';
import { checkoutData } from '../utils/checkoutTotal';

const PriceDetailsComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartData = useAppSelector(state => state.cart.cartData);
  const [discountInfo, showDiscountInfo] = useState(false);
  const [discountValue, setDiscountValue] = useState(0);
  const [coupon, showCoupon] = useState(false);

const { amount, discount, grandTotal, totalQuantity }=checkoutData(cartData,discountValue)

  const isAmountBetween1000And3000 = amount >= 1000 && amount < 3000;
  const isAmountGreaterThan3000 = amount >= 3000;

  const inputRadioHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountValue(Number(e.target.value));
    showCoupon(true);
  };

  return (
    <>
      <div className="h-fit w-64 bg-slate-200 font-semibold font-body flex flex-col gap-y-2 p-2 text-gray-600 sticky rounded-md shadow-lg md:top-16">
        <div className="flex justify-between text-sm">
          <h3>
            Need a coupon? <i className="bi bi-tags-fill"></i>
          </h3>
          <button
            className="bg-slate-300 p-1 rounded-md"
            onClick={() => showDiscountInfo(prev => !prev)}
          >
            APPLY
          </button>
        </div>
        {discountInfo ? (
          <>
            <div className="flex flex-col justify-start p-1 bg-slate-300 border rounded-md border-gray-500 gap-y-1">
              <label
                className={
                  isAmountBetween1000And3000
                    ? 'flex '
                    : 'flex cursor-not-allowed'
                }
              >
                <input
                  type="radio"
                  name=""
                  id=""
                  value="0.10"
                  className="accent-slate-700 "
                  disabled={!isAmountBetween1000And3000}
                  onChange={inputRadioHandler}
                />
                <p className="text-[13px]">10% OFF on orders above $1000</p>
              </label>
              <hr />
              <label
                className={
                  isAmountGreaterThan3000 ? 'flex ' : 'flex cursor-not-allowed'
                }
              >
                <input
                  type="radio"
                  name=""
                  id=""
                  value="0.18"
                  className="accent-slate-700"
                  disabled={!isAmountGreaterThan3000}
                  onChange={inputRadioHandler}
                />
                <p className="text-[13px]">18% OFF on orders above $3000</p>
              </label>
            </div>
          </>
        ) : null}
        <h2 className="px-3 text-lg text-center">Price Details</h2>
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
          <span className="text-sm">00.00</span>
        </div>
        <div className="bg-gray-300 h-[1px] w-full"></div>
        <div className="flex justify-between px-4">
          <p className="text-base">Total Amount </p>
          <span className="text-base">$ {amount.toFixed(2)}</span>
        </div>

        {coupon ? (
          <>
            <div className="bg-gray-300 h-[1px] w-full"></div>
            <div className="flex justify-between px-4 text-sm text-violet-900">
              <p>
                <i className="bi bi-check2 "></i> Coupon
              </p>
              <span>- $ {discount.toFixed(2)}</span>
            </div>
          </>
        ) : null}

        <div className="bg-gray-300 h-[1px] w-full"></div>
        <div className="flex justify-between px-4">
          <p className="text-base">Grand Total </p>
          <span className="text-base">$ {grandTotal}</span>
        </div>
        <div className="bg-gray-300 h-[1px] w-full"></div>
        <button
          className="w-full h-fit text-gray-100 bg-slate-700 hover:bg-slate-600 p-2 rounded font-semibold shadow-lg text-sm"
          onClick={() => {
            dispatch(SetTotalAmount({ amount, discount, grandTotal }));
            navigate('/checkout');
          }}
        >
          Checkout
        </button>
        {coupon ? (
          <>
            <p className="text-green-600 text-sm">
              You will save $ {amount - grandTotal} on this order.
            </p>
          </>
        ) : null}
      </div>
    </>
  );
};

export default PriceDetailsComponent;
