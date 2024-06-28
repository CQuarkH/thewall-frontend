import PostCard from '@components/atoms/PostCard';
import { useEffect } from 'react';
import { usePosts } from 'src/hooks/usePosts';

function OwnPosts() {
    const { ownPosts, handleFetchOwnPosts } = usePosts();

    useEffect(() => {
        handleFetchOwnPosts();
    }, [])

    return (
        <article className="flex flex-col gap-8 w-full max-w-4xl">
            <h1 className="text-3xl font-bold mb-4">Your Posts</h1>
            <ul className="grid gap-4">
                {
                    ownPosts.length === 0 && (
                        <li className="text-gray-500">
                            You have not created any posts yet.
                        </li>
                    )
                }
                {ownPosts.map((post) => <PostCard post={post} key={post.id} canEdit={true} />)}
            </ul>
        </article>
    )
}

export default OwnPosts