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
          src="../../src/assets/electronics.png"
          alt=""
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
          src="../../src/assets/jewelery.jpeg"
          alt=""
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
          src="../../src/assets/men's-clothing.jpg"
          alt=""
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
          src="../../src/assets/women's-clothing.jpeg"
          alt=""
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
