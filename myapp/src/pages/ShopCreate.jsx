import React, { useEffect } from 'react'
import ShopCreates from '../components/Shop/ShopCreates.jsx'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShopCreatePage = () => {
  const navigate = useNavigate();
  const { isSeller,seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if(isSeller === true){
      navigate(`/shop/${seller._id}`);
    }
  }, [navigate,isSeller])
  return (
    <>
        <ShopCreates />
    </>
  )
}

export default ShopCreatePage