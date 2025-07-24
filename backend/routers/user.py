from schemas.user import User, LoginPayloadTypes
from services.user import login , delete_user_by_id, fetch_all_users
from fastapi import APIRouter, HTTPException
from typing import List

router = APIRouter(
    prefix="/users",                                
    tags=["users"],                                
)

@router.post('/login', response_model = User)
def login_user(payload: LoginPayloadTypes):
    return login(payload)

@router.delete('/{user_id}')
def delete(user_id: str):
    return delete_user_by_id(user_id)

@router.get('', response_model= List[User])
def users_fetch_all_users():
    return fetch_all_users()