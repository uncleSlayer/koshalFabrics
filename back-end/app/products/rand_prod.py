import random, requests

names = ["Banana Saree", "Apple Kurta", "Orange Kurti", "Grape Pata", "Mango Sambalpuri"]
categories = ["Kurta", "Kurti", "Saree"]
subcategories = ["pata saree", "sambalpuri saree"]
prices = [1000, 1500, 2000, 2500, 3000]
descriptions = ["A fruity delight for your wardrobe.", "A fresh and juicy addition to your collection.", "A colorful and vibrant piece of art.", "A sweet and tangy treat for your eyes.", "A refreshing and crisp outfit for any occasion."]
discounts = [10, 20, 30, 40, 50]
zvalues = [1, 2, 3, 4, 5]
tags = ["fruit", "summer", "cotton", "silk", "handloom"]
image_url = "https://source.unsplash.com/random/900x700/?fruit"
api_url = "http://localhost:5000/getprod"

for i in range(100):
    # Generate a random item
    item = {
        "name": random.choice(names),
        "category": random.choice(categories),
        "subcategory": random.choice(subcategories),
        "price": random.choice(prices),
        "description": random.choice(descriptions),
        "image_url": image_url,
        "discount": random.choice(discounts),
        "zvalue": random.choice(zvalues),
        "tags": random.sample(tags, k=random.randint(1, len(tags)))
    }

    # Send a post request to the api with the item as json data
    response = requests.post(api_url, json=item)

    # Print the status code and the message from the response
    print(response.status_code)
    print(response.json()["message"])