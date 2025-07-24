import requests
from fastapi import HTTPException
from typing import List
from schemas.posts import Post, CreatePostPayload
from config import supabase
from dogsncats import predict_img


def create_post(payload: CreatePostPayload):
    try:
        img_bytes = requests.get(payload.image, timeout=10).content
    except Exception as e:
        raise HTTPException(400, f"Image fetch failed ${e}")

    pred = predict_img(img_bytes)

    data_to_insert = payload.dict()
    data_to_insert.update({
        "category": pred["class"],         
    })

    resp = supabase.table('posts').insert(data_to_insert).execute()

    return resp.data[0] | {"prediction": pred} 

def fetch_posts() -> List[Post]:
    try:
        res = supabase.table('posts').select('*').execute()
        data = res.data
    except:
        raise HTTPException(401, 'Couldnt fetch posts')
    
    return data

def fetch_posts_by_id(userId: str ) -> List[Post]:
    try:
        res = supabase.table('posts').select('*').eq('created_by', userId).execute()
        data = res.data
    except:
        raise HTTPException(401, 'Couldnt fetch post by id')
    
    return data