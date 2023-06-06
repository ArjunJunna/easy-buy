import axios from 'axios';

export type ProductData = {
  id: number;
  category: string;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: { rate: number; count: number };
};

const getAllProducts = async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
};

const getSingleProduct = async (id: number) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response;
  } catch (error: any) {
    console.log(error.response);
  }
};

export { getAllProducts, getSingleProduct };
