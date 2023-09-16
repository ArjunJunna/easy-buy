import { userRequest } from '../requestMethods';

const addOrder=async(arg:any)=>{
     try {
       const response =await userRequest.post(`/orders`,arg);
     
       return response;
     } catch (error: any) {
       console.log(error.message);
     }
}

const getAllUserOrders = async (userId: string) => {
  try {
    const response = await userRequest.get(`/orders/${userId}`);
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
};

export{addOrder,getAllUserOrders};