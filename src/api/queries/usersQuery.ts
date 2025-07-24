import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "../../types";

export async function fetchUsers(): Promise<User[]> {
    

    const res = await fetch('http://127.0.0.1:8000/users',{
        method: 'GET',
        headers: {'Accept': 'application/json'}
    })

    const data = await res.json() as User[]
    return data
}

async function removeUserById(userId: string) {
    const res = await fetch(`http://127.0.0.1:8000/users/${userId}`,{
        method: 'DELETE'
    })
    if (!res.ok){
        throw new Error('Error while deleting user')
    }
}


export function useAllUsersQuery() {
    return useQuery({
        queryKey: ['users', 'all'],
        queryFn: fetchUsers,
        staleTime: 5 * 60000,
        gcTime: 30 * 60000,
    })
}

export function useDeleteUserMutation() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: removeUserById,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['users', 'all'] })
        }
    })
}