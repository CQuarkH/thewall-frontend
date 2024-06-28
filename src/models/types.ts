

export interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    userID: number;
    photoUrls: string[];
    likedBy: number[];
    user: UserProfile;
    commentCount: number;
}

export interface Comment {
    id: number;
    content: string;
    createdAt: Date;
    userId: number;
    postId: number;
    username: string;
    userPhoto: string;
}



export interface User {
    ID: number;
    username: string;
    email: string;
    photoUrl: string;
}

export interface UserProfile {
    username: string;
    photoUrl: string;
}