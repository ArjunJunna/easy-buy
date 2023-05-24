import { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { Toaster } from 'react-hot-toast';
import { fetchAllProducts } from './features/products/productsSlice';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import Products from './pages/Products';
import Newlaunches from './pages/Newlaunches';
import ErrorPage from './pages/404Error';
import SingleProduct from './pages/SingleProduct';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  return (
    <>
      <div className="bg-slate-50 min-h-screen">
        <Toaster position="bottom-right" reverseOrder={true} />
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="cartlist" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="products" element={<Products />} />
          <Route path="profile" element={<Profile />} />
          <Route path="newlaunches" element={<Newlaunches />} />
          <Route path="products/:productId" element={<SingleProduct />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
