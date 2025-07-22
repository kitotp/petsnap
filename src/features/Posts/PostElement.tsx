import type { Post } from "./PostsPage"

interface PostElementProps {
    post: Post
}

const PostElement = ({ post }: PostElementProps) => {
    return (
        <div className='flex flex-col items-center  w-[300px] h-[400px] border border-black'>
            <h1 className="font-semibold text-[20px]">{post.name}</h1>
            <p>{post.description}</p>
            <img src={post.image} className="w-[50px] h-[50px]"></img>
            <p>Created by: {post.created_by}</p>
        </div>
    )
}

export default PostElement