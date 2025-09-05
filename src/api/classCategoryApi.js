import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ change if needed
  headers: {
    "Content-Type": "application/json",
  },
})

// ✅ Generic helper methods
export const getData = (url) => api.get(url).then((res) => res.data)
export const postData = (url, body) => api.post(url, body).then((res) => res.data)
export const deleteData = (url) => api.delete(url).then((res) => res.data)

export default api
