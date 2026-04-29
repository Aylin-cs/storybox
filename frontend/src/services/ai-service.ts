import apiClient from "./api-client";

export const generateCaption = async (content: string) => {
  const response = await apiClient.post("/ai/caption", { content });
  return response.data;
};