import { userRequest } from '../requestMethods';
import { UserAddressRequestData } from '../../Types';

export const fetchUserDetails = async (name: string) => {
  try {
    const response = await userRequest.get(
      `/user/?name=${name}`
    );
    return response;
  } catch (error: any) {
    console.log(error.response);
  }
};

export const addNewAddress=async(arg:UserAddressRequestData)=>{
  try {
    const response=await userRequest.post(`/address`,arg);
    return response;
  } catch (error:any) {
    console.log(error.response);
  } 
}

export const getAllUserAddresses = async (userId:string) => {
  try {
    const response = await userRequest.get(`/address/${userId}`);
    return response;
  } catch (error: any) {
    console.log(error.response);
  }
};

export const deleteUserAddress=async(addressId:string)=>{
  try {
     const response = await userRequest.delete(`/address/${addressId}`);
     return response;
  } catch (error:any) {
    console.log(error.response)
  }
}

export const editUserAddress=async (arg:UserAddressRequestData) => {
  const {_id,userId,...others}=arg;
    try {
      const response = await userRequest.put(`/address/${_id}`,others);
      return response;
    } catch (error: any) {
      console.log(error.response);
    }
}

