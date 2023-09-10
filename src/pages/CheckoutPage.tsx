import AddressList from '../components/AddressList';
import OrderDetails from '../components/OrderDetails';
import ScrollToTop from '../components/ScrollToTop';
const Checkout = () => {
  return (
    <div className="relative">
      <h1 className="text-center my-4 font-semibold text-xl">Checkout</h1>
      <div className="min-h-screen flex justify-around max-lg:flex-wrap md:px-[10rem] mb-2">
        <div className="flex flex-col items-center w-full gap-2">
          <AddressList />
        </div>
        <div className="flex flex-col items-center w-full gap-2 ">
          <OrderDetails />
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Checkout;
