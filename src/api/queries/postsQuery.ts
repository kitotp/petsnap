import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../../features/Posts/PostsPage";

export async function fetchPosts() {
    const res = await fetch('http://localhost:3001/posts')
    if (!res.ok) throw new Error('Error while fetching posts')
    return res.json() as Promise<Post[]>
}

export async function createPost(newPost: Post) {
    const res = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
    })
    if (!res.ok) throw new Error('Error while creating new post.')
    return res.json() as Promise<Post>
}

export function useCreatePostMutation() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['posts'] })
        }
    })
}

export const postsQuery = queryOptions({
    queryKey: ['products'],
    queryFn: fetchPosts
})

