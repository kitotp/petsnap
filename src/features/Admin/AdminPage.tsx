import { useAllUsersQuery } from "../../api/queries/usersQuery"
import UserElement from "./UserElement"
import { postsQuery } from "../../api/queries/postsQuery"
import { useQuery } from "@tanstack/react-query"
import PostElement from "./PostElement"

const AdminPage = () => {

    const { data: users, isLoading } = useAllUsersQuery()
    const { data: posts, isLoading: postsLoading } = useQuery(postsQuery)

    if (isLoading) return <div>IsLoading...</div>
    if (postsLoading) return <div>Posts are loading...</div>
    console.log(posts)

    return (
        <div className="flex flex-row items-center justify-center gap-10 py-10">
            <div className="flex flex-col items-center w-[500px] overflow-auto h-[600px] border border-black px-3 gap-2">
                <h1 className="text-[30px] font-bold">Users</h1>
                <div className="flex-1 w-full flex-col overflow-y-auto space-y-2">
                    {users?.map(user => <UserElement user={user} />)}
                </div>
            </div>
            <div className="flex items-center flex-col w-[500px] h-[600px] px-3 border border-black">
                <h1 className="text-[30px] font-bold">Posts</h1>
                <div className="flex-1 w-full flex-col overflow-y-auto space-y-2">
                    {posts?.map(post => <PostElement post={post} />)}
                </div>
            </div>
        </div >
    )
}

export default AdminPage