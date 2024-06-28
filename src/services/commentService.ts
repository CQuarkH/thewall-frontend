import type { Comment } from "@models/types";

const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:8080/api"

export const fetchPostComments = async (postId: number): Promise<Comment[]> => {
    try {
        const response = await fetch(`${API_URL}/comments/${postId}`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Error fetching post comments: " + response.statusText);
        }
    } catch (error: any) {
        throw new Error("Error fetching post comments: " + error.message);
    }

}

export const createComment = async (postId: number, content: string): Promise<any> => {
    try {
        const userId = JSON.parse(localStorage.getItem('user') ?? "").id;
        const response = await fetch(`${API_URL}/comments/${postId}`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content, userId })
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log(response.text());
            throw new Error("Error creating comment: " + response.statusText);
        }
    } catch (error: any) {
        throw new Error("Error creating comment: " + error.message);
    }
}

export const deleteComment = async (commentId: number): Promise<any> => {
    try {
        const response = await fetch(`${API_URL}/comments/${commentId}`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            const data = await response.text();
            return data;
        } else {
            throw new Error("Error deleting comment: " + response.statusText);
        }

    } catch (error: any) {
        throw new Error("Error deleting comment: " + error.message);
    }
}