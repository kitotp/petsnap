import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../../features/Posts/PostsPage";
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

export async function createPost(newPost: Omit<Post, 'image'> & { imageFile: File }) {

    const imageUrl = await uploadImage(newPost.imageFile)

    const { data, error } = await supabase
        .from('posts')
        .insert([{ name: newPost.name, description: newPost.description, image: imageUrl, created_by: newPost.created_by }])
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
    queryKey: ['posts'],
    queryFn: fetchPosts
})

