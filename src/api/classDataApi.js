import axios from "axios"

export const getClassData = async () => {
    const response = await axios.get(import.meta.env.VITE_API_BASE)
    return response.data
}

export const createClassData = async (data) => {
    const response = await axios.post(import.meta.env.VITE_API_BASE, data)
    return response.data
}

export const updateClassDataById = async (id, payload) => {
  const response = await axios.put(`${import.meta.env.VITE_API_BASE}/${id}`, payload);
  return response.data;
};

export const deleteClassDataById = async (id) => {
  const response = await axios.delete(`${import.meta.env.VITE_API_BASE}/${id}`);
  return response.data;
};