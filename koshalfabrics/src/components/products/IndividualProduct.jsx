import { useState } from "react";
import { useParams } from "react-router-dom";
import colorScheme from "../colorScheme";
import { styled } from "styled-components";
import productPlaceholder from "../../assets/productPlaceholder.png"

const IndividualProduct = () => {

  const params = useParams();

  const [indSaree, setIndSaree] = useState(params.id);
  const [imageLinkArray, setImageLinkArray] = useState([productPlaceholder, productPlaceholder, productPlaceholder])

  return (
    <>
      <div style={{ marginTop: "120px" }}>{indSaree}</div>

      {
        imageLinkArray.map((item) => {
          return <ProductImage src={item} />
        })
      }
    </>
  );
};

const ProductImage = styled.img`
  width: 200px;
`;

export default IndividualProduct;
