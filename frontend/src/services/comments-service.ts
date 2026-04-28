import apiClient from "./api-client";

export interface Comment {
  _id: string;
  postId: string;
  ownerId: string;
  content: string;
  created_at?: string;
}

const fetchCommentsByPostId = (postId: string) => {
  const controller = new AbortController();

  const request = apiClient.get<Comment[]>(`/comments?postId=${postId}`, {
    signal: controller.signal,
  });

  return { request, cancel: () => controller.abort() };
};

const addComment = (postId: string, content: string) => {
  const controller = new AbortController();

  const request = apiClient.post<Comment>(
    "/comments",
    { postId, content },
    { signal: controller.signal }
  );

  return { request, cancel: () => controller.abort() };
};

export default { fetchCommentsByPostId, addComment };