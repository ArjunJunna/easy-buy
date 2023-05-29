import { ProductData } from '../features/products/productsSlice';
import { titleShortner } from '../utils/utilities';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { fetchSingleProduct } from '../features/products/productsSlice';

type TrendingCardProp = {
  itemInfo: ProductData;
};

const TrendingCard = ({ itemInfo }: TrendingCardProp) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const productTitle = titleShortner(itemInfo.title, 3);
  const goToCartHandler = () => {
    navigate(`/products/${itemInfo.id}`);
    dispatch(fetchSingleProduct(itemInfo.id));
  };
  return (
    <div
      className="h-48 w-48 flex flex-col rounded-md shadow-md relative hover:cursor-pointer hover:shadow-2xl"
      onClick={() => goToCartHandler()}
    >
      <img
        className="h-full w-full rounded-md cursor-pointer shrink-0"
        src={itemInfo?.image}
      />

      <div className="absolute w-full bottom-4 left-0 font-body font-semibold text-sm text-center flex justify-center items-center py-2.5 bg-slate-200 opacity-80 ">
        <span className="text-black">{productTitle}</span>
      </div>
    </div>
  );
};

export default TrendingCard;
