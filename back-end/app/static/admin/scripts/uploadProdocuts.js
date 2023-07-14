const sareeName = document.querySelector("#saree-name")
const sareeCategory = document.querySelector("#saree-category")
const sareeSubCategory = document.querySelector("#saree-subcategory")
const sareePrice = document.querySelector("#saree-price")
const sareeDescription = document.querySelector("#saree-description")
const sareeImages = document.querySelector("#saree-images")
const sareeDiscount = document.querySelector("#saree-discount")
const sareeZvalue = document.querySelector("#saree-zvalue")
const sareeTags = document.querySelector("#saree-tags")
const submitBtn = document.querySelector("#create-btn")
const sareeSerialNo = document.querySelector("#saree-serial")

const imgArr = []

submitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const file = sareeImages.files
    imgArr.push(file)
    console.log(imgArr);
    
    const formData = new FormData
    
    for (let index = 0; index < sareeImages.files.length; index++) {
        formData.append("file" + index, sareeImages.files[index])
    }

    try {
        formData.append("sareeInfo",JSON.stringify({
            "name": sareeName.value,
            "serial": sareeSerialNo.value,
            "category": sareeCategory.value,
            "subcategory": sareeSubCategory.value,
            "price": parseFloat(sareePrice.value),
            "description": sareeDescription.value,
            "discount": parseFloat(sareeDiscount.value),
            "zvalue": parseInt(sareeZvalue.value),
            "tags": sareeTags.value
        }))
        console.log(formData.get("sareeInfo"));
    } catch (error) {
        console.log(error);
    }

    fetch(
        "http://localhost:5000/admin/lol/createproduct",
        {
            method: "POST",
            body: formData
        }
    )
    .then((response) => console.log(response))


})
