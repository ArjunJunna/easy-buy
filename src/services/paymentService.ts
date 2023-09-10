import { userRequest } from '../requestMethods';

const createOrder = async (amount: number) => {
  try {
    const response = await userRequest.post(`/payment/checkout`, { amount });
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
};

const getKey=async()=>{
  try {
     const response = await userRequest.get(`/getkey`);
     return response;
  } catch (error:any) {
    console.log(error.message);
  }
}

export { createOrder, getKey };
