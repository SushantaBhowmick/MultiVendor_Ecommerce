import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../style/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart";

const Wishlist = ({ setOpenwishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch()

  const removeFromWishlistHandler=(data)=>{
    dispatch(removeFromWishlist(data))
  toast.warn("Item removed from wishlist")

  }

  const {cart} = useSelector(state=>state.cart)
  const addToCartHandler=(data)=>{
     const isItemExist= cart && cart.find((i)=>i._id===data._id)
     if(isItemExist){
       toast.error("Item already exists");
     }else{
       if(data.stock<1){
         toast.error("Product stock limited")
       }else{
         const cartData={...data,qty:1}
       dispatch(addTocart(cartData))
       setOpenwishlist(false)
       toast.success("Item added to cart successfully!")
       }
     }
     
   }


  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed right-0 top-0 min-h-full w-[25%] bg-white flex flex-col justify-between ">
      {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenwishlist(false)}
              />
            </div>
            <h5>Wishlist Items is empty!</h5>
          </div>
        ) :(
        <div>
          <div className="flex w-full justify-end pt-5 pr-5 ">
            <RxCross1
              onClick={() => setOpenwishlist(false)}
              cursor={"pointer"}
              size={25}
            />
          </div>
          {/* items length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <AiOutlineHeart size={25} color={wishlist.length===0?"#333":"red"}/>
            <h5 className="pl-2 text-[20px] font-[500]">{wishlist && wishlist.length} items</h5>
          </div>
          {/* cart Single item */}
          <br />
          <div className="w-full border-t">
            {wishlist &&
              wishlist.map((i, index) => (
                <WishListSingle
                  key={index}
                  data={i}
                  removeFromWishlistHandler={removeFromWishlistHandler}
                  addToCartHandler={addToCartHandler}
                />
              ))}
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

const WishListSingle = ({ data, removeFromWishlistHandler,addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;


  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1
          className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2"
          onClick={() => removeFromWishlistHandler(data)}
          size={20}
        />
        <img
          src={`${backend_url}${data && data.images[0]}`}
          alt="product"
          className="w-[80px] h-[80px] mx-3"
        />
        <div className="pl-[5px]">
          <h1>{data.name.length>30? data.name.slice(0,40)+"..." : data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.discountPrice} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            tile="Add to cart"
               onClick={() => addToCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
