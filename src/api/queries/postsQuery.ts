import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../../types";
import supabase from "../../supabaseClient";
import { v4 as uuidv4 } from 'uuid'


export async function fetchPosts(): Promise<Post[]> {
    
    const res = await fetch('http://127.0.0.1:8000/posts', {
        method: 'GET',
        headers: {'Accept': 'application/json'}
    })

    if(!res.ok){
        throw new Error('Cant fetch all posts')
    }

    const data = await res.json() as Post[]
    return data
}

export async function fetchPostsById(userId: string): Promise<Post[]> {

    const res = await fetch(`http://127.0.0.1:8000/posts/by-user?userId=${userId}`)

    if(!res.ok){
        throw new Error('Cant fetch all posts by user Id')
    }

    const data = await res.json() as Post[]
    return data
}

export async function deletePostById(postId: number) {
    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)

    if (error) throw error
}

async function uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop()
    const fileName = `${uuidv4()}.${fileExt}`
    const filePath = `posts/${fileName}`

    // first, uploading the image
    const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('posts')
        .upload(filePath, file, { cacheControl: '3600', upsert: false })

    if (!uploadData || uploadError) {
        throw new Error('Error while uploading image')
    }

    // now getting the public link
    const { data: publicData } = supabase
        .storage
        .from('posts')
        .getPublicUrl(filePath)

    return publicData.publicUrl
}

export async function createPost(newPost: Omit<Post, 'image' | 'id' | 'category'> & { imageFile: File }) {

    const imageUrl = await uploadImage(newPost.imageFile)

    const res = await fetch('http://127.0.0.1:8000/posts',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: newPost.name, description: newPost.description, image: imageUrl, created_by: newPost.created_by})
    })

    if(!res.ok){
        throw new Error('Couldnt create new post')
    }

    return res.json()
}

export function useDeletePostMutation() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: deletePostById,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['posts'] })
        }
    })
}

export function useUserPostsQuery(userId: string) {
    return useQuery({
        queryKey: ['posts', 'byUser', userId],
        queryFn: () => fetchPostsById(userId),
        staleTime: 5 * 60000,
        gcTime: 30 * 60000
    })
}

export function useCreatePostMutation() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['posts'] })
            qc.invalidateQueries({ queryKey: ['posts', 'byUser'] })
        }
    })
}

export const postsQuery = queryOptions({
    queryKey: ['posts'],
    queryFn: fetchPosts
})

