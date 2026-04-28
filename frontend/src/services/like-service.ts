import apiClient from "./api-client";

export interface LikeResponse {
  likesCount: number;
  liked: boolean;
}

const toggleLike = (postId: string) => {
  const controller = new AbortController();

  const request = apiClient.post<LikeResponse>(
    `/posts/${postId}/like`,
    {},
    { signal: controller.signal }
  );

  return { request, cancel: () => controller.abort() };
};

export default { toggleLike };