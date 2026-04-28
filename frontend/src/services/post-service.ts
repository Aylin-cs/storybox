import apiClient from "./api-client";

export interface Post {
  _id: string;
  content: string;
  ownerId: string;
  image_uri?: string;
  created_at?: string;
  likes?: string[];
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

export default { fetchPaginatedPosts, createPost, fetchMyPosts };