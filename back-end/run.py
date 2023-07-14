# import statements

from app import app, BACK_END_API
from app.products.products import create_new_product, get_item, get_all_item
from app.users.users import create_user, check_user, add_to_cart
import socket
from app.admin.admin import index

# end point registerations
BACK_END_API.add_resource(create_new_product, "/getprod")
BACK_END_API.add_resource(create_user, "/create-new-user")
BACK_END_API.add_resource(check_user, "/check-user")
BACK_END_API.add_resource(get_item, "/item/<product_category>/<product_subcategory>/<serial_number>")
BACK_END_API.add_resource(get_all_item, "/item/<product_sub_category>/<last_item_id>")
BACK_END_API.add_resource(add_to_cart, "/cart/additem") # cart item/items must be given inside an array.
# server start
hostname = socket.gethostname()
ipaddr = socket.gethostbyname(hostname)

if __name__ == "__main__":
    print(ipaddr)
    app.run(port=5000, host="0.0.0.0", debug=True)
