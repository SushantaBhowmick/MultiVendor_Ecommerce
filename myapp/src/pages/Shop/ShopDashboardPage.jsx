import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashBoardSideBar from '../../components/Shop/Layout/DashBoardSideBar.jsx'
import ShopDashboard from "../../components/Shop/ShopDashboard.jsx";

const ShopDashboardPage = () => {


  return (
    <div>
        <DashboardHeader/>
        <div className="flex items-center justify-between w-full">
            <div className="800px:w-[330px] w-[80px]">
                <DashBoardSideBar active={1}/>
            </div>
            <ShopDashboard />
        </div>
    </div>
  )
}

export default ShopDashboardPage