import { Navigate, Route, Routes } from 'react-router-dom';
import ErrorPage from '../pages/404Error';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Profile from '../pages/Profile';
import SingleProduct from '../pages/SingleProduct';
import Checkout from '../pages/CheckoutPage';
import Wishlist from '../pages/Wishlist';
import PaymentSuccess from '../pages/PaymentSuccess';
import { useAppSelector } from '../hooks';
import { PrivateRoute } from './PrivateRoute';
import { ResetScroll } from '../components/ResetScroll';
import UserLogin from '../components/UserLogin';
import UserSignUp from '../components/UserSignUp';

const AppRoute = () => {
  const token = useAppSelector(state => state.auth.token);
  return (
    <>
      <ResetScroll>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route path="cartlist" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="products" element={<Products />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="profile" element={<Profile />} />
            <Route path="products/:productId" element={<SingleProduct />} />
            <Route path="paymentsuccess" element={<PaymentSuccess />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
          {!token ? (
            <>
              <Route path="/login" element={<UserLogin />} />
              <Route path="/signup" element={<UserSignUp />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/signup" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </ResetScroll>
    </>
  );
};

export default AppRoute;
