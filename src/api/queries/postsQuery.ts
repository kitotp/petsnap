import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../../types";
import supabase from "../../supabaseClient";
import { v4 as uuidv4 } from 'uuid'

// !!!типипизировать в будущем!!!!


export async function fetchPosts(): Promise<Post[]> {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
    if (error) throw new Error('Error while fetching posts')
    return data
}

export async function fetchPostsById(userId: string): Promise<Post[]> {


    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('created_by', userId)

    if (error) throw error

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

export async function createPost(newPost: Omit<Post, 'image' | 'id'> & { imageFile: File }) {

    const imageUrl = await uploadImage(newPost.imageFile)

    const { data, error } = await supabase
        .from('posts')
        .insert([{ name: newPost.name, description: newPost.description, image: imageUrl, created_by: newPost.created_by }])
        .single()

    if (error) throw new Error('Error while creating post')
    return data
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

