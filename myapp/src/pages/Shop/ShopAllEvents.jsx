import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashBoardSideBar from '../../components/Shop/Layout/DashBoardSideBar'
import AllEvents from '../../components/Shop/AllEvents.jsx'

const ShopAllEvents = () => {
  return (
    <div>
    <DashboardHeader/>
   <div className="flex justify-between w-full">
       <div className="800px:w-[330px] w-[80px]">
           <DashBoardSideBar active={5}/>
       </div>
       <div className="w-full justify-center flex">
           <AllEvents />
       </div>
   </div>
</div>
  )
}

export default ShopAllEvents