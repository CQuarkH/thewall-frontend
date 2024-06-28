import type { Post } from '@models/types';
import { atom } from 'nanostores';

export const atomPosts = atom<Post[]>([]);
export const ownAtomPosts = atom<Post[]>([]);

export function setPostsInStore(posts: Post[]) {
    atomPosts.set(posts);
}

export const getPostByIDFromStore = (id: number) => {
    return atomPosts.get().find(post => post.id === id);
}

export function setOwnPostsInStore(posts: Post[]) {
    ownAtomPosts.set(posts);
}

export function addPostToStore(post: Post) {
    ownAtomPosts.set([...ownAtomPosts.get(), post]);
    atomPosts.set([post, ...atomPosts.get()]);
}

export function deletePostInStore(id: number) {
    ownAtomPosts.set(ownAtomPosts.get().filter(post => post.id !== id));
    atomPosts.set(atomPosts.get().filter(post => post.id !== id));
}

export const updatePostInStore = (id: number, updatedPost: Post) => {
    ownAtomPosts.set(ownAtomPosts.get().map(post => post.id === id ? updatedPost : post));
    atomPosts.set(atomPosts.get().map(post => post.id === id ? updatedPost : post));
}
