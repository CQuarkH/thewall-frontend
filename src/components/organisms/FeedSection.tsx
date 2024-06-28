import PostCard from '@components/atoms/PostCard';
import { useEffect, useState } from 'react'
import { usePosts } from 'src/hooks/usePosts'
import DownloadPDFFeed from './DownloadPDFFeed';

function FeedSection() {
    const { posts, handleFetchAllPosts } = usePosts();

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        handleFetchAllPosts();
    }, [])

    console.log(posts);

    return (
        <article className="flex flex-col gap-8 w-full max-w-4xl">
            <h1 className="flex w-full justify-between items-center text-4xl font-bold">Today's Feed

                {isClient &&
                    <DownloadPDFFeed posts={posts} />}
            </h1>
            {posts.map((post) => <PostCard post={post} key={post.id} />)}
        </article>
    )
}

export default FeedSection