import { useState } from 'react';
import {
  AddToWishlist,
  RemoveFromWishlist,
} from '../features/products/productsSlice';
import {
  RemoveFromCart,
  AddToCart,
  UpdateQuantity,
} from '../features/cartlist/cartSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { titleShortner } from '../utils/utilities';
import { ProductData } from '../features/cartlist/cartSlice';

type ProductDataProp = {
  itemInfo: ProductData;
};

const ProductCard = ({ itemInfo }: ProductDataProp) => {
  const {
    id,
    title,
    image,
    category,
    price,
    rating: { rate, count },
    qty,
  } = itemInfo;
  const productTitle = titleShortner(title,5);

  const dispatch = useAppDispatch();
  const [itemCount, setItemCount] = useState(1);
  const wishlistItems = useAppSelector(state => state.products.wishlistData);
  const cartItems = useAppSelector(state => state.cart.cartData);
  const likedProduct = wishlistItems.some(item => item.id === id);

  const addToWishlistHandler = () => {
    dispatch(AddToWishlist(itemInfo));
  };

  const removeFromWishlistHandler = (id: number) => {
    dispatch(RemoveFromWishlist(id));
  };

  const removeFromCartlistHandler = (id: number) => {
    dispatch(RemoveFromCart(id));
  };

  const increaseQuantity = (id: number) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, qty: item.qty + 1 };
      }
      return item;
    });

    dispatch(UpdateQuantity(updatedCartItems));
  };
  const decreaseQuantity = (id: number) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, qty: item.qty - 1 };
      }
      return item;
    });

    dispatch(UpdateQuantity(updatedCartItems));
  };

  return (
    <>
      <div className=" flex md:flex-row h-52 w-[35rem] max-sm:w-[27rem] bg-slate-200 rounded-md shadow-lg">
        <div className="basis-36 md:basis-44 shrink-0 relative">
          <img src={image} alt={title} className="h-full w-full" />
          <span className="absolute top-0 m-2 bg-gray-500 text-xs text-white font-semibold rounded p-1 shadow-xl opacity-80 cursor-pointer">
            {rate.toFixed(1)}
            <i className="bi bi-star-fill text-yellow-500 ml-1"></i>
          </span>

          {likedProduct ? (
            <>
              <span
                className="flex items-center justify-center absolute top-2 right-2 bg-slate-400 opacity-80 h-6 w-6 rounded-full cursor-pointer"
                onClick={() => removeFromWishlistHandler(id)}
              >
                <i className="bi bi-heart-fill text-base text-red-500"></i>
              </span>
            </>
          ) : (
            <>
              <span
                className="flex items-center justify-center absolute top-2 right-2 bg-slate-400 opacity-80 h-6 w-6 rounded-full cursor-pointer"
                onClick={() => addToWishlistHandler()}
              >
                <i className="bi bi-heart-fill  text-white text-base hover:text-red-500"></i>
              </span>
            </>
          )}
          <h2 className="text-white font-body font-semibold text-[11px] cursor-pointer bg-slate-500 px-1 py-0.5 rounded opacity-80 w-fit my-1 absolute bottom-1 left-1">
            {category}
          </h2>
        </div>
        <div className=" w-full p-2 md:p-4 flex flex-col">
          <div className="flex-grow p-1 flex flex-col gap-y-2">
            <h1 className="font-body font-semibold text-lg">{productTitle}</h1>
            <div className="flex items-center gap-y-2">
              <span className="text-xs text-gray-400">{count} ratings</span>
            </div>
            <h2 className="text-green-600 font-body font-semibold text-2xl">
              {price.toFixed(2)} <span className="text-yellow-600">$</span>
            </h2>
            <div className="flex font-body font-semibold items-center">
              <span className="text-sm">Quantity</span>
              <div className="ml-4 flex gap-x-4">
                <button
                  className="px-1 bg-slate-400 text-white rounded-full"
                  onClick={() => {
                    setItemCount(count => count + 1);
                    increaseQuantity(id);
                  }}
                >
                  +
                </button>
                {qty}
                <button
                  className="px-1 bg-slate-400 text-white rounded-full"
                  onClick={() => {
                    if (qty < 2) {
                      removeFromCartlistHandler(id);
                      dispatch(RemoveFromCart(id));
                    } else {
                      setItemCount(count => count - 1);
                      decreaseQuantity(id);
                    }
                  }}
                >
                  -
                </button>
              </div>
            </div>
          </div>

          <button
            className="w-full text-gray-800 bg-orange-400 hover:bg-orange-300 p-2 rounded font-semibold shadow-lg text-sm"
            onClick={() => removeFromCartlistHandler(id)}
          >
            Remove From Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
