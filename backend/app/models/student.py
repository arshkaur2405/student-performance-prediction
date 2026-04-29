from pydantic import BaseModel

class StudentInput(BaseModel):
    attendance: int
    study_hours: int
    assignment_score: int
    quiz_score: int