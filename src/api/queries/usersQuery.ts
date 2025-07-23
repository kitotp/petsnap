import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import supabase from "../../supabaseClient";
import type { User } from "../../app/slices/userSlice";


export async function fetchUsers(): Promise<User[]> {
    const { data, error } = await supabase
        .from('user_profiles')
        .select('id, email, role')

    if (error) throw error
    return data
}

async function removeUserById(userId: string) {
    const { error } = await supabase
        .from('user_profiles')
        .delete()
        .eq('id', userId)

    if (error) throw error
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