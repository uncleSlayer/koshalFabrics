// import statements
import * as firebase from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js'

// configs
const fbConfig = {
    apiKey: "AIzaSyDFdItHcrxC26dAQXij8ssiRLe_UInrymE",
    authDomain: "no-name-app-a5a97.firebaseapp.com",
    projectId: "no-name-app-a5a97",
    storageBucket: "no-name-app-a5a97.appspot.com",
    messagingSenderId: "449926682636",
    appId: "1:449926682636:web:94a5c4b652d13013547629",
    measurementId: "G-6TCYY5N7N4"
}

// initializatoins
const app = firebase.initializeApp(fbConfig)
const auth = getAuth()

// variables
let phone = document.querySelector(".phoneno")
const otpBtn = document.querySelector(".otp-btn")
const phoneContainer = document.querySelector(".phone-container")


function trySignInUser() {
    try {
        const formattedPhone = `+91 ${phone.value}`
        signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier)
            .then((response) => {
                console.log(response);
                window.authUserVerify = response
            })
    } catch (error) {
        console.log(error);
    }
}

const otpComponent = `
    <div class="mb-3">
        <label for="otp" class="form-label">Enter otp</label>
        <input type="number" class="form-control otp otp-input" id="otp">
        <button type="submit" class="btn btn-primary login-btn mt-2 otpverify">Login</button>
    </div>
`

window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-widget",
    {
        "size": "invisible",
        "callback": () => {
            trySignInUser()
        }
    },
    auth
)

otpBtn.addEventListener("click", (e) => {
    e.preventDefault()

    window.recaptchaVerifier.verify()
        .then(() => {
            otpBtn.setAttribute("style", "display: none;")
            phone.setAttribute("disabled", "true")

            phoneContainer.innerHTML += otpComponent

            const loginBtn = document.querySelector(".login-btn")
            const otpVal = document.querySelector(".otp-input")

            console.log(loginBtn);
            window.recaptchaVerifier.verify()

            try {

                loginBtn.addEventListener("click", (e) => {
                    e.preventDefault()
                    console.log(otpVal.value);
                    window.authUserVerify.confirm(otpVal.value)
                        .then((response) => {
                            if (response.user.phoneNumber == "+918327793515" || response.user.phoneNumber == "+919438281830" || response.user.phoneNumber == "+7848033003"){
                                alert("login successful")
                                console.log("user logged in");
                            }
                        })
                })
            } catch (error) {

            }
        })

})