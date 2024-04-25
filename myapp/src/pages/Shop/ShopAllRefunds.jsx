import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashBoardSideBar from '../../components/Shop/Layout/DashBoardSideBar'
import AllRefundOrders from '../../components/Shop/AllRefundOrders.jsx'

const ShopAllRefunds = () => {
  return (
    <div>
    <DashboardHeader/>
    <div className="flex justify-between w-full">
        <div className="800px:w-[330px] w-[80px]">
            <DashBoardSideBar active={10}/>
        </div>
        <div className="w-full justify-center flex">
            <AllRefundOrders />
        </div>
    </div>
</div>
  )
}

export default ShopAllRefunds