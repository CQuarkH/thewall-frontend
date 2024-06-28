import PostCard from '@components/atoms/PostCard';
import { useEffect } from 'react';
import { usePosts } from 'src/hooks/usePosts';

function FavoritesSection() {
    const { favorites, handleFetchFavorites } = usePosts();

    useEffect(() => {
        handleFetchFavorites();
    }, [])

    return (
        <article className="flex flex-col gap-8 w-full max-w-4xl">
            <h1 className="text-4xl font-bold">Favorites</h1>
            <ul className="flex flex-col gap-4">
                {
                    favorites.length === 0 && (
                        <li className="text-lg text-gray-500" key={"n_posts"}>
                            You haven't liked any posts yet.
                        </li>
                    )
                }
                {favorites.map((post) => <PostCard post={post} key={post.id} />)}
            </ul>
        </article>
    )
}

export default FavoritesSection