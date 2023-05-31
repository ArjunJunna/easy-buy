import { useNavigate } from 'react-router-dom';

const TrendingCatogories = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-around flex-wrap gap-2">
      <div
        className="flex justify-center items-center bg-gray-200   text-2xl w-56 cursor-pointer relative rounded-2xl"
        onClick={() => navigate('/products')}
      >
        <img
          src="../../public/assets/electronics.png"
          alt="Electronics"
          className="h-full w-full rounded-2xl"
        />
        <span className="absolute text-orange-950 font-body font-semibold">
          Electronics
        </span>
      </div>
      <div
        className="flex justify-center items-center bg-gray-200   text-2xl w-56 cursor-pointer relative rounded-2xl"
        onClick={() => navigate('/products')}
      >
        <img
          src="../../public/assets/jewelery.jpeg"
          alt="Jewelery"
          className="h-full w-full rounded-2xl"
        />
        <span className="absolute text-orange-950 font-body font-semibold">
          Jewelery
        </span>
      </div>
      <div
        className="flex justify-center items-center bg-gray-200   text-2xl w-56 cursor-pointer relative rounded-2xl"
        onClick={() => navigate('/products')}
      >
        <img
          src="../../public/assets/men's-clothing.jpg"
          alt="Men's Clothing"
          className="h-full w-full rounded-2xl"
        />
        <span className="absolute text-orange-950 font-body font-semibold">
          Men's Clothing
        </span>
      </div>
      <div
        className="flex justify-center items-center bg-gray-200   text-2xl w-56 cursor-pointer relative rounded-2xl"
        onClick={() => navigate('/products')}
      >
        <img
          src="../../public/assets/women's-clothing.jpeg"
          alt="Women's Clothing"
          className="h-full w-full rounded-2xl"
        />
        <span className="absolute text-orange-950 font-body font-semibold">
          Women's Clothing
        </span>
      </div>
    </div>
  );
};

export default TrendingCatogories;
