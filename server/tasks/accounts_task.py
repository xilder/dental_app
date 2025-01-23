from api.app import celery
from api.app import mail
from flask_mail import Message
from models.user import User
from models.engine.auth import Auth


AUTH = Auth()

@celery.task
def send_verification_message(user: User):
    """sends a verification email after registering the account"""
    # implement your email sending logic here
    print(f"Sending verification email to {user.email}")
    try:
        msg = Message('[Epitome] Account Confirmation Email', sender='[Epitome]', recipients=[str(user.email)])
        msg.body = f'Please click on the link below for account confirmation:\n http://localhost:5000/api/v1/auth/confirmation/{user.token}.\nLink expires in an hour. Toodles!'
        mail.send(msg)
    except Exception as e:
        AUTH.delete_user(str(user.id))
        print('Authentication failed', str(e))