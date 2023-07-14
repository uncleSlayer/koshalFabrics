from flask_restful import Resource, reqparse
from app.users.firebase_users_ref import users_ref
from app import db

# create new user
parser_create_user = reqparse.RequestParser()
parser_create_user.add_argument(
    "name", type=str, help="arguement name is required", required=True
)
parser_create_user.add_argument(
    "phone",
    type=str,
    help="arguement phone(without country code) is required",
    required=True,
)
parser_create_user.add_argument(
    "date", type=str, help="arguement date is required", required=True
)

# check user exists or not
parser_check_user = reqparse.RequestParser()
parser_check_user.add_argument(
    "phone", type=str, help="arguement phone is required", required=True
)


class create_user(Resource):

    """
    name: name of the user,
    phone: phone number of the user,
    date: date of account creation of the user
    """

    def post(self):
        new_user = parser_create_user.parse_args()

        push_user = {
            "name": new_user["name"],
            "phone": new_user["phone"],
            "account created": new_user["date"],
        }

        users_ref.add(push_user)

        return {"message": "success"}, 201


# check if user exists
class check_user(Resource):

    """
    phone: phone number of the user
    """

    def get(self):
        check_user_data = parser_check_user.parse_args()

        query = users_ref.where("phone", "==", check_user_data["phone"])

        result = query.get()
        exists = False

        for res in result:
            if res:
                exists = True

        return {"exists": exists, "message": "success"}, 200


# add to cart
class add_to_cart(Resource):
    def post(self):
        from firebase_admin import auth, firestore
        from flask import request, jsonify

        token = request.cookies.get("token")
        phone = auth.verify_id_token(token).get("phone_number")

        print(phone)
        user_snapshot = users_ref.where("phone", "==", phone).get()

        print(user_snapshot)

        doc_reference = None

        for user in user_snapshot:
            doc_reference = user.reference

        doc_reference.update(
            {"cart": firestore.ArrayUnion(request.get_json()["new_cart_item"])}
        )
        return {"message": "success"}, 201
