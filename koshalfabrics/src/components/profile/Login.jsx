import React from 'react'
import { styled } from 'styled-components'
import UserProfile from './UserProfile'
import { useLoggedUserStore } from '../../context/store'
import loginPageStockImage from '../../assets/loginPageStockImage.jpeg'
import LoginForm from './LoginForm'

const Login = () => {

  const userPhone = useLoggedUserStore((state) => state.loggedUser.userPhoneNumber)

  if (userPhone) {
    return <UserProfile />
  } else {
    return (
      <LoginBoxContainer>
        <LoginPageStockImage src={loginPageStockImage} />
        <LoginForm />
      </LoginBoxContainer>
    )
  }
}

export default Login

const LoginBoxContainer = styled.div`

  /* background-color:black ; */
  margin-top: 79px;
  width: 100%;
  margin: 79px auto 0;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px){
    width: 70%;
  }
`
const LoginPageStockImage = styled.img`
  height: 100%;
  width: 100%;
  display: none;

  @media screen and (min-width: 768px){
    display: inline;
    height: 70%;
    width: 50%;
    border-radius: 10px 0 0 10px;
  }
`
const LoginPageForm = styled.div`

`