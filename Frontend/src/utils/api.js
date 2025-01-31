import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

export const sendOtp = (phoneNumber) => {
  return axios.post(`${API_URL}send-otp`, { phoneNumber });
};

export const verifyOtp = (phoneNumber, otp) => {
  return axios.post(`${API_URL}verify-otp`, { phoneNumber, otp });
};

export const signup = (fullName, phoneNumber, password) => {
  return axios.post(`${API_URL}signup`, { fullName, phoneNumber, password });
};
