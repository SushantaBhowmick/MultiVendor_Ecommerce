import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashBoardSideBar from '../../components/Shop/Layout/DashBoardSideBar'
import CreateProduct from '../../components/Shop/CreateProduct.jsx'

const ShopCreateProduct = () => {

  return (
    <div>
        <DashboardHeader/>
        <div className="flex items-center justify-between w-full">
            <div className="800px:w-[330px] w-[80px]">
                <DashBoardSideBar active={4}/>
            </div>
            <div className="w-full justify-center flex">
                <CreateProduct />
            </div>
        </div>
    </div>
  )
}

export default ShopCreateProduct