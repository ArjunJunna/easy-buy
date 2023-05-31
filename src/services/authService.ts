import axios from 'axios';

export const loginAuthHandler = async (arg: any) => {
  try {
    const response = await axios.post('https://dummyjson.com/auth/login', arg);
    return response;
  } catch (error:any) {
    console.log(error.message);
  }
};
