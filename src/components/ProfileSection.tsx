import { useAppDispatch, useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { LogoutHandler } from '../features/auth/authSlice';
import { ClearWishlist } from '../features/products/productsSlice';
import { ClearCartlist } from '../features/cartlist/cartSlice';

const ProfileSection = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const id = useAppSelector(state => state?.profile?.userData?.id);
  const data = useAppSelector(state => state.profile.userData);
  const isLoading = useAppSelector(state => state.profile.isLoading);

  const logout = () => {
    navigate('/');
    dispatch(ClearWishlist());
    dispatch(ClearCartlist());
    dispatch(LogoutHandler());
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="flex p-4 gap-5 bg-slate-200 rounded-2xl shadow-xl w-96 mx-2">
      <img
        className="w-28 h-28 rounded-full sm:w-24 sm:h-24 bg-slate-800"
        src={data?.image}
        alt="User Avatar"
      />
      <div className="flex flex-col grow gap-1 font-medium text-gray-900">
        <div className="name-credentials">
          <p className="font-bold text-lg md:text-2xl lg:text-3xl ">{`${data?.firstName} ${data?.lastName}`}</p>
          <p className="text-sm text-gray-500 ">@{data?.username}</p>
        </div>
        <p className="text-md font-normal lg:text-lg">{data?.gender}</p>
        <p className="text-md font-normal lg:text-lg">{data?.email}</p>
        <button
          className="p-2 w-full bg-slate-800 text-white rounded-md"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
