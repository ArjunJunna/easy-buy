import { publicRequest,userRequest } from '../requestMethods';
import { WishlistArgType } from '../../Types';

export type ProductData = {
  _id: string;
  category: string;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: { rate: number; count: number };
  quantity:number;
};

const getAllProducts = async () => {
  try {
    const response = await publicRequest.get('/products');
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
};

const getSingleProduct = async (_id: string) => {
  try {
    const response = await publicRequest.get(`/products/${_id}`);
    return response;
  } catch (error: any) {
    console.log(error.response);
  }
};

const addToWishlist = async (arg: WishlistArgType) => {
  try {
    const { userId } = arg;
    const response = await userRequest.post(`/wishlist/${userId}`, arg);
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
};

const getWishlist = async (arg: string) => {
  try {
 
    const response = await userRequest.get(`/wishlist/${arg}`);

    return response;
  } catch (error: any) {
    console.log(error.message);
  }
};

const removeProductFromWishlist = async (arg: WishlistArgType) => {
  try {
    const { userId } = arg;
    const response = await userRequest.delete(`/wishlist/${userId}`, {
      data: arg,
    });
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
};

export {
  getAllProducts,
  getSingleProduct,
  addToWishlist,
  removeProductFromWishlist,
  getWishlist,
};
