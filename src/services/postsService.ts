import type { CreatePost } from "@models/formSchemas";
import type { Post } from "@models/types";

const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:8080/api"

export const fetchAllPosts = async (): Promise<Post[]> => {
    try {
        const response = await fetch(`${API_URL}/posts`,
            {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        const data = await response.json() as Post[];
        return data;
    } catch (error: any) {
        throw new Error("Error fetching all posts: " + error.message);
    }
}

export const fetchPostsByUsername = async (username: string): Promise<Post[]> => {
    try {
        const response = await fetch(`${API_URL}/posts/user/${username}`,
            {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        if (!response.ok) {
            throw new Error("Error fetching posts by username: " + await response.text());
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        throw new Error("Error fetching posts by user ID: " + error.message);
    }

}

export const fetchTrendingPosts = async (): Promise<Post[]> => {
    try {
        const response = await fetch(`${API_URL}/posts`,
            {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        const data = await response.json() as Post[];
        return data.sort((a, b) => b.likedBy.length - a.likedBy.length);
    } catch (error: any) {
        throw new Error("Error fetching trending posts: " + error.message);
    }

}

export const createPost = async (post: CreatePost): Promise<any> => {
    try {
        const userId = JSON.parse(localStorage.getItem('user') ?? "").id;
        const response = await fetch(`${API_URL}/posts`,
            {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...post, userId })
            }
        );

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Error creating post: " + await response.text());
        }
    } catch (error: any) {
        throw new Error("Error creating post: " + error.message);
    }
}

export const updatePost = async (postID: number, updatePost: CreatePost): Promise<any> => {
    try {
        const response = await fetch(`${API_URL}/posts/${postID}`,
            {
                method: "PUT",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatePost)
            }
        );

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Error updating post: " + await response.text());
        }

    } catch (error: any) {
        throw new Error("Error updating post: " + error.message);
    }

}

export const deletePost = async (postId: number): Promise<any> => {
    try {
        const response = await fetch(`${API_URL}/posts/${postId}`,
            {
                method: "DELETE",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (response.ok) {
            const data = await response.text();
            return data;
        } else {
            throw new Error("Error deleting post: " + await response.text());
        }

    } catch (error: any) {
        throw new Error("Error deleting post: " + error.message);
    }
}