import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashBoardSideBar from '../../components/Shop/Layout/DashBoardSideBar'
import AllCoupouns from '../../components/Shop/AllCoupouns.jsx'

const ShopAllCoupouns = () => {
  return (
    <div>
    <DashboardHeader/>
   <div className="flex justify-between w-full">
       <div className="800px:w-[330px] w-[80px]">
           <DashBoardSideBar active={9}/>
       </div>
       <div className="w-full justify-center flex">
           <AllCoupouns />
       </div>
   </div>
</div>
  )
}
export default ShopAllCoupouns