import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import OrderDetailsByShop from '../../components/Shop/OrderDetailsByShop.jsx'
import Footer from '../../components/Layout/Footer'

const ShopOrderDetails = () => {
  return (
    <div>
    <DashboardHeader/>
    <OrderDetailsByShop />  
    <Footer />       
</div>
  )
}

export default ShopOrderDetails