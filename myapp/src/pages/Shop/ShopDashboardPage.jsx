import React, { useState } from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashBoardSideBar from '../../components/Shop/Layout/DashBoardSideBar.jsx'


const ShopDashboardPage = () => {
    const [active,setActive]=useState(1)
  return (
    <div>
        <DashboardHeader/>
        <div className="flex items-center justify-between w-full">
            <div className="800px:w-[330px] w-[80px]">
                <DashBoardSideBar active={active} setActive={setActive} />
            </div>
        </div>
    </div>
  )
}

export default ShopDashboardPage