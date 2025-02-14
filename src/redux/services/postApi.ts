import { PostData } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    // GET /posts?id=<userId>
    getPosts: builder.query<PostData[], string>({
      query: (userId) => `/posts?id=${userId}`,
      providesTags: ["Posts"],
    }),

    // GET /posts/:id
    getPost: builder.query<PostData, string>({
      query: (id) => `/posts/${id}`,
      providesTags: ["Posts"],
    }),

    // POST /posts

    createPost: builder.mutation<{ message: string }, Partial<PostData>>({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: data,
      }),
      // Invalidate the list to refetch posts after creation
      invalidatesTags: ["Posts"],
    }),

    // PUT /posts/:id

    updatePost: builder.mutation<{ message: string }, Partial<PostData>>({
      query: ({ id, ...data }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),

    // DELETE /posts/:id

    deletePost: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      // Invalidate the list tag so that the getPosts query is refetched
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
