import { AuthApi, type LoginPayload } from "../api/auth.api";

const TOKEN_KEY = "accessToken";
const USER_KEY = "user";

/**
 * Login
 */

const login = async (payload: LoginPayload) => {
  const loginResponse = await AuthApi.login(payload);

  const accessToken = loginResponse.data.accessToken;

  localStorage.setItem(TOKEN_KEY, accessToken);

  // Fetch logged in user
  const profileResponse = await AuthApi.getProfile();
  const user = profileResponse.data;

  // localStorage.setItem(USER_KEY, JSON.stringify(profileResponse.data));
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  return {
    accessToken,
    user,
  };
};

/**
 * Get Logged In User Profile
 */
const getProfile = async () => {
  const response = await AuthApi.getProfile();

  const user = response.data;

  localStorage.setItem(USER_KEY, JSON.stringify(user));

  return user;
};

/**
 * Logout
 */
const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

/**
 * Save Token
 */
const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Get Token
 */
const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Save User
 */
const saveUser = (user: unknown) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Get User
 */
const getUser = () => {
  const user = localStorage.getItem(USER_KEY);

  return user ? JSON.parse(user) : null;
};

/**
 * Is Authenticated
 */
const isAuthenticated = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

export const AuthService = {
  login,
  getProfile,
  logout,

  saveToken,
  getToken,

  saveUser,
  getUser,

  isAuthenticated,
};
