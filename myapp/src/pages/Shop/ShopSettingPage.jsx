import React from 'react'
import ShopSettings from '../../components/Shop/ShopSettings.jsx'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader.jsx'
import DashBoardSideBar from '../../components/Shop/Layout/DashBoardSideBar.jsx'

const ShopSettingPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashBoardSideBar active={11} />
        </div>
        <ShopSettings />
      </div>
    </div>
  )
}

export default ShopSettingPage