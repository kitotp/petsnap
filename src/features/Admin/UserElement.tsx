import { useDeleteUserMutation } from '../../api/queries/usersQuery'
import type { User } from '../../app/slices/userSlice'

type UserElementProps = {
    user: User
}

const UserElement = ({ user }: UserElementProps) => {

    const deleteUserMutation = useDeleteUserMutation()

    return (
        <div className='w-full flex flex-row items-center px-2 h-[100px] border border-black justify-between'>
            <div className='flex flex-col items-start max-w-[170px] justify-center'>
                <p>{user.email}</p>
                <p>{user.id}</p>
            </div>
            <button className='border border-black p-2' onClick={() => deleteUserMutation.mutate(user.id)}>Delete</button>
        </div>
    )
}

export default UserElement