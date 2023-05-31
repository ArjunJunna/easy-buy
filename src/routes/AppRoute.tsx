import { Navigate, Route, Routes } from 'react-router-dom';
import ErrorPage from '../pages/404Error';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import Newlaunches from '../pages/Newlaunches';
import Products from '../pages/Products';
import Profile from '../pages/Profile';
import SingleProduct from '../pages/SingleProduct';
import Wishlist from '../pages/Wishlist';
import { useAppSelector } from '../hooks';
import { PrivateRoute } from './PrivateRoute';
import Login from '../components/Login';

const AppRoute = () => {
  const token = useAppSelector(state => state.auth.token);
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="cartlist" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="products" element={<Products />} />
          <Route path="profile" element={<Profile />} />
          <Route path="newlaunches" element={<Newlaunches />} />
          <Route path="products/:productId" element={<SingleProduct />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
        {!token ? (
          <>
            <Route path="/login" element={<Login />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRoute;
