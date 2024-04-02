import { axiosInstance } from "./index";

export const RegisterUser = async (value) => {
  try {
    const response = await axiosInstance.post("api/users/register", value);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
