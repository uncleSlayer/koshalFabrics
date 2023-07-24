from app import app
from flask import render_template, request

@app.route("/admin/lol")
def index():
    return render_template("admin/index.html")

@app.route("/admin/lol/login")
def admin_login():

    return render_template("admin/login.html")

@app.route("/admin/lol/createproduct", methods=["GET", "POST"])
def upload_products():
    import json
    from app import r2_obj
    import io
    from botocore.client import Config
    import requests, json
    from flask import request
    from firebase_admin import auth

    config = Config(s3={'addressing_style': 'path'})
    if request.method == "GET":

        return render_template("admin/uploadproduct.html")
    
    elif request.method == "POST":
        saree_data = dict(request.form)
        saree_images = request.files.items()

        try:
            saree_info = json.loads(saree_data.get('sareeInfo'))
            url_list = []

            for index, image_data in enumerate(saree_images):
                file_like = io.BytesIO(image_data[1].read())
                r2_obj.Bucket("koshalfabrics").upload_fileobj(file_like, f'{saree_info["name"]}_{index}')
                url = "storage.koshalfabrics.in/" + saree_info["serial"]
                url_list.append(url)

            saree_info["image_url"] = url_list

            try:
                requests.post("http://localhost:5000/getprod", json=saree_info)

            except Exception as e:
                print(e)

        except Exception as e:
            print(e)

        return "post"
