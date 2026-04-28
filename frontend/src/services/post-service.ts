import apiClient from "./api-client";

export interface Post {
  _id: string;
  content: string;
  ownerId: string;
  image_uri?: string;
  created_at?: string;
  likes?: string[];
  comment_count?: number;
}

export interface PaginatedPostsResponse {
  page: number;
  limit: number;
  totalPosts: number;
  totalPages: number;
  posts: Post[];
}

const fetchPaginatedPosts = (page: number, sender?: string) => {
  const controller = new AbortController();
  const url = sender
    ? `/posts?page=${page}&limit=10&sender=${sender}`
    : `/posts?page=${page}&limit=10`;

  const request = apiClient.get<PaginatedPostsResponse>(url, {
    signal: controller.signal,
  });

  return { request, cancel: () => controller.abort() };
};

const fetchMyPosts = () => {
  const controller = new AbortController();

  const request = apiClient.get<Post[]>("/posts/my-posts", {
    signal: controller.signal,
  });

  return { request, cancel: () => controller.abort() };
};

const createPost = (post: { content: string; image: File | null }) => {
  const formData = new FormData();

  formData.append("content", post.content);

  if (post.image) {
    formData.append("image", post.image);
  }

  return apiClient.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updatePost = (
  postId: string,
  updatedPost: { content: string; image?: File | null }
) => {
  const formData = new FormData();

  formData.append("content", updatedPost.content);

  if (updatedPost.image) {
    formData.append("image", updatedPost.image);
  }

  return apiClient.put(`/posts/${postId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deletePost = (postId: string) => {
  return apiClient.delete(`/posts/${postId}`);
};

export default {
  fetchPaginatedPosts,
  createPost,
  fetchMyPosts,
  deletePost,
  updatePost,
};