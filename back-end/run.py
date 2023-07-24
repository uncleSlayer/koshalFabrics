# import statements

from app import app
from app.products import products
from app.users import users

# from app.products.products import create_new_product, get_item, get_all_items
# from app.users.users import create_user, add_to_cart
# from app.admin.admin import index

# end point registerations
# BACK_END_API.add_resource(create_new_product, "/getprod")
# BACK_END_API.add_resource(create_user, "/create-new-user")
# BACK_END_API.add_resource(get_item, "/item/<product_category>/<product_subcategory>/<serial_number>")
# BACK_END_API.add_resource(get_all_item, "/item/<product_sub_category>/<last_item_id>")
# BACK_END_API.add_resource(add_to_cart, "/cart/additem")


if __name__ == "__main__":
    app.run(port=5000, host="0.0.0.0", debug=True)
