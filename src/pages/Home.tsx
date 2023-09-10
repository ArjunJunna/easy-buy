
import TrendingProducts from '../components/TrendingProducts';
import TrendingCatogories from '../components/TrendingCatogories';
import ScrollToTop from '../components/ScrollToTop';
import ImageSlider from '../components/ImageSlider';


const Home = () => {

  return (
    <>
    
      <div className="min-h-screen flex flex-col gap-y-6 p-1 relative">
        <ImageSlider/>
        <span className="text-2xl text-center mt-2"> Our Trending Categories</span>
        <TrendingCatogories />
        <span className="text-2xl text-center"> Our Trending Products</span>
        <TrendingProducts />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Home;
