import { Link } from "react-router-dom"
import { useDeletePostMutation, useUserPostsQuery } from "../../api/queries/postsQuery"
import { useAppSelector } from "../../app/hooks"
import PostElement from "../Posts/PostElement"

const ProfilePage = () => {
    const user_id = useAppSelector(store => store.user.id)
    const deleteMutation = useDeletePostMutation()

    const { data: userPosts, isLoading } = useUserPostsQuery(user_id)
    if (isLoading) return <div>IsLoading...</div>
    if (!userPosts) return <div>Error fetching userPosts</div>

    return (
        <div className="flex flex-col items-center">
            {userPosts.length > 0 ?
                <>
                    <h1>Your posts:</h1>
                    <div className="flex flex-row items-center justify-center">
                        {userPosts?.map(post => <PostElement post={post}>
                            <button className="border border-black p-2 bg-amber-200" onClick={() => deleteMutation.mutate(Number(post.id))}>Delete</button>
                        </PostElement>)}
                    </div>
                </>
                : <>
                    <div className="flex flex-col items-center gap-2">
                        <h1>You currently don't have posts</h1>
                        <Link to='/' className="border border-black p-2">Create my first post</Link>
                    </div>
                </>}
        </div>
    )
}

export default ProfilePage