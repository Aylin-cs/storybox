import apiClient from "./api-client";

export interface RegisterData {
  userName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
}

export const authRegister = async (registration: RegisterData) => {
  const response = await apiClient.post("/auth/register", registration);
  return response.data;
};

export const authLogin = async (login: LoginData) => {
  const response = await apiClient.post<LoginResponseData>("/auth/login", login);

  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);

  return response.data;
};

export const authLogout = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (refreshToken) {
    await apiClient.post("/auth/logout", { refreshToken });
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};