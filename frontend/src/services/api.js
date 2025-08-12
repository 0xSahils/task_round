import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  signup: (userData) => api.post("/auth/signup", userData),
  login: (userData) => api.post("/auth/login", userData),
  getMe: () => api.get("/auth/me"),
};

// Notes API
export const notesAPI = {
  getNotes: (search = "") => api.get(`/notes?search=${search}`),
  createNote: (noteData) => api.post("/notes", noteData),
  updateNote: (id, noteData) => api.put(`/notes/${id}`, noteData),
  deleteNote: (id) => api.delete(`/notes/${id}`),
};

export default api;
