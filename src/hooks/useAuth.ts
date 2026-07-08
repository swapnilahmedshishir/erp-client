import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "../store";
import { setCredentials, setUser, logout } from "../features/auth/authSlice";

import { AuthService } from "../services/auth.service";
import type { LoginPayload } from "../api/auth.api";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, accessToken, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  /**
   * Login User
   */
  const login = async (payload: LoginPayload) => {
    const result = await AuthService.login(payload);
    dispatch(
      setCredentials({
        user: result.user,
        accessToken: result.accessToken,
      }),
    );

    return result;
  };

  /**
   * Load Logged In User Profile
   */
  const getProfile = async () => {
    const user = await AuthService.getProfile();

    dispatch(setUser(user));

    return user;
  };

  /**
   * Logout User
   */
  const signOut = () => {
    AuthService.logout();

    dispatch(logout());
  };

  return {
    user,
    accessToken,
    isAuthenticated,

    login,
    getProfile,
    logout: signOut,
  };
};
