import React from 'react'
import DashBoardSideBar from '../../components/Shop/Layout/DashBoardSideBar'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import ShopWithdrawMoney from '../../components/Shop/ShopWithdrawMoney.jsx'

const ShopWithdrawMoneyPage = () => {
  return (
    <div>
        <DashboardHeader/>
        <div className="flex items-center justify-between w-full">
            <div className="800px:w-[330px] w-[80px]">
                <DashBoardSideBar active={7}/>
            </div>
            <ShopWithdrawMoney />
        </div>
    </div>
  )
}

export default ShopWithdrawMoneyPage