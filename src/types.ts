import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const postSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters long"),
  description: z.string().max(200, "Description within 200 characters"),
  userId: z.string(),
});

export const createPostSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters long"),
  description: z.string().max(200, "Description within 200 characters"),
});
export const signUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export interface PostData {
  id: string;
  title: string;
  description: string;
  userId: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  posts: PostData[];
}

export interface Login {
  message: string;
  success: boolean;
  user: Partial<UserData>;
  token: string;
}

export type LoginDataSchema = z.infer<typeof loginSchema>;
export type SignUpDataSchema = z.infer<typeof signUpSchema>;
export type PostDataSchema = z.infer<typeof postSchema>;
export type CreatePostDataSchema = z.infer<typeof createPostSchema>;
