import type { Post } from '@models/types';
import React, { useState } from 'react';
import Modal from './Modal';
import PostForm from '@components/organisms/PostForm';
import type { CreatePost } from '@models/formSchemas';
import { usePosts } from 'src/hooks/usePosts';

interface Props {
    post: Post;
}

function PostEditOptions({ post }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { handleDeletePost, handleUpdatePost } = usePosts();

    const updatePostHandler = async (newPost: CreatePost) => {
        try {
            await handleUpdatePost(post.id, newPost);
            setIsModalOpen(false);
        } catch (error: any) {
            console.error(error.message);
        }
    }

    return (
        <>
            <span className='flex gap-3 items-center'>
                <svg
                    onClick={() => handleDeletePost(post.id)}
                    className="w-6 h-6 text-white hover:text-red-500 transition-all duration-200 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd" />
                </svg>
                <svg
                    onClick={() => setIsModalOpen(true)}
                    className="w-6 h-6 text-white hover:text-white/60 transition-all duration-200 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
                </svg>
            </span>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Update Post">
                {
                    isModalOpen && (
                        <PostForm
                            submitCallback={updatePostHandler}
                            post={post}
                        />
                    )
                }
            </Modal>

        </>
    )
}

export default PostEditOptions