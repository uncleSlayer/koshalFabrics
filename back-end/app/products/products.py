# import statements

from flask_restful import Resource, reqparse

# create new product
parser_create_item = reqparse.RequestParser()
parser_create_item.add_argument("name", type=str, help="arguement name is required", required=True)
parser_create_item.add_argument("serial", type=str, help="arguement serial is required", required=True)
parser_create_item.add_argument("category", type=str, help="arguement category is required", required=True)
parser_create_item.add_argument("subcategory", type=str, help="arguement subcategory is required", required=True)
parser_create_item.add_argument("price", type=float, help="arguement price is required", required=True)
parser_create_item.add_argument("description", type=str, help="arguement description is required", required=True)
parser_create_item.add_argument("image_url", action="append", help="arguement image_url is required", required=True)
parser_create_item.add_argument("discount", type=float, required=False)
parser_create_item.add_argument("zvalue", type=int, required=False)
parser_create_item.add_argument("tags", action="append", required=False)

# needs admin permission
class create_new_product(Resource):
    """
        name: name of the item,
        category: category in which the item falls in ex- Kurta, Kurti, Saree,
        subcategory: subcategory of the item ex- pata saree
        price: price of the item,
        description: any description for the item,
        image_url: list of urls for the images of the item,
        discount: discount currently available for the item,
        zvalue: higher zvalue ranks the product at the top,
        tags: list of tags for the item
    """

    def post(self):

        # import statement
        from app.products.firebase_products_ref import sambalpuri_saree, pata_saree

        item = parser_create_item.parse_args()

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
    from app.products.firebase_products_ref import sambalpuri_saree, pata_saree

    doc = sub_category_name.document(serial_number).get()

    doc_data = doc.to_dict()

    return {
        "message": "success",
        "data": doc_data
    }, 200

class get_item(Resource):
    
    def get(self, product_category, product_subcategory, serial_number):

        from app.products.firebase_products_ref import sambalpuri_saree, pata_saree

        if product_subcategory == "saree":

            return get_individual_item(sambalpuri_saree, serial_number)

        elif product_subcategory == "pata_saree":
            
            return get_individual_item(pata_saree, serial_number)


class get_all_item(Resource):
    def get(self, last_item_id, product_sub_category):
            
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
