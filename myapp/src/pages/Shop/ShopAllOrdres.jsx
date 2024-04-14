import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashBoardSideBar from '../../components/Shop/Layout/DashBoardSideBar'
import AllOrdersOfShop from '../../components/Shop/AllOrdersOfShop.jsx'

const ShopAllOrdres = () => {
  return (
    <div>
    <DashboardHeader/>
    <div className="flex justify-between w-full">
        <div className="800px:w-[330px] w-[80px]">
            <DashBoardSideBar active={2}/>
        </div>
        <div className="w-full justify-center flex">
            <AllOrdersOfShop />
        </div>
    </div>
</div>
  )
}

export default ShopAllOrdres