import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import HomePage from './components/home/HomePage.jsx'
import Login from './components/profile/Login.jsx'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/navbar/NavBar.jsx'
import Products from './components/products/Products.jsx'
import IndividualProducts from './components/products/IndividualProduct'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <NavBar />

    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/products/:category' element={<Products />} />
      <Route path='/product/:id' element={<IndividualProducts />} />
    </Routes>
  </BrowserRouter>
)
