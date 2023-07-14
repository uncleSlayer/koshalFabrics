import React from 'react';
import { styled } from 'styled-components';
import colorScheme from '../colorScheme';
import loginPageStockImage from '../../assets/loginPageStockImage.jpeg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const fbConfig = {
    apiKey: "AIzaSyDFdItHcrxC26dAQXij8ssiRLe_UInrymE",
    authDomain: "no-name-app-a5a97.firebaseapp.com",
    projectId: "no-name-app-a5a97",
    storageBucket: "no-name-app-a5a97.appspot.com",
    messagingSenderId: "449926682636",
    appId: "1:449926682636:web:94a5c4b652d13013547629",
    measurementId: "G-6TCYY5N7N4"
}

const firebaseApp = initializeApp(fbConfig)
const firebaseAuth = getAuth(firebaseApp)

const LoginForm = () => {

    const [isOtpSent, setIsOtpSent] = useState(false)
    const [phoneNumberInput, setPhoneNumberInput] = useState('')
    const [otpInput, setOtpInput] = useState('')
    const [display, setDisplay] = useState('inline')
    const navigate = useNavigate()

    const handlephonenumberinput = (e) => {
        setPhoneNumberInput((phoneNumberInput) => e.target.value)
    }

    const handleOtpInput = (e) => {
        setOtpInput(e.target.value)
    }

    const handleOtpSubmit = (e) => {
        e.preventDefault()
        window.authUserVerify.confirm(otpInput)
            .then((resp) => {
                console.log(resp)
                navigate('/')
            })
            .catch(() => alert('login failed'))
    }

    const handleOtpSubmitBtn = (e) => {

        e.preventDefault()
        setIsOtpSent(true)
        setDisplay('none')

        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                trySignInUser(phoneNumberInput)
            }
        }, firebaseAuth)

        window.recaptchaVerifier.verify()
        trySignInUser()
    }

    function trySignInUser(num) {
        try {
            const formattedPhone = `+91${num}`
            signInWithPhoneNumber(firebaseAuth, formattedPhone, window.recaptchaVerifier)
                .then((response) => {
                    console.log(response);
                    window.authUserVerify = response
                })
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <Form>
            <FormImage src={loginPageStockImage} />
            <FormPhoneNumberText>Enter your phone number below </FormPhoneNumberText>
            <CountryCodeText > (without country code) </CountryCodeText>
            {
                isOtpSent ? (<OtpBox type='number' placeholder='OTP' value={otpInput} onChange={handleOtpInput} />) : (<PhoneInput style={{ display: display }} type='number' name='number' value={phoneNumberInput} onChange={handlephonenumberinput} placeholder='Type your number here' />)
            }
            {
                isOtpSent ? (<LoginBTN type='submit' onClick={handleOtpSubmit}> Submit OTP</LoginBTN>) : ''
            }
            <LoginBTN id='sign-in-button' onClick={handleOtpSubmitBtn} style={{ display: display }}>Login</LoginBTN>
        </Form>
    )
}

const OtpBox = styled.input`
    border: 0;
    border-radius: 10px;
    padding: 2%;
    margin: 5%;
    border: 0;

    @media screen and (min-width: 768px){
        margin-top: 2%;
    }
`


const FormPhoneNumberText = styled.p`
    font-size: 0.8rem;
    margin-top: 30px;
    margin-left: 30px;
    margin-right: 30px;
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

    @media screen and (min-width: 768px) {
        font-size: 1.2rem;
    }
`

const CountryCodeText = styled.p`
    color: #4b4b4b;
    font-size: 1rem;

    @media screen and (min-width: 768px) {
        font-size: 1rem;
        margin-top: 0;
    }
`

const Form = styled.form`
    background-color: ${colorScheme.specialBGColor};
    border: 0;
    height: 70%;
    padding: 0;
    width: 70%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (min-width: 768px) {
        justify-content: center;
    }
`
const PhoneInput = styled.input`
    border: 0;
    border-radius: 10px;
    padding: 2%;
    margin: 5%;
    border: 0;

    @media screen and (min-width: 768px){
        margin-top: 2%;
    }
    
`
const LoginBTN = styled.button`
    color: white;
    border: 0;
    background-color: ${colorScheme.specialColor};
    border-radius: 10px;
    width: 50%;
    padding: 2%;
`

const FormImage = styled.img`
    width: 100%;
    height: 50%;
    position: relative;
    top: 0;
    border-radius: 10px 10px 0 0;

    @media screen and (min-width: 768px) {
        display: none;
    }
`

export default LoginForm