import { ProductData } from '../features/products/productsSlice';
import { titleShortner } from '../utils/utilities';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import {
  fetchSingleProduct,
  AddToWishlist,
} from '../features/products/productsSlice';
import { AddToCart } from '../features/cartlist/cartSlice';
import { useAppSelector } from '../hooks';
import { RemoveFromWishlist } from '../features/products/productsSlice';

type ProductCardProps = {
  itemInfo: ProductData;
};

const ProductCard = ({ itemInfo }: ProductCardProps) => {
  const {
    id,
    title,
    image,
    category,
    price,
    rating: { rate },
  } = itemInfo;
  const dispatch = useAppDispatch();
  const productTitle = titleShortner(title);
  const navigate=useNavigate();
  
  const cartItems = useAppSelector(state => state.cart.cartData);
  const wishlistItems = useAppSelector(state => state.products.wishlistData);

  const clickHandler = () => {
    dispatch(AddToCart(itemInfo));
  };

  const goToCartHandler = () => {
    navigate(`/products/${id}`);
    dispatch(fetchSingleProduct(id));
  };

  const addToWishlistHandler = () => {
    dispatch(AddToWishlist(itemInfo));

  };

  const removeFromWishlistHandler = (id: number) => {
    dispatch(RemoveFromWishlist(id));
    
  };

  const value = cartItems.some((item: ProductData) => item.id === id);
  const likedProduct = wishlistItems.some(
    (item: ProductData) => item.id === id
  );

  return (
    <>
      <div className="h-64 w-64 rounded-md shadow-md  relative hover:shadow-2xl">
        <img
          src={image}
          alt={productTitle}
          className="h-[70%] w-full rounded-t-md cursor-pointer"
          onClick={() => goToCartHandler()}
        />
        <div className="flex flex-col gap-y-1 p-2">
          <h2 className="text-white font-body font-semibold text-xs cursor-pointer absolute bottom-20 bg-slate-600 px-1.5 rounded opacity-70">
            {category}
          </h2>
          <h2 className="text-black font-body font-semibold text-sm">
            {productTitle}
          </h2>
          <h2 className="text-green-600 font-body font-semibold text-xs absolute bottom-2">
            {price.toFixed(2)} <span className="text-yellow-600">$</span>
          </h2>
        </div>

        <span className="absolute top-0 m-2 bg-gray-500 text-xs text-white font-semibold rounded p-1 shadow-xl opacity-80 cursor-pointer">
          {rate.toFixed(1)}
          <i className="bi bi-star-fill text-yellow-500 ml-1"></i>
        </span>
        {likedProduct ? (
          <>
           
            <span
              className="flex items-center justify-center absolute top-2 right-2 bg-gray-300 opacity-80 h-6 w-6 rounded-full cursor-pointer"
              onClick={() => removeFromWishlistHandler(id)}
            >
              <i className="bi bi-heart-fill text-base text-red-500"></i>
            </span>
          </>
        ) : (
          <>
           
            <span
              className="flex items-center justify-center absolute top-2 right-2 bg-gray-300 opacity-80 h-6 w-6 rounded-full cursor-pointer"
              onClick={() => addToWishlistHandler()}
            >
              <i className="bi bi-heart-fill  text-white text-base hover:text-red-500"></i>
            </span>
          </>
        )}

        {value ? (
          <>
            <button
              className="text-gray-800 absolute bottom-2 right-2 bg-neutral-200 font-body font-semibold text-base rounded px-2 hover:bg-slate-600 hover:text-white"
              onClick={() => navigate('/cartlist')}
            >
              Go to Cart <i className="bi bi-cart"></i>
            </button>
          </>
        ) : (
          <>
            <button
              className="text-gray-800 absolute bottom-2 right-2 bg-neutral-200 font-body font-semibold text-base rounded px-2 hover:bg-slate-600 hover:text-white"
              onClick={() => clickHandler()}
            >
              Add to Cart <i className="bi bi-cart"></i>
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ProductCard;
