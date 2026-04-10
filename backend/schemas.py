from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: Optional[str] = "Medium"
    completed: Optional[bool] = False
    completionNote: Optional[str] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None
    completed: Optional[bool] = None
    completionNote: Optional[str] = None

class Task(TaskBase):
    id: int
    createdAt: datetime

    class Config:
        from_attributes = True
