import { useDeletePostMutation } from '../../api/queries/postsQuery'
import type { Post } from '../../types'

type PostElementProps = {
    post: Post
}

const PostElement = ({ post }: PostElementProps) => {

    const deleteMutation = useDeletePostMutation()

    return (
        <div className='w-full flex flex-row items-center justify-between border border-black px-3 h-[100px]'>
            <div className='flex flex-col items-start'>
                <p>{post.name}</p>
                <img src={post.image} className='w-[50px] h-[50px]'></img>
                <p>{post.created_by}</p>
            </div>
            <button className='border border-black p-2' onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
        </div>
    )
}

export default PostElement