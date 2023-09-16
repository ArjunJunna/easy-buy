import { userRequest } from '../requestMethods';

const createOrder = async (amount: number) => {
  try {
   
    const amountAsInteger = parseInt(amount.toString(), 10); 
    const response = await userRequest.post(`/payment/checkout`, {
      amount: amountAsInteger,
    });
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
