import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../../features/Posts/PostsPage";
import supabase from "../../supabaseClient";

// !!!типипизировать в будущем!!!!

export async function fetchPosts(): Promise<Post[]> {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
    if (error) throw new Error('Error while fetching posts')
    return data
}

export async function createPost(newPost: Post) {



    const { data, error } = await supabase
        .from('posts')
        .insert([{ name: newPost.name, description: newPost.description, image: newPost.image }])
        .single()

    if (error) throw new Error('Error while creating post')
    return data
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

