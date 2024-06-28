import type { Post } from '@models/types';
import { modifyLikePost } from '@services/likesService';
import React, { useEffect, useState } from 'react';
import { usePosts } from 'src/hooks/usePosts';

interface Props {
    post: Post;
}

function PostOptions({ post }: Props) {
    const [userID, setUserID] = useState<number>(0);
    const [likeCount, setLikeCount] = useState<number>(0);
    const { handleExportPostAsImage } = usePosts();

    const handleModifyLike = async () => {
        try {
            await modifyLikePost(post.id, !post.likedBy.includes(userID));
            post.likedBy.includes(userID) ? post.likedBy = post.likedBy.filter(id => id !== userID) : post.likedBy.push(userID);

            setLikeCount(prev => post.likedBy.includes(userID) ? prev + 1 : prev - 1);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') ?? "");
        setLikeCount(post.likedBy.length);
        setUserID(user.id);
    }, []);

    return (
        <div className='flex w-full items-center gap-4'>
            <button
                onClick={handleModifyLike}
                className='flex items-center gap-2'>
                {
                    post.likedBy.includes(userID) ? (
                        <svg className="w-6 h-6 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                        </svg>

                    )

                }
                <span

                    className={`transition-transform transform-gpu duration-200 ease-out scale-100 text-sm font-medium text-white/70`} >
                    {likeCount}
                </span>
            </button>
            <button className='flex items-center gap-2'>
                <svg className="w-6 h-6  text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M3.559 4.544c.355-.35.834-.544 1.33-.544H19.11c.496 0 .975.194 1.33.544.356.35.559.829.559 1.331v9.25c0 .502-.203.981-.559 1.331-.355.35-.834.544-1.33.544H15.5l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.889c-.496 0-.975-.194-1.33-.544A1.868 1.868 0 0 1 3 15.125v-9.25c0-.502.203-.981.559-1.331ZM7.556 7.5a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.556Z" clipRule="evenodd" />
                </svg>
                <span className={`transition-transform transform-gpu duration-200 ease-out scale-100 text-sm font-medium text-white/70`}>
                    {post.commentCount}
                </span>
            </button>





        </div>
    )
}

export default PostOptions