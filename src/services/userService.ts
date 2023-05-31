import axios from 'axios';

export const fetchUserDetails = async (id: number) => {
  try {
    const response = await axios.get(`https://dummyjson.com/users/${id}`);
    return response;
  } catch (error: any) {
    console.log(error.response);
  }
};
