import { useAppSelector, useAppDispatch } from '../hooks';
import { useState } from 'react';
import {
 
  AddToWishlist,
  ProductData,
  RemoveFromWishlist,
} from '../features/products/productsSlice';
import { AddToCart } from '../features/cartlist/cartSlice';
import { useNavigate } from 'react-router-dom';

const SingleProduct = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [itemCount, setItemCount] = useState(1);
  const singleProductData = useAppSelector(
    state => state?.products?.singleProductData
  );
  const cartItems = useAppSelector(state => state.cart.cartData);
  const wishlistItems = useAppSelector(state => state.products.wishlistData);
  if (!singleProductData) {
    return <h1>Loading...</h1>;
  }
  const {
    id,
    category,
    title,
    price,
    description,
    image,
    rating: { rate, count },
  } = singleProductData;

  const isInCartlist = cartItems.some((item: ProductData) => item.id === id);

  const clickHandler = () => {
    dispatch(AddToCart(singleProductData));
   
  };

  const likedProduct = wishlistItems.some(
    (item: ProductData) => item.id === id
  );

  const addToWishlistHandler = () => {
    dispatch(AddToWishlist(singleProductData));
   
  };

  const removeFromWishlistHandler = (id: number) => {
    dispatch(RemoveFromWishlist(id));
   
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
            </div>

            {likedProduct ? (
              <>
                <span
                  className="flex items-center justify-center absolute top-10 right-10 bg-slate-200 opacity-80 h-6 w-6 rounded-full cursor-pointer"
                  onClick={() => removeFromWishlistHandler(id)}
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
            <h2 className="text-gray-200 font-body font-semibold text-[11px] cursor-pointer bg-slate-500 px-1 py-0.5 rounded opacity-50 w-fit my-1">
              {category}
            </h2>
            <div>
              <h1 className="font-body font-semibold text-xl">{title}</h1>
              <div className="flex items-center gap-y-2">
                <span className="text-gray-200 font-body font-semibold text-[11px] cursor-pointer bg-slate-500 px-1 py-0.5 rounded opacity-50 w-fit my-1">
                  {rate.toFixed(1)}
                  <i className="bi bi-star-fill text-yellow-300 ml-1"></i>
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
            <div className="flex gap-x-4">
              <input
                type="number"
                className="bg-slate-300 text-center w-16 p-1 border-gray-800 rounded"
                min={1}
                value={itemCount}
                onChange={e => setItemCount(Number(e.target.value))}
              />
              <button
                className="w-full h-full text-gray-800 bg-orange-400 hover:bg-orange-300 p-2 rounded font-semibold shadow-lg text-sm"
                onClick={() => dispatch(AddToCart(singleProductData))}
              >
                <i className="bi bi-cart-fill mr-2"></i>
                {itemCount === 1
                  ? `ADD TO CART`
                  : `ADD ${itemCount} ITEMS TO CART`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
