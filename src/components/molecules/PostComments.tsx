import CommentTile from '@components/atoms/CommentTile';
import { useState } from 'react';
import { useComments } from 'src/hooks/useComments';

interface Props {
    postID: number;
}

function PostComments({ postID }: Props) {
    const [comment, setComment] = useState<string>();
    const { comments, handlePostComment, handleDeleteComment } = useComments(postID);
    const userPhotoUrl = JSON.parse(localStorage.getItem('user') ?? "").photoUrl;

    const postCommentHandler = async () => {
        try {
            if (comment) {
                await handlePostComment(comment);
            }
            setComment('');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className='border-t border-white/20'></div>
            <div className='flex items-center gap-3'>
                <img src={userPhotoUrl} className='rounded-full w-9 h-9 object-cover' />
                <input
                    className="resize-none bg-transparent outline-none w-full"
                    placeholder='Write a comment...'
                    value={comment}
                    onChange={(e) => setComment(e.currentTarget.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            postCommentHandler();
                        }
                    }}
                />
                <button
                    onClick={postCommentHandler}>
                    <svg
                        className={`w-6 h-6 mr-2 text-white rotate-90 ${comment ? 'opacity-100' : 'opacity-30'} transition-all duration-300`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2a1 1 0 0 1 .932.638l7 18a1 1 0 0 1-1.326 1.281L13 19.517V13a1 1 0 1 0-2 0v6.517l-5.606 2.402a1 1 0 0 1-1.326-1.281l7-18A1 1 0 0 1 12 2Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div className='border-t border-white/20'></div>
            <article className='flex flex-col gap-3'>
                <h3>Comments</h3>
                <ul className='flex flex-col gap-4'>
                    {
                        comments.length > 0 ?
                            (
                                comments.map(comment => (
                                    <CommentTile
                                        onDeleteAction={() => handleDeleteComment(comment.id)}
                                        key={comment.id}
                                        comment={comment} />
                                ))
                            ) :
                            (
                                <p className='text-white/60'>No comments yet</p>
                            )
                    }
                </ul>

            </article>
        </>
    )
}

export default PostComments