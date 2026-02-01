import axios from "axios";
import { AUTH_BASE } from "./apiConfig";

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${AUTH_BASE}login/`, {
    email,
    password,
  });

  const { token, email: userEmail } = response.data;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify({ email: userEmail }));

  return {
    token,
    email: userEmail,
  };
};

export const register = async (email: string, password: string) => {
  await axios.post(`${AUTH_BASE}register/`, {
    email,
    password,
  });

  return login(email, password);
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getStoredUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
