import axios from "axios";

const VITE_API_URL = process.meta.env.VITE_API_URL;

export const sendOtp = (phoneNumber) => {
  return axios.post(`${VITE_API_URL}send-otp`, { phoneNumber });
};

export const verifyOtp = (phoneNumber, otp) => {
  return axios.post(`${VITE_API_URL}verify-otp`, { phoneNumber, otp });
};

export const signup = (fullName, phoneNumber, password) => {
  return axios.post(`${VITE_API_URL}signup`, { fullName, phoneNumber, password });
};
