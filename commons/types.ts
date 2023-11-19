interface Post {
    ownerName: string; // fkey on User
    datetime: Date;
    imageURL: string;
    found: boolean;
    description?: string; // maybe ask to include location
}

// Rough draft, this might be handled by Firebase.
interface User {
    netID: string;
    name: string; // Firstname Lastname
}
