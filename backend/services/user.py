from schemas.user import LoginPayloadTypes, User
from typing import List
from fastapi import HTTPException
from gotrue.errors import AuthApiError
from config import supabase


def login(payload: LoginPayloadTypes) -> User:
    try: 
        auth_res = supabase.auth.sign_in_with_password({
            'email': payload.email,
            'password': payload.password
        })
    except: 
        raise HTTPException(401, 'Invalid credentials')
    

    if auth_res.user is None:
        raise HTTPException(401, 'Invalid credentials')
    
    user_id = auth_res.user.id

    prof_res = (supabase.table('user_profiles').select('email, role').eq('id', user_id).single().execute())

    if prof_res.data is None:
        raise HTTPException(500, 'Cannot load profile')
    
    return User(
        id = user_id,
        email = prof_res.data['email'],
        role = prof_res.data['role'],
    )

def delete_user_by_id(userId: str):
    try:
        res = supabase.table('user_profiles').delete().eq('id', userId).execute()
    except:
        raise HTTPException(401, 'Couldnt delete user from database')

def fetch_all_users() -> List[User]:
    try: 
        res = supabase.table('user_profiles').select('id, email, role').execute()
    except:
        raise HTTPException(401, 'Couldnt get users from database')
    
    data = res.data
    return data
