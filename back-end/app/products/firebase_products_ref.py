# import statement
from firebase_admin import firestore
from app import db


# saree references

# subcategory one
sambalpuri_saree = db.collection("products").document("saree").collection("sambalpuri-saree")

# subcategory two
pata_saree = db.collection("products").document("saree").collection("pata-saree")