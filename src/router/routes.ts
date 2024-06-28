interface Route {
    name: string;
    path: string;
    icon: string;
    class?: string;
}

export const routes: Route[] = [
    {
        name: 'Feed',
        path: '/home',
        icon: 'jam:home'
    },
    {
        name: 'Posts',
        path: '/posts',
        icon: 'jam:ghost-org'
    },
    {
        name: 'Favorites',
        path: '/favorites',
        icon: 'jam:heart'
    }
]