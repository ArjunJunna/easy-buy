import { useAppDispatch, useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { LogoutHandler } from '../features/auth/authSlice';
import { ClearWishlist } from '../features/products/productsSlice';
import { ClearCartlist } from '../features/cartlist/cartSlice';
import { ClearProfileData } from '../features/profile/profileSlice';
import Loader from './Loader';

const ProfileSection = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const data = useAppSelector(state => state.profile.userData);
  const isLoading = useAppSelector(state => state.profile.isLoading);
  const allOrders = useAppSelector(state => state.orders.prevOrderData);

  const logout = () => {
    navigate('/');
    dispatch(ClearWishlist());
    dispatch(ClearCartlist());
    dispatch(LogoutHandler());
    dispatch(ClearProfileData());
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex-col p-4 gap-y-4 bg-slate-100 rounded-2xl shadow-xl mx-2 h-auto ">
      <div className="flex gap-4 mb-5">
        <img
          className="w-28 h-28 rounded-full max-[460px]:w-16 max-[460px]:h-16 sm:w-24 sm:h-24 bg-slate-800"
          src={`https://api.dicebear.com/6.x/initials/svg?seed=${data?.username}&backgroundColor=3e3f4a&chars=1`}
          alt="User Avatar"
        />
        <div className="flex max-[420px]:flex-col  justify-between font-medium text-gray-900 w-full">
          <div>
            <p className="font-bold text-lg md:text-2xl ">{`${data?.username}`}</p>
            <p className="text-md font-normal lg:text-lg text-gray-500">
              {data?.email}
            </p>
          </div>
          <button
            className="p-1 h-fit w-fit bg-slate-800 text-white rounded-md max-[420px]:mt-1"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </div>
      {allOrders.length > 0 ? (
        <>
          <h2 className="font-semibold text-2xl mb-1 text-center">
            Your Orders
          </h2>
          <div className="flex flex-col gap-y-2">
            {allOrders.map(product => {
              return (
                <div className="w-full h-auto md:flex max-md:flex-col border border-gray-300 border-1 rounded ">
                  <div className="flex flex-col basis-1/3 text-sm gap-y-1 p-2">
                    <div className="flex gap-1">
                      <div className="font-semibold">Payment ID:</div>
                      <div>{product.paymentId}</div>
                    </div>
                    <div className="flex gap-1">
                      <div className="font-semibold">Order ID:</div>
                      <div>{product.orderId}</div>
                    </div>
                    <div className="flex gap-1">
                      <div className="font-semibold">Amount Paid:</div>
                      <div>${product.amount}</div>
                    </div>
                    <div className="flex-col gap-1">
                      <div className="font-semibold inline-block">
                        Delivery Address:
                      </div>
                      <div>
                        {`${product.deliveryAddress.name}, ${product.deliveryAddress.street}, ${product.deliveryAddress.city}, ${product.deliveryAddress.state}, ${product.deliveryAddress.country}, ${product.deliveryAddress.zipcode}, ${product.deliveryAddress.phoneNumber}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col basis-2/3 p-2 gap-2">
                    <h2 className="font-semibold">Products Ordered :</h2>
                    <div className="flex flex-col w-full gap-2">
                      {product.products.map(item => {
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
                                Price :
                                <span className="font-normal">
                                  {item.price}
                                </span>
                              </p>
                              <p className="font-semibold">
                                Quantity :
                                <span className="font-normal">
                                  {item.quantity}
                                </span>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ProfileSection;
