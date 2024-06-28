import type { Comment } from '@models/types'
import React from 'react'
import { formatDateToLocaleReadable } from 'src/utils';

interface CommentTileProps {
    comment: Comment,
    onDeleteAction: (commentId: number) => Promise<void>
}

function CommentTile({ comment, onDeleteAction }: CommentTileProps) {

    const canEdit = JSON.parse(localStorage.getItem('user') ?? "").id === comment.userId;

    const handleDeleteComment = async () => {
        try {
            await onDeleteAction(comment.id);
        } catch (error: any) {
            console.error(error.message);
        }
    }

    return (
        <li key={comment.id} className='flex gap-3 items-center justify-between hover:bg-white/10 rounded-md px-2 py-2 transition-all duration-300 group'>
            <div className='flex w-full gap-3 items-center'>
                <img
                    src={comment.userPhoto}
                    className="w-8 h-8 rounded-full object-cover"
                    alt={`${comment.username}'s profile`}
                />
                <div className='flex flex-col gap-1'>
                    <span className='flex gap-2 items-center text-xs font-light text-white/50'>
                        <p>{comment.username}</p> -
                        <p>{formatDateToLocaleReadable(comment.createdAt)}</p>
                    </span>
                    <p className='text-sm text-white/90'>{comment.content}</p>
                </div>
            </div>

            {

                <button className={`text-xs text-white/60 hover:text-white/90 opacity-0 transition-all duration-200
                ${canEdit ? 'group-hover:opacity-100' : ''} `}>
                    <svg
                        onClick={handleDeleteComment}
                        className="w-5 h-5 text-white hover:text-red-500 transition-all duration-200 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd" />
                    </svg>
                </button>

            }



        </li>
    )
}

export default CommentTile