# import statements
from app import app


@app.route('/getprod', methods=["post"])
def create_new_product():
    from app.products.firebase_products_ref import sambalpuri_saree, pata_saree
    from flask import request

    item = request.get_json()

    push_item = {
        "serial": item["serial"],
        "name": item["name"],
        "price": float(item["price"]),
        "description": item["description"],
        "image_url": item["image_url"],
        "discount": float(item["discount"]),
        "zvalue": int(item["zvalue"]),
        "tags": item["tags"]
    }

    print(push_item)

    if item["subcategory"] == "sambalpuri saree":

        sambalpuri_saree.add(push_item)

    elif item["subcategory"] == "pata saree":

        pata_saree.add(push_item)

    else:

        return {
            "message": "invalid subcategory details"
        }, 400

    return {
        "message": "successs"
    }, 201


# get individual product

def get_individual_item(sub_category_name, serial_number):

    doc = sub_category_name.document(serial_number).get()

    doc_data = doc.to_dict()

    return {
        "message": "success",
        "data": doc_data
    }, 200


@app.route('/item/<product_category>/<product_subcategory>/<serial_number>')
def get_item(product_category, product_subcategory, serial_number):
    from app.products.firebase_products_ref import sambalpuri_saree, pata_saree

    if product_subcategory == "saree":

        return get_individual_item(sambalpuri_saree, serial_number)

    elif product_subcategory == "pata_saree":

        return get_individual_item(pata_saree, serial_number)


@app.route('/item/<product_sub_category>/<last_item_id>')
def get_all_items(last_item_id, product_sub_category):
    from app.products.firebase_products_ref import sambalpuri_saree, pata_saree

    buffer_sub_category = None

    if product_sub_category == "saree":
        buffer_sub_category = sambalpuri_saree

    elif product_sub_category == "patasaree":
        buffer_sub_category = pata_saree

    query = buffer_sub_category.order_by("__name__").start_after({
        "__name__": last_item_id
    }).limit(10)

    response = query.get()

    data = []

    for result in response:
        doc_data = result.to_dict()
        doc_data["id"] = result.id
        data.append(doc_data)

    return {
        "message": "success",
        "data": data
    }, 200
