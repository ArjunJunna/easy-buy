import { useAppSelector } from '../hooks';

const PaymentSuccess = () => {
  const currentOrder = useAppSelector(state => state.orders.orderData);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen pt-8 gap-y-4">
      <h1 className="text-3xl font-semibold md:text-2xl">
        Order Placed Successfully!
      </h1>
      <div className="max-sm:w-[90%] w-[80%] md:w-[70%] h-auto md:flex max-md:flex-col border border-gray-300 border-1 rounded">
        <div className="flex flex-col basis-1/3 text-sm gap-y-1 p-2">
          <div className="flex gap-1">
            <div className="font-semibold">Payment ID:</div>
            <div>{currentOrder?.paymentId}</div>
          </div>
          <div className="flex gap-1">
            <div className="font-semibold">Order ID:</div>
            <div>{currentOrder?.orderId}</div>
          </div>
          <div className="flex gap-1">
            <div className="font-semibold">Amount Paid:</div>
            <div>${currentOrder?.amount}</div>
          </div>
          <div className="flex-col gap-1">
            <div className="font-semibold inline-block">Delivery Address:</div>
            <div>
              {`${currentOrder.deliveryAddress.name}, ${currentOrder.deliveryAddress.street}, ${currentOrder.deliveryAddress.city}, ${currentOrder.deliveryAddress.state}, ${currentOrder.deliveryAddress.country}, ${currentOrder.deliveryAddress.zipcode}, ${currentOrder.deliveryAddress.phoneNumber}`}
            </div>
          </div>
        </div>
        <div className="flex flex-col basis-2/3 p-2 gap-2">
          <h2 className="font-semibold">Products Ordered :</h2>
          <div className=" flex flex-col w-full gap-2">
            {currentOrder.products.map(item => {
              return (
                <div
                  className="flex max-[460px]:flex-col gap-x-2 border border-slate-300 border-1 rounded w-full"
                  key={item._id}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-[50%] max-[460px]:w-full max-[460px]:justify-center max-[460px]:h-[10rem] min-[460px]:basis-1/2 min-[460px]:h-[10rem] md:basis-1/2 md:h-[14rem] p-2"
                  />
                  <div className="flex flex-col text-sm gap-1 p-1 md:basis-1/2 min-[460px]:basis-1/2">
                    <p className="font-semibold">{item.title}</p>
                    <p>{item.description}</p>
                    <p className="font-semibold">
                      Price :<span className="font-normal">{item.price}</span>
                    </p>
                    <p className="font-semibold">
                      Quantity :
                      <span className="font-normal">{item.quantity}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
