import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import Lottie from 'react-lottie'
import animationData from '../Assets/animations/107043-success.json'

const OrderSuccessPage = () => {
  return (
    <div>
        <Header />
        <Success />
        <Footer />
    </div>
  )
}

const Success =()=>{
    const defaultOptions={
        loop:false,
        autoplay:true,
        animationData:animationData,
        rendererSettings:{
            preserveAspectRatio:"xMidYMid slice"
        }
    }
    return(
        <div>
            <Lottie options={defaultOptions} width={300} height={300} />
            <h5 className='text-center text-[25px] mb-14 text-[#000000a1]'>
                Your order is successful 😍
            </h5>
            <br />
            <br />
        </div>
    )
}

export default OrderSuccessPage