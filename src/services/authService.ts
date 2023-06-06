import axios from 'axios';

export type LoginAuthHandlerArg = {
  username: string;
  password: string;
};

export const loginAuthHandler = async (arg: LoginAuthHandlerArg) => {
  try {
    const response = await axios.post('https://dummyjson.com/auth/login', arg);
    return response;
  } catch (error:any) {
    console.log(error.message);
    throw error;
  }
};
