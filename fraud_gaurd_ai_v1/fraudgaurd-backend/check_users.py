from app.database import SessionLocal
from app.models.db_models import User

db = SessionLocal()

users = db.query(User).all()

print("\nRegistered Users:")
print("-----------------------------")

if not users:
    print("No users found.")

for user in users:
    print(f"ID: {user.id}")
    print(f"Name: {user.name}")
    print(f"Email: {user.email}")
    print("-----------------------------")

db.close()