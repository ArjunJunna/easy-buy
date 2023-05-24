import axios from 'axios';

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
