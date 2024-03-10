import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductDetailsCard from './ProductDetailsCard.jsx'
import styles from "../../style/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { backend_url } from "../../server.js";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const d = data.name;
  // const product_name = d.replace(/\s+/g, "-");

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shaddow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${data._id}`}>
          <img
            src={`${backend_url}${data.images && data.images[0]}`}
            alt="product"
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to={`/`}>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={`/product/${data._id}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
          <div className="flex">
            <AiFillStar size={22} className="cursor-pointer " color="#F6BA00" />
            <AiFillStar size={22} className="cursor-pointer " color="#F6BA00" />
            <AiFillStar size={22} className="cursor-pointer " color="#F6BA00" />
            <AiFillStar size={22} className="cursor-pointer" color="#F6BA00" />
            <AiOutlineStar
              size={22}
              className="cursor-pointer"
              color="#F6BA00"
            />
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
              {data.stock}sold
            </span>
          </div>
          </Link>

          {/* side options */}
          <div>
            {click ? (
              <AiFillHeart
                size={22}
                className="cursor-pointer absolute right-2 top-5"
                // onClick={() => removeFromWishlistHandler(data)}
                onClick={()=>setClick(!click)}
                color={click ? "red" : "#333"}
                title="Remove from wishlist"
              />
            ) : (
              <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={()=>setClick(!click)}
            //   onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
               />
            )}
            <AiOutlineEye
                size={22}
                className="cursor-pointer absolute right-2 top-14"
                // onClick={() => removeFromWishlistHandler(data)}
                onClick={()=>setOpen(!open)}
                color={"#333"}
                title="Quick View"
              />
            <AiOutlineShoppingCart
                size={25}
                className="cursor-pointer absolute right-2 top-24"
                // onClick={() => removeFromWishlistHandler(data)}
                // onClick={()=>setOpen(!open)}
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
