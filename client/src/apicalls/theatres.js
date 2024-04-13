import { axiosInstance } from "./index";

export const addTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/add-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const updateTheatre = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/theatres/update-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const deleteTheatre = async (payload) => {
  try {
    const response = await axiosInstance.delete(
      "/api/theatres/delete-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// Get all theatres for the Admin route
export const getAllTheatresForAdmin = async () => {
  try{
      const response = await axiosInstance.get('/api/theatres/get-all-theatres');
      return response.data;
  }catch(err){
      return err.response;
  }
}

// Get theatres of a specific owner
export const getAllTheatres = async (payload) => {
  try{
      const response = await axiosInstance.post('/api/theatres/get-all-theatres-by-owner', payload);
      return response.data;
  }catch(err){
      return err.response;
  }
}


