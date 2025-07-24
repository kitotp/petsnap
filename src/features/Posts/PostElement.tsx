import type { PropsWithChildren } from "react"
import type { Post } from "../../types"

// interface PostElementProps {
//     post: Post
// }

type PostElementProps = PropsWithChildren<{ post: Post }>

const PostElement = ({ post, children }: PostElementProps) => {
    return (
        <div className='flex flex-col items-center justify-between  w-[300px] h-[400px] border border-black'>
            <h1 className="font-semibold text-[20px]">{post.name}</h1>
            <img src={post.image} className="w-[150px] h-[150px]"></img>
            <p>{post.description}</p>
            <p>Created by: {post.created_by}</p>
            <div className="flex flex-row items-center">
                {children}
            </div>
            <p>Category: {post.category}</p>
        </div>
    )
}

export default PostElement