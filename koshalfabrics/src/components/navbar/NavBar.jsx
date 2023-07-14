import React from 'react'
import { styled } from 'styled-components'
import menu from '../../assets/menu.png'
import bag from '../../assets/bag.png'
import account from '../../assets/account.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Products from '../products/Products'

const bgColor = '#F5EDED'
const specialColor = '#D72323'

const NavBar = () => {
    const [open, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const handleHamClick = () => {
        setIsOpen(!open)
        console.log(open)
    }

    const handleAccountClick = () => {
        setIsOpen(false)
        console.log(open)
    }

    return (
        <NavContainer>
            <Left>
                <LogoLink to='/'>
                    <Logo>koshalFabrics</Logo>
                </LogoLink>

            </Left>
            <Right>
                <Bag src={bag} />
                {/* <Account src={account} onClick={handleAccountClick} /> */}
                <AccountLink to='/login'><Account src={account} onClick={handleAccountClick} /></AccountLink>
                <Toggler src={menu} onClick={handleHamClick} />
                <NavList open={open}>
                    <li><LiLink to='/products/saree'> Sambalpuri Saree</LiLink></li>
                    <li><LiLink to='products/patasaree'>Sambalpuri Pata</LiLink></li>
                </NavList>
            </Right>
        </NavContainer>
    )
}


const Left = styled.div``
const Right = styled.div`
    display: flex;
    align-items: center;
`

const LiLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:hover {
        color: white;
    }

`

const NavContainer = styled.header`
    padding: 20px;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: ${bgColor};
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (min-width: 768px){
        padding: 0 20px;
    }
`

const Logo = styled.h3`
    font-family: 'Bad Script', cursive;
    font-weight: bold;
    margin: 0;
    color: ${specialColor};
    text-align: center;
`

const Toggler = styled.img`
    height: 25px;
    margin: auto 7px;
    @media screen and (min-width: 768px){
        display: none;
    }
`

const NavList = styled.ul`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
    padding: 15px;
    background-color: ${bgColor};
    list-style: none;
    position: absolute;
    top: 50px;
    left: 0px;
    right: 0px;
    display: ${props => props.open ? "block" : "none"};
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0 0px 10px 10px;
    cursor: pointer;
    
    li {
        padding: 5px;
        &:hover {
        background-color: ${specialColor};
        border-radius: 10px;
        color: white;
        }
    }


    @media screen and (min-width: 768px){
        border-bottom: 0;
        border-radius: 0;
        position: static;
        display: flex;
        padding: 0;

        li {
            margin: 0 20px;
        }
    }
`

const Bag = styled.img`
    height: 25px;
    margin: 0 7px;
    
    @media screen and (min-width: 768px){
        order: 3;
    }
`

const Account = styled.img`
    height: 22px;
    margin: 0;
`

const AccountLink = styled(Link)`
    height: 25px;
    display: flex;
    align-items: center;
    margin: auto 7px;
    @media screen and (min-width: 768px){
        order: 4;
    }
`

const LogoLink = styled(Link)`
    text-decoration: none;
`

export default NavBar