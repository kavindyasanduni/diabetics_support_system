import axios from "axios";

//calling to backend
const Link = "http://192.168.8.100:8082";
const Port = "8082";
const BASE_URL = `${Link}/api/`//link plus port

console.log(BASE_URL);

// Function to set the authorization token in the request headers
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// GET request
export const GET = (url, params = {}, token = null) => {
  setAuthToken(token);
  console.log(`${BASE_URL}${url}`);

  return axios.get(`${BASE_URL}${url}`, { params });
};

// POST request - creating data
export const POST = (url, data = {}, token = null) => {
  setAuthToken(token);
  return axios.post(`${BASE_URL}${url}`, data);
};

// PUT request - update data
export const PUT = (url, data = {}, token = null) => {
  setAuthToken(token);
  return axios.put(`${BASE_URL}${url}`, data);
};

// DELETE request
export const DELETE = (url, token = null) => {
  setAuthToken(token);
  return axios.delete(`${BASE_URL}${url}`);
};
