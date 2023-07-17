import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import colorScheme from "../colorScheme";
import { styled } from "styled-components";
import productPlaceholder from "../../assets/productPlaceholder.png";
import useEmblaCarousel from "embla-carousel-react";
import { SERVER_IP } from "../../../config";

const IndividualProduct = () => {
  const params = useParams();
  const [emblaRef] = useEmblaCarousel({
    align: "center",
    startIndex: 0,
    slidesToScroll: 1,
  });

  const [indSareeId, setIndSareeId] = useState(params.id);

  const [imageLinkArray, setImageLinkArray] = useState([
    productPlaceholder,
    productPlaceholder,
    productPlaceholder,
  ]);
  const [product, setProduct] = useState({
    name: "tingu saree",
    price: 4999,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit laoreet id donec ultrices tincidunt arcu. In pellentesque massa placerat duis ultricies lacus. Elementum tempus egestas sed sed. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Ultrices gravida dictum fusce ut. At lectus urna duis convallis convallis tellus. A lacus vestibulum sed arcu. Turpis egestas sed tempus urna et. Consectetur purus ut faucibus pulvinar. Sagittis vitae et leo duis ut diam quam. Aliquam id diam maecenas ultricies mi eget mauris pharetra et. Tincidunt vitae semper quis lectus nulla at volutpat diam. Pulvinar etiam non quam lacus.",
  });

  // /item/<product_category>/<product_subcategory>/<serial_number>"

  useEffect(() => {
    fetch(`${SERVER_IP}/item/saree/saree/${indSareeId}`)
    .then(
      (resp) => {
        return resp.json()
      }
    )
    .then(
      (resp) => {
        console.log(resp.data)
        const image_link_arr = resp.data.image_url.map((url) => url = 'https://' + url)
        setImageLinkArray(image_link_arr)
        setProduct({
          name: resp.data.name,
          price: resp.data.price,
          description: resp.data.description
        })
      }
    )
  }, [indSareeId]);

  return (
    <div>
      <div style={{ marginTop: "120px" }} className="embla" ref={emblaRef}>
        <div className="embla__container" style={{ width: "200px" }}>
          {imageLinkArray.map((item, index) => {
            return (
              <ProductImage src={item} key={index} className="embla__slide" />
            );
          })}
        </div>
      </div>
      <ProductInfoContainer>
        <ProductName> {product.name} </ProductName>
        <ProductPrice> ₹ {product.price} </ProductPrice>
        <ProductDescription> {product.description} </ProductDescription>
        <AddToCartBtn>Add to cart</AddToCartBtn>
      </ProductInfoContainer>
    </div>
  );
};

const ProductImage = styled.img`
  border-radius: 10px;
  width: 200px;
  margin: 5%;
`;

const ProductName = styled.h5``;

const ProductPrice = styled.p``;

const ProductDescription = styled.p``;

const AddToCartBtn = styled.button`
  position: fixed;
  bottom: 15px;
  display: inline-block;
  width: 40%;
  margin: 0 22.5%;
  padding: 1.5%;
  background-color: ${colorScheme.specialColor};
  color: white;
  border: none;
  border-radius: 10px;
`;

const ProductInfoContainer = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 10px;
  margin: 2%;
  padding: 3%;
  background-color: ${colorScheme.specialBGColor};
`;

export default IndividualProduct;
