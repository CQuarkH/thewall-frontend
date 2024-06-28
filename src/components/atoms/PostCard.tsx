import React, { useState } from "react";
import Card from "@components/atoms/Card";
import PostOptions from "@components/molecules/PostOptions";
import { formatDateToLocaleReadable } from "../../utils";
import type { Post } from "../../models/types";
import Modal from "./Modal";
import PostEditOptions from "./PostEditOptions";
import PostDetails from "@components/organisms/PostDetails";

interface Props {
    post: Post;
    canEdit?: boolean;
}

const PostCard: React.FC<Props> = ({ post, canEdit = false }) => {
    const [isDetailsOpen, setDetailsOpen] = useState(false);


    return (
        <>
            <Card
                id={`post-${post.id}`}
                onClick={() => setDetailsOpen(true)}
                className="flex flex-col gap-4 border border-white/20 max-h-[70vh] cursor-pointer">
                <div className="flex w-full justify-between items-center select-none">
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
                    {
                        canEdit && (
                            <PostEditOptions post={post} />
                        )
                    }
                </div>
                <p>{post.content}</p>
                <div className="flex w-full h-[80%] gap-4">
                    {post.photoUrls.length > 0 &&
                        post.photoUrls.map((photoURL, index) => (
                            <picture key={index} className="flex-1 w-full h-full rounded-lg overflow-hidden">
                                <img
                                    onClick={() => setDetailsOpen(true)}
                                    src={photoURL}
                                    className="rounded-lg max-w-full w-full h-full 
                                object-cover hover:scale-[102%] transition-all duration-200"
                                    alt="Post media"
                                />
                            </picture>
                        ))}
                </div>
                {post && <PostOptions post={post} />}
            </Card>

            {
                !canEdit && (
                    <Modal isOpen={isDetailsOpen} onClose={() => setDetailsOpen(false)} panoramic={true}>
                        <PostDetails post={post} />
                    </Modal>
                )
            }
        </>
    );
};

export default PostCard;
