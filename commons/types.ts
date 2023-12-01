// Rough draft, this might be handled by Firebase.
type User = {
    displayName: string; // Firstname Lastname
    email: string;
    photoURL: string;
}

type Post = {
    id: string;
    owner: User;
    datetime: string;
    imageURL: string;
    found: boolean;
    description?: string; // maybe ask to include location
    location?: string;
    itemUpdated:boolean;
    handleStateChange:any;
    allowManagement:boolean;
}

export type { Post, User };
