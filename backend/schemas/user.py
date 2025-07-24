from pydantic import BaseModel

class User(BaseModel):
    id: str
    email: str
    role: str

class LoginPayloadTypes(BaseModel):
    email: str
    password: str