import PhotoCarroussel from '@components/molecules/PhotoCarroussel';
import PostComments from '@components/molecules/PostComments';
import type { Comment, Post } from '@models/types';
import { fetchPostComments } from '@services/commentService';
import React, { useState } from 'react';
import { formatDateToLocaleReadable } from 'src/utils';

interface Props {
    post: Post;
}

function PostDetails({ post }: Props) {

    return (
        <section className='flex w-[65vw] h-[60vh]'>
            <PhotoCarroussel photoUrls={post.photoUrls} />
            <div className='flex flex-col w-full h-full gap-5 p-6 border-l border-white/20'>
                <div className="flex w-full items-center gap-3 ">
                    {post.user.photoUrl ? (
                        <img
                            src={post.user.photoUrl}
                            className="w-8 h-8 rounded-full object-cover"
                            alt={`${post.user.username}'s profile`}
                        />
                    ) : (
                        <div className="w-8 h-8 bg-gray-300 rounded-full" />
                    )}
                    <p className="text-sm font-medium text-white/70">{post.user.username}</p>
                    -
                    <p className="text-sm font-medium text-white/60">
                        {formatDateToLocaleReadable(post.createdAt)}
                    </p>
                </div>
                <p>{post.content}</p>
                <PostComments postID={post.id} />
            </div>
        </section>
    )
}

export default PostDetails