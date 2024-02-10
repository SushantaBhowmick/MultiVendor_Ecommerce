import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashBoardSideBar from '../../components/Shop/Layout/DashBoardSideBar'
import AllProducts from "../../components/Shop/AllProducts.jsx"

const ShopAllProducts = () => {
  return (
    <div>
        <DashboardHeader/>
        <div className="flex justify-between w-full">
            <div className="800px:w-[330px] w-[80px]">
                <DashBoardSideBar active={3}/>
            </div>
            <div className="w-full justify-center flex">
                <AllProducts />
            </div>
        </div>
    </div>
  )
}

export default ShopAllProducts