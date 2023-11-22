type Post = {
    owner: User;
    datetime: Date;
    imageURL: string;
    found: boolean;
    description?: string; // maybe ask to include location
}

// Rough draft, this might be handled by Firebase.
type User = {
    displayName: string; // Firstname Lastname
    email: string;
    photoURL: string;
}

export type { Post, User };