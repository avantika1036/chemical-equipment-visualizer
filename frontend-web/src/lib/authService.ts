import axios from "axios";

const API_BASE = "https://chemical-equipment-visualizer-xtbs.onrender.com/api/auth/";

// --------------------
// LOGIN
// --------------------
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE}login/`, {
    email,
    password,
  });

  // backend returns:
  // { token: "...", email: "test@example.com" }

  const { token, email: userEmail } = response.data;

  // store token
  localStorage.setItem("token", token);
  localStorage.setItem(
    "user",
    JSON.stringify({ email: userEmail })
  );

  return {
    token,
    email: userEmail,
  };
};

// --------------------
// REGISTER
// --------------------
export const register = async (
  email: string,
  password: string
) => {
  await axios.post(`${API_BASE}register/`, {
    email,
    password,
  });

  // auto-login after signup
  return login(email, password);
};

// --------------------
// LOGOUT
// --------------------
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// --------------------
// GET SAVED USER
// --------------------
export const getStoredUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
