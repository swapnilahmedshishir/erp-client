import axiosInstance from "./axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export const AuthApi = {
  /**
   * Login
   * POST /api/v1/auth/login
   */
  login: async (payload: LoginPayload) => {
    const response = await axiosInstance.post("/auth/login", payload);
    return response.data;
  },

  /**
   * Get Logged In User Profile
   * GET /api/v1/auth/profile
   */
  getProfile: async () => {
    const response = await axiosInstance.get("/auth/profile");
    return response.data;
  },
};
