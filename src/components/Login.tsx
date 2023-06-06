import { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { loginHandler } from '../features/auth/authSlice';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    input: { username: '', password: '' },
    error: '',
  });

  const loginInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin({ ...login, input: { ...login.input, [name]: value } });
    
  };

  const submitForm = () => {
    
    if (login.input.username && login.input.password) {
      dispatch(loginHandler({ login, setLogin }));
      navigate('/', { replace: true });
    } else return;
  };

  if (login.error) {
    console.log('Login credentials invalid...');
  }

  return (
    <>
      <div className="h-[30rem] mt-2">
        <div className="m-auto p-4 w-fit rounded-lg border border-gray-200 bg-gray-200/40 sm:p-6 sm:w-96 lg:p-8">
          <form
            className="space-y-6"
            onSubmit={e => {
              e.preventDefault();
              submitForm();
            }}
          >
            <h5 className="text-xl font-medium text-center text-gray-900 ">
              Sign In
            </h5>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Username
              </label>
              <input
                type="name"
                name="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-slate-500 block w-full p-2.5 "
                placeholder="e.g. tomcruise"
                value={login.input.username || ''}
                onChange={loginInputHandler}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-slate-500 block w-full p-2.5 "
                minLength={8}
                value={login.input.password || ''}
                onChange={loginInputHandler}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-slate-600 hover:bg-slate-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              onClick={() => submitForm()}
            >
              Login
            </button>
            <button
              type="submit"
              className="w-full text-slate-600 hover:text-white  border border-slate-600 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 hover:bg-slate-600"
              onClick={() => {
                setLogin({
                  ...login,
                  input: {
                    username: 'kminchelle',
                    password: '0lelplR',
                  },
                });
              }}
            >
              Login as Guest
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
