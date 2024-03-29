import { OrderData, UserAddressResponseData } from '../../Types';
import { useAppSelector, useAppDispatch } from '../hooks';
import { createOrder, getKey } from '../services/paymentService';
import { useNavigate } from 'react-router-dom';
import { createUserOrder } from '../features/orders/orderSlice';
import toast from 'react-hot-toast';

const OrderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartData = useAppSelector(state => state?.cart?.cartData);
  const cartAmount=useAppSelector(state=>state?.cart?.cartAmount);
  const userId = useAppSelector(state => state?.profile?.userData?._id);

  const selectedAddress = useAppSelector(
    state => state.profile.selectedAddress
  );
  const userMail = useAppSelector(state => state.profile.userData?.email);
  const dummyAddress = {
    name: 'Ethan Hunt',
    street: '24 Wall Street',
    city: 'New York',
    zipcode: 555333,
    state: 'Dallas',
    country: 'United States of America',
    phoneNumber: 7111166666,
  };

  let name: string,
    street: string,
    city: string,
    state: string,
    country: string,
    phoneNumber: number,
    zipcode: number;

  if (selectedAddress) {
    const address = selectedAddress as UserAddressResponseData;
    name = address.name;
    street = address.street;
    city = address.city;
    state = address.state;
    country = address.country;
    phoneNumber = address.phoneNumber;
    zipcode = address.zipcode;
  } else {
    name = dummyAddress.name;
    street = dummyAddress.street;
    city = dummyAddress.city;
    state = dummyAddress.state;
    country = dummyAddress.country;
    phoneNumber = dummyAddress.phoneNumber;
    zipcode = dummyAddress.zipcode;
  }



  const loadScript = async (url: string) => {
    return new Promise(resolve => {
      const script = document.createElement('script');
      script.src = url;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const clickHandler = async () => {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );
     if (!res) {
       toast.error('Razorpay SDK failed to open.Please check your connection...');
       return;
     }
    const order = await placeOrder(cartAmount.grandTotal);
    const key = await getKey();
    const options = {
      key,
      amount: order?.amount,
      currency: 'USD',
      name: 'Easy Buy',
      description: 'Thank you for shopping at Easy Buy',
      image:
        'https://res.cloudinary.com/djxonmiuo/image/upload/v1692966522/Easy-Buy-Logo_dyeqva.png',
      order_id: order?.id,
      callback_url: `https://easy-buy-api.onrender.com/api/v1/payment/paymentverification/${order?.id}`,
      handler: async (response: any) => {
        const deliveryAddress = {
          name,
          street,
          city,
          state,
          country,
          phoneNumber,
          zipcode,
        };
        const orderData = {
          userId,
          products: cartData,
          amount: cartAmount.grandTotal,
          deliveryAddress,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
        };

        dispatch(createUserOrder(orderData));

        const { razorpay_order_id, razorpay_payment_id } = response;

        navigate(
          `/paymentsuccess?orderId=${razorpay_order_id}&paymentId=${razorpay_payment_id}`
        );
      },
      prefill: {
        name: { name },
        email: { userMail },
        contact: { phoneNumber },
      },
      notes: {
        address: `${street},${city},${state},${country} - ${zipcode}`,
      },
      theme: {
        color: '#121212',
      },
    };
    const razor = new (window as any).Razorpay(options);
    razor.open();
  };

  const placeOrder = async (amount: number) => {
    try {
    
      const response = await createOrder(amount);
      const order: OrderData = response?.data.order;
      return order;
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h5 className="mt-2 font-semibold ">Your Order</h5>
      <div className="flex flex-col gap-y-1 p-2 w-[80%] border-[1px] border-gray-400 rounded-md">
        {cartData.map(product => (
          <div className="flex justify-between w-full" key={product._id}>
            <p className="text-sm">
              {product.title} - (${product.price}&times;
              {product.quantity})
            </p>
            <span className="text-sm">${product.price * product.quantity}</span>
          </div>
        ))}
      </div>
      <h5 className="mt-2 font-semibold ">Price Details</h5>
      <div className="flex flex-col gap-y-1 p-2 w-[80%] border-[1px] border-gray-400 rounded-md">
        <div className="flex justify-between w-full">
          <p className="text-sm">Total Price</p>
          <span className="text-sm"> ${cartAmount.amount}</span>
        </div>
        <div className="flex justify-between w-full">
          <p className="text-sm">Discount</p>
          <span className="text-sm"> ${cartAmount.discount}</span>
        </div>
        <div className="flex justify-between w-full">
          <p className="text-sm">Delivery Charges</p>
          <span className="text-sm"> $00.00</span>
        </div>
        <div className="flex justify-between w-full">
          <p className="text-sm">Grand Total</p>
          <span className="text-sm"> ${cartAmount.grandTotal}</span>
        </div>
      </div>
      <h5 className="mt-2 font-semibold ">Selected Delivery Address</h5>
      <div className="flex flex-col gap-y-1 p-2 w-[80%] border-[1px] border-gray-400 rounded-md">
        <div className="flex-col text-sm">
          <p className="font-semibold">{name}</p>
          <p>{street}</p>
          <p>
            {city} - {zipcode}
          </p>
          <p>
            {state}, {country}
          </p>
          <p>{phoneNumber}</p>
        </div>
        <button
          className="w-full h-fit text-gray-100 bg-slate-600 hover:bg-slate-500 p-2 rounded font-semibold shadow-lg text-sm justify-center"
          onClick={clickHandler}
        >
          Place Order
        </button>
      </div>
    </>
  );
};

export default OrderDetails;
