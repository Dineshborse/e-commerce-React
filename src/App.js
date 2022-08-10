import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProductsPage from './Components/ProductsPage';

function App() {

  const [AllCategories, getAllCategories] = useState([])

  useEffect(() => {

    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(json => {
        getAllCategories(["All Categories",...json])
        // console.log(json)
        // console.log(AllCategories)
      })

  }, [])



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductsPage allCato={AllCategories} />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
