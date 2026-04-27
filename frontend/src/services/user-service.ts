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

export default { getUserById };