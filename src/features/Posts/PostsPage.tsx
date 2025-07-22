import { useQuery } from "@tanstack/react-query"
import { postsQuery } from "../../api/queries/postsQuery"
import PostElement from "./PostElement"

export type Post = {
    name: string,
    description: string,
    image: string,
    created_by: string,
}

const PostsPage = () => {

    const { data, error, isPending } = useQuery(postsQuery)

    if (isPending) return <div>Loading...</div>
    if (error) throw console.error(error)

    return (
        <div className="flex flex-row p-5 gap-2">
            {data.map((post: Post) => <PostElement post={post} />)}
        </div>
    )
}

export default PostsPage