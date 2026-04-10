from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    priority = Column(String, default="Medium") # Low, Medium, High
    completed = Column(Boolean, default=False)
    completionNote = Column(String, nullable=True)
    createdAt = Column(DateTime(timezone=True), server_default=func.now())
