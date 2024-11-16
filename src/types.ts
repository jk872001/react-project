export interface Author {
    _id: string;
    name: string;
}

export interface User {
    id: ReactNode;
    _id: string;
    name: string;
    email: string;
    org_id: number;
    // genre: string;
    // author: Author;
    // coverImage: string;
    // file: string;
    created_at: string;
}
