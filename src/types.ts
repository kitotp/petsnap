export type Post = {
    id: number,
    name: string,
    description: string,
    image: string,
    created_by: string,
    category: string,
}

export type User = {
    id: string,
    email: string,
    role: string
}