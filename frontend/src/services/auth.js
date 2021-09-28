import axios from "axios";

const SERVER_URL = "http://localhost:3001";

export const registerNewUser = async (username, password) => {
  try {
    const user = await axios.post(`${SERVER_URL}/register`, {
      username,
      password,
    });

    return user.data;
  } catch (error) {
   
    throw new Error(error.response.data.msg);
  }
};

export const loginNewUser = async (username, password) => {
  try {
    const user = await axios.post(`${SERVER_URL}/login`, {
      username,
      password,
    });
    return user.data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
};

export const googleAccess = async (token) => {
  try {
    const user = await axios.post(`${SERVER_URL}/google/auth`, {
      token     
    });

    return user.data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
};
