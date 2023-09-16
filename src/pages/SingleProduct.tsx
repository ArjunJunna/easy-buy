import { useAppSelector, useAppDispatch } from '../hooks';
import { ProductData } from '../../Types';
import { addProductToCart } from '../features/cartlist/cartSlice';
import {
  addProductToWishlist,
  deleteProductFromWishlist,
} from '../features/products/productsSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const SingleProduct = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const singleProductData = useAppSelector(
    state => state?.products?.singleProductData
  );
  const userId = useAppSelector(state => state.profile.userData?._id) ?? '';
  const cartItems = useAppSelector(state => state.cart.cartData);
  const wishlistItems = useAppSelector(state => state.products.wishlistData);
  if (!singleProductData) {
    return <Loader />;
  }
  const {
    _id,
    category,
    title,
    price,
    description,
    image,
    rating: { rate, count },
    inStock,
  } = singleProductData;

  const isInCartlist = cartItems.some((item: ProductData) => item._id === _id);

  const clickHandler = () => {
    const productId = _id;
    const quantity = 1;
    dispatch(addProductToCart({ userId, productId, quantity }));
  };

  const likedProduct = wishlistItems.some(
    (item: ProductData) => item._id === _id
  );

  const addToWishlistHandler = () => {
    const productId = _id;
    dispatch(addProductToWishlist({ userId, productId }));
  };

  const removeFromWishlistHandler = () => {
    const productId = _id;
    dispatch(deleteProductFromWishlist({ userId, productId }));
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex basis-1/2 flex-col gap-y-6 p-8 relative">
            <img
              src={image}
              alt={title}
              className="h-80 w-full rounded-md shadow-lg"
            />
            <div className="w-full flex gap-x-4">
              <button className="w-full h-full text-gray-800 bg-slate-400 hover:bg-slate-300 p-2 rounded font-medium shadow-lg">
                <i className="bi bi-lightning-fill mr-2"></i>Buy Now
              </button>
              {inStock ? (
                <>
                  {' '}
                  {isInCartlist ? (
                    <>
                      <button
                        className="w-full h-full text-gray-800 bg-orange-400 hover:bg-orange-300 p-2 rounded font-medium shadow-lg"
                        onClick={() => navigate('/cartlist')}
                      >
                        <i className="bi bi-cart-fill mr-2"></i>Go to Cart
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="w-full h-full text-gray-800 bg-orange-400 hover:bg-orange-300 p-2 rounded font-medium shadow-lg"
                        onClick={() => clickHandler()}
                      >
                        <i className="bi bi-cart-fill mr-2"></i>Add to Cart
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <button
                    className="w-full h-full text-gray-800 bg-orange-400 hover:bg-orange-300 p-2 rounded font-medium shadow-lg cursor-not-allowed"
                    
                  >
                    <i className="bi bi-cart-fill mr-2"></i>Add to Cart
                  </button>
                </>
              )}
            </div>

            {likedProduct ? (
              <>
                <span
                  className="flex items-center justify-center absolute top-10 right-10 bg-slate-200 opacity-80 h-6 w-6 rounded-full cursor-pointer"
                  onClick={() => removeFromWishlistHandler()}
                >
                  <i className="bi bi-heart-fill text-base text-red-500"></i>
                </span>
              </>
            ) : (
              <>
                <span
                  className="flex items-center justify-center absolute top-10 right-10 bg-slate-200 opacity-80 h-6 w-6 rounded-full cursor-pointer"
                  onClick={() => addToWishlistHandler()}
                >
                  <i className="bi bi-heart-fill  text-white text-base hover:text-red-500"></i>
                </span>
              </>
            )}
          </div>
          <div className="flex basis-1/2 flex-col h-auto p-8 font-body font-semibold gap-y-4">
            <div className="flex justify-between">
              <h2 className="text-gray-200 font-body font-semibold text-[11px] cursor-pointer bg-slate-600 px-1 py-0.5 rounded opacity-50 w-fit my-1">
                {category}
              </h2>
              {inStock ? (
                <h2 className="text-gray-200 font-body font-semibold text-[11px] cursor-pointer bg-green-600 px-1 py-0.5 rounded opacity-50 w-fit my-1">
                  In Stock
                </h2>
              ) : (
                <h2 className="text-gray-200 font-body font-semibold text-[11px] cursor-pointer bg-red-600 px-1 py-0.5 rounded opacity-50 w-fit my-1">
                  Out of Stock
                </h2>
              )}
            </div>

            <div>
              <h1 className="font-body font-semibold text-xl">{title}</h1>
              <div className="flex items-center gap-y-2">
                <span className="text-gray-200 font-body font-semibold text-[11px] cursor-pointer bg-slate-500 px-1 py-0.5 rounded opacity-50 w-fit my-1">
                  {rate.toFixed(1)}
                  <i className="bi bi-star-fill text-yellow-500 ml-1"></i>
                </span>
                <span className="ml-2 text-xs text-gray-400">
                  {count} ratings
                </span>
              </div>
            </div>

            <h2 className="text-green-600 font-body font-semibold text-2xl">
              {price.toFixed(2)} <span className="text-yellow-600">$</span>
            </h2>
            <div>
              <span className="text-sm text-gray-400">Description</span>
              <h1 className="font-normal">{description}</h1>
            </div>
            <div className="flex gap-x-3 ">
              <span className="bg-blue-800 rounded-full h-8 w-8 flex justify-center items-center">
                <i className="bi bi-facebook cursor-pointer pt-0.5 text-slate-100"></i>
              </span>
              <span className="bg-green-700 rounded-full h-8 w-8 flex justify-center items-center">
                <i className="bi bi-whatsapp cursor-pointer pt-0.5 text-slate-100"></i>
              </span>
              <span className="bg-yellow-500 rounded-full h-8 w-8 flex justify-center items-center">
                <i className="bi bi-envelope-fill cursor-pointer pt-0.5 text-slate-100"></i>
              </span>
              <span className="bg-blue-500 rounded-full h-8 w-8 flex justify-center items-center">
                <i className="bi bi-twitter cursor-pointer pt-0.5 text-slate-100"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
