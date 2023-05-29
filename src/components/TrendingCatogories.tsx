import { useNavigate } from "react-router-dom";

const TrendingCatogories = () => {
    const navigate=useNavigate();
  return (
    <div className="flex justify-around h-44 flex-wrap gap-2">
      <div
        className="flex justify-center items-center bg-gray-200   text-2xl w-56 cursor-pointer relative rounded-2xl"
        onClick={() => navigate('/products')}
      >
        <img
          src="src/assets/electronics"
          alt=""
          className="h-full w-full rounded-2xl"
        />
        <span className="absolute text-orange-950 font-body font-semibold">
          Electronics
        </span>
      </div>
      <div
        className="flex justify-center items-center bg-gray-200 rounded-2xl text-orange-950 font-body font-semibold text-2xl w-56 cursor-pointer"
        onClick={() => navigate('/products')}
      >
        Jewelry
      </div>
      <div
        className="flex justify-center items-center bg-gray-200 rounded-2xl text-orange-950 font-body font-semibold text-2xl w-56 cursor-pointer"
        onClick={() => navigate('/products')}
      >
        Men's Clothing
      </div>
      <div
        className="flex justify-center items-center bg-gray-200 rounded-2xl text-orange-950 font-body font-semibold text-2xl w-56 cursor-pointer"
        onClick={() => navigate('/products')}
      >
        Women's Clothing
      </div>
    </div>
  );
}

export default TrendingCatogories