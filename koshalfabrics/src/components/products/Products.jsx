import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import colorScheme from '../colorScheme'
import { SERVER_IP } from '../../../config'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'

const Products = (props) => {
    const param = useParams()
    const navigate = useNavigate()

    const [lastItem, setLastItem] = useState('')
    const [products, setProducts] = useState([])
    const [hasMore, setHasMore] = useState(true)
    console.log(lastItem)


    useEffect(() => {

        setProducts([])
        setHasMore(true)

        if (param.category === 'saree') {
            console.log('im going to run now u shit')
            setLastItem('1E3HNTmQloIhykXGrCNm')
        } else if (param.category === 'patasaree') {
            setLastItem('AcpfyrbD9U0sgnF4FXw1')
        }

    }, [param.category])

    useEffect(() => {
        const fetchProductsData = function () {
            if (lastItem.length > 0) {
                fetch(`${SERVER_IP}/item/${param.category}/${lastItem}`)
                    .then((resp) => {
                        return resp.json()
                    })
                    .then((resp) => {
                        if (resp.data.length < 10) {
                            setHasMore(false)
                        }
                        setProducts([...products, ...resp.data])
                    })

                    .catch((err) => {
                        console.log(err)
                    })
            }
        }

        fetchProductsData()

    }, [lastItem])

    return (
        <ProductsContainer style={{ marginTop: '100px' }} next={() => {
            console.log('changing')
            setLastItem(products[products.length - 1].id)
        }}
            hasMore={hasMore}
            dataLength={products.length}>
            {
                products.map((product) => {
                    console.log(product)
                    return (
                        <ProductHolder key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
                            <ProductImage src={'https://' + product.image_url[0]} style={{ height: '200px' }} />
                            <ProductName>{product.name}</ProductName>
                            <ProductPrice>price: ₹{product.price}</ProductPrice>
                        </ProductHolder>
                    )
                })
            }
        </ProductsContainer>
    )
}


const ProductsContainer = styled(InfiniteScroll)`
    display: grid;
    grid-template-columns: repeat(2, minmax(50%, 1fr));
    justify-content: center;
`

const ProductHolder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5%;
    background-color: ${colorScheme.specialBGColor};
    padding: 5%;
    border-radius: 10%;
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
`
const ProductName = styled.p`
    margin: 0;
    margin-top: 5%;
    font-size: small;
    color: ${colorScheme.specialColor};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`
const ProductImage = styled.img`
    width: 140px;
    border-radius: 10px;
`

const ProductPrice = styled.p`
    margin: 0;
    font-size: small;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`

export default Products