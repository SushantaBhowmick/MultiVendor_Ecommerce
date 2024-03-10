import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ProductDetails from '../components/Products/ProductDetails'
import SuggestedProduct from '../components/Products/SuggestedProduct.jsx'
import { useParams, useSearchParams } from 'react-router-dom'
import { productData } from '../static/data'
import { useSelector } from 'react-redux'

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.product);
  // const { allEvents } = useSelector((state) => state.event);
    const {id}=useParams()
    const [data,setData]=useState(null);
    // const [searchParams] = useSearchParams()

    useEffect(()=>{
       const productData = allProducts && allProducts.find((i)=>i._id===id);
       console.log(productData)
       setData(productData)
    },[allProducts,id])

  return (
    <div>
        <Header/>
        <ProductDetails data={data}/>
        {
          data && <SuggestedProduct data={data} />
        }
        <Footer/>
    </div>
  )
}

export default ProductDetailsPage