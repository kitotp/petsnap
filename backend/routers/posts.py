from services.posts import fetch_posts, fetch_posts_by_id, create_post
from fastapi import APIRouter, HTTPException
from typing import List
from schemas.posts import Post, CreatePostPayload


router = APIRouter(
    prefix="/posts",                                
    tags=["posts"],                                
)

@router.post('', response_model=Post)
def post_post(payload: CreatePostPayload):
    return create_post(payload)

@router.get('', response_model=List[Post])
def get_posts():
    return fetch_posts()

@router.get('/by-user', response_model = List[Post])
def get_posts_by_id(userId: str):
    return fetch_posts_by_id(userId)