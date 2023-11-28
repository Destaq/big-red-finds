type Post = {
    owner: {
        displayName: string,
        email: string,
    };
    datetime: string;
    imageURL: string;
    found: boolean;
    description?: string; // maybe ask to include location
    location?: string;
}

// Rough draft, this might be handled by Firebase.
type User = {
    displayName: string; // Firstname Lastname
    email: string;
    photoURL: string;
}

export type { Post, User };
