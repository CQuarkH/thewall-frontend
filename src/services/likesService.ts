const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:8080/api"

export const fetchLikedPostsByUser = async (): Promise<any> => {
    try {
        const id = JSON.parse(localStorage.getItem('user') ?? "").id;
        const url = `${API_URL}/likes/by-user/${id}`;
        const response = await fetch(url,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Error getting liked posts: " + await response.text());
        }

    } catch (error: any) {
        throw new Error("Error getting liked posts: " + error.message);
    }

}

export const modifyLikePost = async (postId: number, like: boolean): Promise<any> => {
    try {
        const url = `${API_URL}/likes/${postId}/${like ? "like" : "dislike"}`;
        const response = await fetch(url,
            {
                method: "PUT",
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
            throw new Error("Error liking post: " + await response.text());
        }

    } catch (error: any) {
        throw new Error("Error liking post: " + error.message);
    }
}