import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {AiOutlineGift} from 'react-icons/ai'
import {MdOutlineLocalOffer} from 'react-icons/md'
import {FiShoppingBag,FiPackage} from 'react-icons/fi'
import {BiMessageSquareDetail} from 'react-icons/bi'
import {backend_url} from '../../../server'

const DashboardHeader = () => {

    const {seller} = useSelector(state=>state.seller)
  return (
    <div className='w-full bg-white shadow sticky top-0 z-30 flex items-center justify-between px-4 h-[80px]'>
        <div>
            <Link to={'/dashboard'}>
                <img src="https://shopo.quomodothemes.website/assets/images/logo.svg" alt="" />
            </Link>
        </div>
        <div className="flex items-center">
        <div className="flex items-center mr-4">
           <Link to={'/dashboard/cupouns'}  className='800px:block hidden'>
           <AiOutlineGift
            size={30}
            color='#555'
            className='mx-5 cursor-pointer'
             />
           </Link>
           <Link to={'/dashboard/events'}  className='800px:block hidden'>
           <MdOutlineLocalOffer
            size={30}
            color='#555'
            className='mx-5 cursor-pointer'
             />
           </Link>
           <Link to={'/dashboard-products'}  className='800px:block hidden'>
           <FiShoppingBag
            size={30}
            color='#555'
            className='mx-5 cursor-pointer'
             />
           </Link>
           <Link to={'/dashboard-orders'}  className='800px:block hidden'>
           <FiPackage
            size={30}
            color='#555'
            className='mx-5 cursor-pointer'
             />
           </Link>
           <Link to={'/dashboard-messages'}  className='800px:block hidden'>
           <BiMessageSquareDetail
            size={30}
            color='#555'
            className='mx-5 cursor-pointer'
             />
           </Link>
           <Link to={`/shop/${seller._id}`}>
           <img src={`${backend_url}${seller.avatar}`} alt=""
           className='w-[50px] h-[50px] rounded-full object-cover' />
           </Link>
           
        </div>

        </div>
    </div>
  )
}

export default DashboardHeader