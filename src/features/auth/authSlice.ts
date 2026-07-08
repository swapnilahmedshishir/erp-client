import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserRole } from "../../types/auth";

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  accessToken: localStorage.getItem("accessToken"),
  isAuthenticated: !!localStorage.getItem("accessToken"),
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    /**
     * Login
     */
    setCredentials: (
      state,
      action: PayloadAction<{
        user: AuthUser;
        accessToken: string;
      }>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(action.payload.user));

      localStorage.setItem("accessToken", action.payload.accessToken);
    },

    /**
     * Update User
     */
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;

      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    /**
     * Logout
     */
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setCredentials, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
