import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { signupHandler } from '../features/auth/authSlice';
import { useForm, type FieldValues } from 'react-hook-form';
import { checkForValid } from '../utils/validate';

const UserSignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

const [errorMessage,setErrorMessage]=useState<string | null>(null);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const userSubmit = (data: FieldValues) => {
    const { username, email, password } = data;
    const message = checkForValid({ username, email, password });
    setErrorMessage(message);
    if(message===null){
      dispatch(signupHandler({ username, email, password }));
      navigate('/', { replace: true });
    }
  };

  return (
    <>
      <div className="h-[30rem] mt-10 min-h-screen">
        <form
          className="space-y-2 m-auto p-4 w-fit rounded-lg border border-gray-200 sm:p-6 sm:w-96 lg:p-8 bg-gray-200/40"
          onSubmit={e => {
            e.preventDefault();

            handleSubmit(userSubmit)();
          }}
        >
          <h5 className="text-xl font-medium text-center text-gray-900">
            Sign Up
          </h5>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Username
            </label>
            <input
              {...register('username', { required: 'Username is required!' })}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-slate-500 block w-full p-2.5"
              placeholder="e.g. Tom Cruise"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-0.5">{`${errors.username.message}`}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              {...register('email', { required: 'Email is required!' })}
              type="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-slate-500 block w-full p-2.5 "
              placeholder="e.g. tomcruise@gmail.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-0.5">{`${errors.email.message}`}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              {...register('password', {
                required: 'Password is required!',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters including a upper case, lower case, a digit and a special character.',
                },
              })}
              type="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-slate-500 block w-full p-2.5 "
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-0.5">{`${errors.password.message}`}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Confirm Password
            </label>
            <input
              {...register('passwordconfirmation', {
                required: 'Password needs confirmation!',
                validate: value =>
                  value === getValues('password') || 'Passwords must match',
              })}
              type="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-slate-500 block w-full p-2.5 "
            />
            {errors.passwordconfirmation && (
              <p className="text-red-500 text-xs mt-0.5">{`${errors.passwordconfirmation.message}`}</p>
            )}
          </div>
          {errorMessage && (
            <p className="text-red-500 text-xs mt-0.5">{`${errorMessage}`}</p>
          )}
          <button
            className="w-full text-white bg-slate-600 hover:bg-slate-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-orange-500"
            type="submit"
            disabled={isSubmitting}
          >
            Create New Account
          </button>

          <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-300">
            <span className="text-gray-500">Already have an account?</span>
            <Link to="/login" className="text-gray-800 ml-4 hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserSignUp;
