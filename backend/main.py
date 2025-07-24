from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import user, posts

 

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],   
    allow_credentials=True,                   
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user.router)
app.include_router(posts.router)
