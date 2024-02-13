import React from "react";
import { useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { Link } from "react-router-dom";
import styles from "../../style/styles";
import axios from "axios";
import { toast } from "react-toastify";

const ShopInfo = ({ isOwner }) => {
  const { seller } = useSelector((state) => state.seller);

  const logoutHandler=async()=>{
    await axios.get(`${server}/seller/logout`,{withCredentials:true})
    .then((res)=>{
      toast.success(res.data.message)
      window.location.reload()
    }).catch((err)=>{
      toast.error(err.response.data.message)
    })
  }

  return (
    <div>
      <div className="w-full py-5">
        <div className="w-full flex items-center justify-center">
          <img
            src={`${backend_url}${seller?.avatar}`}
            alt="avatar"
            className="w-[150px] h-[150px] object-cover rounded-full"
          />
        </div>
        <h3 className="text-center py-2 text-[20px]">{seller?.name}</h3>
        <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
          {seller?.description}
        </p>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Address</h5>
        <h5 className=" text-[#000000a6]">{seller?.address}</h5>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Phone Number</h5>
        <h5 className=" text-[#000000a6]">{seller?.phoneNumber}</h5>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Total Products</h5>
        <h5 className=" text-[#000000a6]">10</h5>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Shop Ratings</h5>
        <h5 className=" text-[#000000a6]">4/5</h5>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Joined On</h5>
        <h5 className=" text-[#000000a6]">{seller?.createdAt.slice(0, 10)}</h5>
      </div>
      {isOwner && (
        <div className="py-3 px-4">
          <Link to="/settings">
            <div
              className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
            >
              <span className="text-white">Edit Shop</span>
            </div>
          </Link>
          <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
          onClick={logoutHandler}
          >
            <span className="text-white">Log Out</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;
