import { useNavigate } from 'react-router-dom';
import TrendingProducts from '../components/TrendingProducts';
import TrendingCatogories from '../components/TrendingCatogories';
import ScrollToTop from '../components/ScrollToTop';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen flex flex-col gap-y-6 p-1 relative">
        <div className="relative m-1 rounded-lg">
          <img
            src='/assets/easy-buy-illustration.svg'
            alt="image"
            className="w-full h-96 bg-cover bg-slate-600 p-6 rounded-3xl"
          />
          <button
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-200 px-3 text-slate-700 font-body font-semibold text-lg rounded-md opacity-90 hover:opacity-60"
            onClick={() => navigate('/products')}
          >
            Let's go buy
          </button>
        </div>
        <span className="text-2xl text-center"> Our Trending Categories</span>
        <TrendingCatogories />
        <span className="text-2xl text-center"> Our Trending Products</span>
        <TrendingProducts />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Home;
