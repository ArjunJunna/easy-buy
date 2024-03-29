import { ProductData } from '../../Types';
import { titleShortner } from '../utils/utilities';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { fetchSingleProduct } from '../features/products/productsSlice';
import { useAppSelector } from '../hooks';
import { addProductToCart } from '../features/cartlist/cartSlice';
import {
  addProductToWishlist,
  deleteProductFromWishlist,
} from '../features/products/productsSlice';

type ProductCardProps = {
  itemInfo: ProductData;
};

const ProductCard = ({ itemInfo }: ProductCardProps) => {
  const {
    _id,
    title,
    image,
    category,
    price,
    rating: { rate },
    inStock,
  } = itemInfo;
  const dispatch = useAppDispatch();
  const productTitle = titleShortner(title, 5);
  const navigate = useNavigate();

  const cartItems = useAppSelector(state => state.cart.cartData);
  const wishlistItems = useAppSelector(state => state.products.wishlistData);
  const userId = useAppSelector(state => state.profile.userData?._id) ?? '';

  const clickHandler = () => {
    const productId = _id;
    const quantity = 1;
    dispatch(addProductToCart({ userId, productId, quantity }));
  };

  const goToCartHandler = () => {
    navigate(`/products/${_id}`);
    dispatch(fetchSingleProduct(_id));
  };

  const addToWishlistHandler = () => {
    const productId = _id;
    dispatch(addProductToWishlist({ userId, productId }));
  };

  const removeFromWishlistHandler = () => {
    const productId = _id;
    dispatch(deleteProductFromWishlist({ userId, productId }));
  };

  const value = cartItems.some((item: ProductData) => item._id === _id);
  const likedProduct = wishlistItems.some(
    (item: ProductData) => item._id === _id
  );

  return (
    <>
      <div className="h-64 w-64 rounded-md shadow-md  relative hover:shadow-2xl">
        <img
          src={image}
          alt={productTitle}
          className="h-[70%] w-full rounded-t-md cursor-pointer"
          onClick={() => goToCartHandler()}
          loading="lazy"
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
              onClick={e => {
                e.stopPropagation();
                removeFromWishlistHandler();
              }}
            >
              <i className="bi bi-heart-fill text-base text-red-500"></i>
            </span>
          </>
        ) : (
          <>
            <span
              className="flex items-center justify-center absolute top-2 right-2 bg-gray-300 opacity-80 h-6 w-6 rounded-full cursor-pointer"
              onClick={e => {
                e.stopPropagation();
                addToWishlistHandler();
              }}
            >
              <i className="bi bi-heart-fill  text-white text-base hover:text-red-500"></i>
            </span>
          </>
        )}
        {inStock ? (
          <>
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
                  onClick={e => {
                    e.stopPropagation();
                    clickHandler();
                  }}
                >
                  Add to Cart <i className="bi bi-cart"></i>
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <button className="text-gray-100 absolute bottom-2 right-2 bg-black font-body font-semibold text-base rounded px-2 cursor-default">
              Out of Stock
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ProductCard;
