from sqlalchemy.orm import Session
from models import User
from schemas import UserCreate


def create_user(db: Session, user: UserCreate):

    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        return {"message": "Email already registered"}

    # Create new user
    new_user = User(
        name=user.name,
        email=user.email,
        password=user.password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Account created successfully",
        "user": new_user
    }
def login_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()

    if user is None:
        return {"message": "User not found"}

    if user.password != password:
        return {"message": "Invalid password"}

    return {
        "message": "Login successful",
        "user": user
    }