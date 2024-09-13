import os.path
import requests
import base64
import csv
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv

# If modifying these SCOPES, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/gmail.send"]
load_dotenv()
API_URL = os.getenv("API_URL")
SENDER_EMAIL = "rayjones2170@gmail.com"


def get_emails():
    return ["raymond@raymondjones.dev"]
    response = requests.get(API_URL)
    if response.status_code == 200:
        print("RESP", response.json())
        return response.json()
    else:
        raise Exception(f"Failed to retrieve emails: {response.status_code}")


def authenticate_gmail():
    creds = None
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)
        with open("token.json", "w") as token:
            token.write(creds.to_json())
    return build("gmail", "v1", credentials=creds)


def create_message(sender, to, subject, body):
    message = MIMEText(body)
    message["to"] = to
    message["from"] = sender
    message["subject"] = subject
    raw = base64.urlsafe_b64encode(message.as_bytes()).decode()
    return {"raw": raw}


def send_email(service, recipient_email, body_text):
    message = create_message(
        SENDER_EMAIL,
        recipient_email,
        "Top News Articles for the Day in Medellin, Colombia",
        body_text,
    )
    try:
        sent_message = (
            service.users().messages().send(userId="me", body=message).execute()
        )
        print(f"Email sent to {recipient_email}, Message ID: {sent_message['id']}")
    except Exception as e:
        print(f"Error sending email to {recipient_email}: {str(e)}")


def read_headlines():
    # Read headlines and links from CSV using the csv library
    headlines_list = []
    with open(
        "../Frontend/public/colombian_news_info.csv", mode="r", encoding="utf-8"
    ) as file:
        # Skip the header line
        next(file)
        for index, line in enumerate(file):
            print("STARTER", line)
            # Split line by the delimiter '│'
            columns = line.strip().split("|")
            print(columns, len(columns))
            if len(columns) == 2:  # Ensure there are exactly 2 columns
                headline, url = columns
                # Append formatted headline and URL to the list
                headlines_list.append(
                    f"{index + 1}. {headline.strip()} - {url.strip()}"
                )

    return "\n".join(headlines_list)


def format_email_body(headlines):
    # Dynamic email body using the formatted headlines
    return f"""\
Hey,

Here are the top news articles for the day in Medellin, Colombia:

{headlines}

Best regards,
Medellin News Alerts
"""


def main():
    # Retrieve emails from API
    emails = get_emails()

    # Authenticate Gmail API
    service = authenticate_gmail()

    # Read headlines from CSV
    headlines = read_headlines()
    # Format email body
    body_text = format_email_body(headlines)

    # Send email to each recipient
    for email in emails:
        send_email(service, email, body_text)


if __name__ == "__main__":
    main()
