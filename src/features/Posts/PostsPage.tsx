import { useQuery } from "@tanstack/react-query"
import { postsQuery } from "../../api/queries/postsQuery"
import PostElement from "./PostElement"
import type { Post } from "../../types"
import { useState } from "react"



const PostsPage = () => {

    const [filter, setFilter] = useState<'all' | 'cat' | 'dog'>('all')
    const { data, error, isPending } = useQuery(postsQuery)


    if (isPending) return <div>Loading...</div>
    if (error) throw console.error(error)

    const filtered = filter === 'all' ? data : data?.filter((post) => post.category === filter)

    return (
        <div className="flex flex-col justify-center items-center p-5">
        <div className="flex gap-2 mb-4 mt-2 self-end">
            {(['all', 'cat', 'dog'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded ${filter === f ? 'bg-blue-600 text-white' : 'border' }`}>
                    {f === 'all' ? 'All' : f === 'cat' ? 'Cats' : 'Dogs'}
                </button>
            ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
            {filtered.map((post: Post) => <PostElement post={post} />)}
        </div>
        </div>
    )
}

export default PostsPage