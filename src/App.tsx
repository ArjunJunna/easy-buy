import './App.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { Toaster } from 'react-hot-toast';
import { fetchAllProducts } from './features/products/productsSlice';
import Navbar from './components/Navbar';
import AppRoute from './routes/AppRoute';
import { fetchUser } from './features/profile/profileSlice';

function App() {
  const dispatch = useAppDispatch();
  const id=useAppSelector(state=>state?.profile?.userData?.id);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchUser(id as number));
  }, [id]);
  return (
    <>
      <div className="bg-slate-50 min-h-screen relative">
        <Toaster position="bottom-right" reverseOrder={true} />
        <Navbar />
        <AppRoute />
      </div>
    </>
  );
}

export default App;
