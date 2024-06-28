import type { Comment } from "@models/types";
import { createComment, deleteComment, fetchPostComments } from "@services/commentService";
import { useEffect, useState } from "react";
import { getPostByIDFromStore, updatePostInStore } from "src/stores/postStore";

export const useComments = (postID: number) => {
    const [comments, setComments] = useState<Comment[]>([]);

    const handleFetchPostComments = async () => {
        try {
            const response = await fetchPostComments(postID);
            setComments(response);
        } catch (error: any) {
            console.error(error.message);
        }
    }

    const handlePostComment = async (content: string) => {
        try {
            await createComment(postID, content);
            handleFetchPostComments();

            // update comment count
            const post = getPostByIDFromStore(postID)!;
            updatePostInStore(postID, { ...post, commentCount: post.commentCount + 1 })
        } catch (error: any) {
            console.error(error.message);
        }
    }

    const handleDeleteComment = async (commentId: number) => {
        try {
            await deleteComment(commentId);
            handleFetchPostComments();

            // update comment count
            const post = getPostByIDFromStore(postID)!;
            updatePostInStore(postID, { ...post, commentCount: post.commentCount - 1 })
        } catch (error: any) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleFetchPostComments();
    }, [])


    return {
        comments,
        handlePostComment,
        handleDeleteComment
    }
}