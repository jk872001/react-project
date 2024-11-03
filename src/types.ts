export interface Author {
    _id: string;
    name: string;
}

export interface User {
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
