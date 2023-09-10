import { useAppDispatch } from '../hooks';
import { Link, useNavigate } from 'react-router-dom';
import { loginHandler } from '../features/auth/authSlice';
import { useForm, type FieldValues } from 'react-hook-form';

const UserLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const userSubmit = (data: FieldValues) => {
    const { username, password } = data;
    dispatch(loginHandler({ username, password }));
    navigate('/', { replace: true });
  };

  const onGuestLogin = async () => {
    setValue('username', 'GuestUser');
    setValue('password', 'GuestUser@1');
    handleSubmit(userSubmit)();
  };

  return (
    <>
      <div className="h-[30rem] mt-10 min-h-screen">
        <form
          className="m-auto p-4 w-fit rounded-lg border border-gray-300 bg-gray-200/40 sm:p-6 sm:w-96 lg:p-8 space-y-6"
          onSubmit={e => {
            e.preventDefault(); 
            handleSubmit(userSubmit)();
          }}
        >
          <h5 className="text-xl font-medium text-center text-gray-900 ">
            Sign In
          </h5>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Username
            </label>
            <input
              {...register('username', { required: 'Username is required!' })}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-slate-500 block w-full p-2.5 "
              placeholder="e.g. tomcruise"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-0.5">{`${errors.username.message}`}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              {...register('password', { required: 'Password is required!' })}
              type="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-slate-500 block w-full p-2.5 "
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-0.5 font-normal">{`${errors.password.message}`}</p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full text-white bg-slate-600 hover:bg-slate-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-orange-500"
          >
            Login
          </button>
          <button
            type="submit"
            className="w-full text-slate-600 hover:text-white  border border-slate-600 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 hover:bg-slate-600"
            onClick={(e)=>{
              e.preventDefault();
              onGuestLogin();
            }}
          >
            Login as Guest
          </button>
          <div className="text-sm font-medium text-center text-gray-800 dark:text-gray-300">
            <span className="text-gray-500">Don't have an account?</span>
            <Link to="/signup" className="text-gray-800 ml-4 hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserLogin;
