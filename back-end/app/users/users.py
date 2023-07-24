from app.users.firebase_users_ref import users_ref
from app import app

# create a new user
@app.route("/create-new-user", methods=["post"])
def create_user():
    from flask import make_response, request
    from firebase_admin.auth import verify_id_token

    token = request.headers.get("Authorization")
    print(token)
    token_decrypted = verify_id_token(token)

    exists = False
    result = users_ref.where("phone", "==", token_decrypted["phone_number"]).get()

    for res in result:
        exists = True if res else False

    if exists:
        resp = make_response()

        resp.set_cookie('access_token', token, httponly=True, secure=True, samesite='None', max_age=2592000)
        resp.access_control_allow_origin = request.origin
        resp.headers['content-type'] = 'application/json'
        resp.headers.set("Access-Control-Allow-Credentials", 'true')

        return resp

    push_user = {
        "phone": token_decrypted["phone_number"]
    }

    users_ref.add(push_user)

    resp = make_response()
    resp.set_cookie('access_token', token, httponly=True, secure=True, samesite='None', max_age=2592000)
    resp.access_control_allow_origin = request.origin
    resp.headers.set("Access-Control-Allow-Credentials", 'true')
    return resp


# add to cart
@app.route("/cart/additem", methods=["post"])
def add_to_cart():
    from firebase_admin import auth, firestore
    from flask import request, make_response

    token = request.cookies.get("access_token")

    if token:

        phone = auth.verify_id_token(token).get("phone_number")

        user_snapshot = users_ref.where("phone", "==", phone).get()

        print(user_snapshot)

        doc_reference = None

        for user in user_snapshot:
            doc_reference = user.reference

        doc_reference.update(
            {"cart": firestore.ArrayUnion([request.get_json()["new_cart_item"]])}
        )
        
        resp = make_response({
            "message": "item added to cart"
        })
        resp.headers["Access-Control-Allow-Origin"] = request.origin
        resp.headers["Access-Control-Allow-Credentials"] = "true"
        return resp

    else:
        return {
            "error": "user not logged in"
        }, 400
