import type { CreatePost } from "@models/formSchemas";
import type { Post } from "@models/types";
import { useStore } from "@nanostores/react";
import { fetchLikedPostsByUser } from "@services/likesService";
import { createPost, deletePost, fetchAllPosts, fetchPostsByUsername, updatePost } from "@services/postsService";
import html2canvas from "html2canvas";
import { useState } from "react";
import { addPostToStore, atomPosts, deletePostInStore, ownAtomPosts, setOwnPostsInStore, setPostsInStore, updatePostInStore } from "src/stores/postStore";


export const usePosts = () => {
    const posts = useStore(atomPosts);
    const ownPosts = useStore(ownAtomPosts);
    const [favorites, setFavorites] = useState<Post[]>([]);

    const handleCreatePost = async (data: CreatePost) => {
        try {
            const createdPost = await createPost(data);
            addPostToStore(createdPost);
        } catch (error: any) {
            console.error(error.message);
        }
    }

    const handleDeletePost = async (id: number) => {
        try {
            await deletePost(id);
            deletePostInStore(id);
        } catch (error: any) {
            console.error(error.message)
        }
    }

    const handleUpdatePost = async (id: number, data: CreatePost) => {
        try {
            const updatedPost = await updatePost(id, data);
            updatePostInStore(id, updatedPost);
        } catch (error: any) {
            console.error(error.message);
        }

    }

    const handleFetchAllPosts = async () => {
        try {
            const response = await fetchAllPosts();
            setPostsInStore(response);

        } catch (error: any) {
            console.error(error.message);
        }
    }

    const handleFetchFavorites = async () => {
        try {
            const response = await fetchLikedPostsByUser();
            setFavorites(response ?? []);
        } catch (error: any) {
            console.error(error.message);
        }
    }

    const handleFetchOwnPosts = async () => {
        try {
            const username = JSON.parse(localStorage.getItem('user') ?? "").username;
            const response = await fetchPostsByUsername(username);
            setOwnPostsInStore(response ?? []);
        } catch (error: any) {
            console.error(error.message);
        }

    }

    const handleExportPostAsImage = async (post: Post) => {
        const element = document.getElementById(`post-${post.id}`)!,
            canvas = await html2canvas(element),
            data = canvas.toDataURL('image/jpg'),
            link = document.createElement('a');

        link.href = data;
        link.download = `TheWall-${post.createdAt}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return { posts, favorites, ownPosts, handleCreatePost, handleDeletePost, handleUpdatePost, handleExportPostAsImage, handleFetchAllPosts, handleFetchFavorites, handleFetchOwnPosts };
}