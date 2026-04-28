import apiClient from "./api-client";

export interface User {
  _id: string;
  userName: string;
  email: string;
  profile_picture_uri?: string;
}

const getUserById = (id: string) => {
  const request = apiClient.get<User>(`/users/${id}`);
  return { request };
};

const getCurrentUser = () => {
  const request = apiClient.get<User>("/users/me");
  return { request };
};

const updateMe = (data: FormData) => {
  const request = apiClient.put<User>("/users/me", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return { request };
};

export default { getUserById, getCurrentUser, updateMe };