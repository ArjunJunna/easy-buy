import { publicRequest } from '../requestMethods';
import toast from 'react-hot-toast';

export type LoginAuthHandlerArg = {
  username: string;
  password: string;
};

export type SignupAuthHandlerArg = {
  username: string;
  email:string;
  password: string;
};

export const loginAuthHandler = async (arg: LoginAuthHandlerArg) => {
  try {
    const response = await publicRequest.post('/auth/login', arg);
   
    return response;
  } catch (error:any) {

     toast.error(`${error.response.data.msg}`, {
       style: { background: '#fab1a0', color: '#FFFFFF' },
     });
    throw error;
  }
};

export const signupAuthHandler=async(arg:SignupAuthHandlerArg)=>{
  try {
     const response = await publicRequest.post('/auth/register', arg);
     return response;
  } catch (error:any) {
     console.log(error.message);
     throw error;
  }
}