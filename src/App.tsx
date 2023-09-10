import './App.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { Toaster } from 'react-hot-toast';
import { fetchAllProducts } from './features/products/productsSlice';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoute from './routes/AppRoute';
import { fetchUser } from './features/profile/profileSlice';

function App() {
  const dispatch = useAppDispatch();
  const name = useAppSelector(state => state?.auth?.user);
  
  useEffect(() => {
     dispatch(fetchAllProducts());
    if (name!==null) {
      //dispatch(fetchUser(name as string));
       /*const token = localStorage.getItem('token');
       if (token) {
         dispatch(fetchUser(name as string));
       }*/
      
       dispatch(fetchUser(name as string));
    }
  }, [name, dispatch]);



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
