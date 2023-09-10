import { userRequest } from "../requestMethods";
import { AddToCartType,RemoveFromCartType } from "../../Types";

const addToCart=async(arg:AddToCartType)=>{
    try {
        const {userId}=arg;
        const response=await userRequest.post(`/carts/${userId}`,arg);
        return response;
    } catch (error:any) {
        console.log(error.message);
    }
}

const getUserCart=async(_id:string)=>{
    try {
        const response=await userRequest.get(`/carts/${_id}`);
        return response;
    } catch (error:any) {
          console.log(error.message);
    }
}

const removeProductFromCart = async (arg: RemoveFromCartType) => {
  try {
    const { userId } = arg;
    const response = await userRequest.delete(`/carts/${userId}`, {
      data: arg,
    });
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
};

export{addToCart,getUserCart,removeProductFromCart};