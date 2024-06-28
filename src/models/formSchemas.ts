import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(1, { message: "Password is required." }),
});

export const RegisterSchema = z.object({
    username: z.string().min(1, { message: "Username is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(1, { message: "Password is required." }),
    confirmPassword: z.string().min(1, { message: "Confirm password is required." }),
    photoUrl: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
});

export const PostSchema = z.object({
    content: z.string({ required_error: "Content is required." }).min(1, { message: "Content is required." }),
    photoUrls: z.array(z.string()).optional()
});

export type CreatePost = z.infer<typeof PostSchema>;
export type Login = z.infer<typeof LoginSchema>;
export type Register = z.infer<typeof RegisterSchema>;