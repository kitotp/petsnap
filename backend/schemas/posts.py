from typing import Optional
from pydantic import BaseModel

class Post(BaseModel):
    id: int
    name: str
    description: str
    image: str
    created_by: str
    category: Optional[str] = None

class CreatePostPayload(BaseModel):
    name: str
    description: str
    image: str
    created_by: str