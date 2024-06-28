import Modal from '@components/atoms/Modal';
import PostForm from '@components/organisms/PostForm';
import type { CreatePost } from '@models/formSchemas';
import React, { useState } from 'react';
import { usePosts } from 'src/hooks/usePosts';

interface Props {
    children: any;
}

function CreatePostButton({ children }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { handleCreatePost } = usePosts();

    const openModal = () => setIsModalOpen(true);

    const createPostHandler = async (data: CreatePost) => {
        try {
            await handleCreatePost(data);
            setIsModalOpen(false);
        } catch (error: any) {
            console.error(error.message);
        }
    }

    return (
        <>
            <div
                onClick={openModal}
                className='flex items-center select-none'>
                {children}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title='Create New Post'>
                <PostForm submitCallback={createPostHandler} />
            </Modal>
        </>
    )
}

export default CreatePostButton