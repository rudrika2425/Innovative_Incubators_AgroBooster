from twilio.rest import Client
import random
import os

class TwilioService:
    @staticmethod
    def send_otp(phone_number):
        otp = str(random.randint(100000, 999999))

        client = Client(os.getenv("TWILIO_ACCOUNT_SID"), os.getenv("TWILIO_AUTH_TOKEN"))
        message = client.messages.create(
            body=f"Your OTP code is {otp}",
            from_=os.getenv("TWILIO_PHONE_NUMBER"),
            to=phone_number
        )

        return {"message": "OTP sent successfully", "otp": otp}
