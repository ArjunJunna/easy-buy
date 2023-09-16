import './App.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { Toaster } from 'react-hot-toast';
import { fetchAllProducts, fetchWishlist } from './features/products/productsSlice';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoute from './routes/AppRoute';
import { fetchUser } from './features/profile/profileSlice';
import { fetchUserCart } from './features/cartlist/cartSlice';

function App() {
  const dispatch = useAppDispatch();
  const name = useAppSelector(state => state?.auth?.user);
  const userId=useAppSelector(state=>state?.profile?.userData?._id);
   
  useEffect(() => {
     dispatch(fetchAllProducts());
    if (name!==null) {
       dispatch(fetchUser(name as string));
       
    }
    if(userId!==''){
      dispatch(fetchUserCart(userId as string));
      dispatch(fetchWishlist(userId as string));
    }
  }, [name, dispatch,userId]);

  return (
    <>
      <div className="bg-slate-50 min-h-screen relative">
        <Toaster position="bottom-right" reverseOrder={true} />
        <Navbar />
        <AppRoute />
        <Footer />
      </div>
    </>
  );
}

export default App;
