import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../../redux/actions/order'


const UserOrderDetails = () => {
    const {user} = useSelector(state=>state.user)
    const {orders} = useSelector(state=>state.orders)
    const {id} = useParams();
    const dispatch=useDispatch();
    const data = orders && orders.find((item)=>item._id===id)

    useEffect(()=>{
        dispatch(getAllOrders(user._id))
    })
  return (
    <div>UserOrderDetails</div>
  )
}

export default UserOrderDetails