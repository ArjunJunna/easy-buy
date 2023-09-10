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

  const logout = () => {
    navigate('/');
    dispatch(ClearWishlist());
    dispatch(ClearCartlist());
    dispatch(LogoutHandler());
    dispatch(ClearProfileData());
  };

  if (isLoading) {
    return <Loader/>;
  }

  return (
    <div className="flex p-4 gap-5 bg-slate-200 rounded-2xl shadow-xl w-96 mx-2">
      <img
        className="w-28 h-28 rounded-full sm:w-24 sm:h-24 bg-slate-800"
        src={`https://api.dicebear.com/6.x/initials/svg?seed=${data?.username}&backgroundColor=3e3f4a&chars=1`}
       
        alt="User Avatar"
      />
      <div className="flex flex-col grow gap-1 font-medium text-gray-900">
        <div className="name-credentials">
          <p className="font-bold text-lg md:text-2xl lg:text-3xl ">{`${data?.username}`}</p>
          <p className="text-sm text-gray-500 ">@{data?.username}</p>
        </div>
      
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
