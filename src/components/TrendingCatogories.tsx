import { useNavigate } from 'react-router-dom';

const TrendingCatogories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      imageSrc: '/assets/electronics.png',
      alt: 'Electronics',
      name: 'Electronics',
    },
    {
      id: 2,
      imageSrc: '/assets/jewelery.jpeg',
      alt: 'Jewelry',
      name: 'Jewelry',
    },
    {
      id: 3,
      imageSrc: "/assets/men's-clothing.jpg",
      alt: "Men's Clothing",
      name: "Men's Clothing",
    },
    {
      id: 4,
      imageSrc: "/assets/women's-clothing.jpeg",
      alt: "Women's Clothing",
      name: "Women's Clothing",
    },
  ];
  return (
    <div className="flex justify-around flex-wrap gap-2 ">
      {categories.map(category => (
        <div
          key={category.id}
          className="flex justify-center items-center bg-gray-200 text-2xl w-56 cursor-pointer relative rounded-2xl hover:shadow-2xl hover:animate-pulse"
          onClick={() => navigate('/products')}
        >
          <img
            src={category.imageSrc}
            alt={category.alt}
            className="h-full w-full rounded-2xl"
            loading="lazy"
          />
          <span className="absolute text-blue-100 font-body font-semibold">
            {category.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TrendingCatogories;
