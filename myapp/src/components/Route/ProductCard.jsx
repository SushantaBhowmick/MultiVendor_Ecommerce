import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductDetailsCard from './ProductDetailsCard.jsx'
import styles from "../../style/styles";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backend_url } from "../../server.js";
import { useDispatch, useSelector } from "react-redux";
import { addTowishlist, removeFromWishlist } from "../../redux/actions/wishlist.js";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart.js";
import Ratings from "../Products/Ratings.jsx";

const ProductCard = ({ data ,isShop,isEvent}) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const {wishlist} = useSelector(state=>state.wishlist)

  const dispatch = useDispatch()

  const removeFromWishlistHandler=(data)=>{
    setClick(!click)
    dispatch(removeFromWishlist(data))
  toast.warn("Item removed from wishlist")
  }
  const addToWishlistHandler=(data)=>{
    if(wishlist.length>4){
      toast.error("Your wishlist limit has exceed")
    }else{
      setClick(!click)
      dispatch(addTowishlist(data))
    toast.success("Item added to wishlist")
    }
  }

  useEffect(()=>{
    if(wishlist && wishlist.find((i)=>i._id === data._id)){
      setClick(true)
    }else{
      setClick(false)
    }
  },[wishlist,data._id])

  const {cart} = useSelector(state=>state.cart)
  const addToCartHandler=(id)=>{
     const isItemExist= cart && cart.find((i)=>i._id===id)
     if(isItemExist){
       toast.error("Item already exists");
     }else{
       if(data.stock<1){
         toast.error("Product stock limited")
       }else{
         const cartData={...data,qty:1}
       dispatch(addTocart(cartData))
       toast.success("Item added to cart successfully!")
       }
     }
     
   }

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shaddow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={isEvent===true?`/product/${data._id}?isEvent=true`:`/product/${data._id}`}>
          <img
            src={`${backend_url}${data.images && data.images[0]}`}
            alt="product"
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link  to={`/shop/preview/${data.shop._id}`} >
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={isEvent===true?`/product/${data._id}?isEvent=true`:`/product/${data._id}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
          <div className="flex">
           <Ratings rating={data.ratings} />
          </div>
          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.price === 0 ? data.price : data.discountPrice}$
              </h5>
              <h4 className={`${styles.price}`}>
                {data.originalPrice ? data.originalPrice + "$" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data?.sold_out}sold
            </span>
          </div>
          </Link>

          {/* side options */}
          <div>
            {click ? (
              <AiFillHeart
                size={22}
                className="cursor-pointer absolute right-2 top-5"
                onClick={() => removeFromWishlistHandler(data)}
                color={click ? "red" : "#333"}
                title="Remove from wishlist"
              />
            ) : (
              <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
               />
            )}
            <AiOutlineEye
                size={22}
                className="cursor-pointer absolute right-2 top-14"
                onClick={()=>setOpen(!open)}
                color={"#333"}
                title="Quick View"
              />
            <AiOutlineShoppingCart
                size={25}
                className="cursor-pointer absolute right-2 top-24"
                onClick={()=>addToCartHandler(data._id)}
                color={"#444"}
                title="Add to cart"
              />
              {
                open?(
                    <ProductDetailsCard  setOpen={setOpen} data={data}/>
                ):null
              }
          </div>
      </div>
    </>
  );
};

export default ProductCard;
