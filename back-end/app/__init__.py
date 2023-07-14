# import statements

from flask import Flask
from flask_restful import Api
import firebase_admin
from firebase_admin import firestore
import boto3
from botocore.client import Config
from flask_cors import CORS


# variable inits
app = Flask(__name__)
CORS(app)
BACK_END_API = Api(app)
firebase_cred = firebase_admin.credentials.Certificate("app/firebase.json")
firebase_admin.initialize_app(firebase_cred)
db = firestore.client()
r2_obj = boto3.resource('s3',
  endpoint_url = 'https://cea4f9e4f759ff633f4e453ea9aabb85.r2.cloudflarestorage.com',
  aws_access_key_id = 'e72bc9061777b4e63493ce5a7207a6ea',
  aws_secret_access_key = '1863e63843ae68f0d5ed79836c8279e593757ea9aa0471c248582d2f0a8db366',
  config=Config(signature_version='s3v4')
)