import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashBoardSideBar from '../../components/Shop/Layout/DashBoardSideBar'
import CreateEvent from '../../components/Shop/CreateEvent'

const ShopCreateEvents = () => {
  return (
    <div>
         <DashboardHeader/>
        <div className="flex items-center justify-between w-full">
            <div className="800px:w-[330px] w-[80px]">
                <DashBoardSideBar active={6}/>
            </div>
            <div className="w-full justify-center flex">
                <CreateEvent />
            </div>
        </div>
    </div>
  )
}

export default ShopCreateEvents