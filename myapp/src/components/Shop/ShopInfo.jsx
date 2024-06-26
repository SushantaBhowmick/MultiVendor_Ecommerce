import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { Link, useParams } from "react-router-dom";
import styles from "../../style/styles";
import axios from "axios";
import { toast } from "react-toastify";
import { getAllProductsShop } from "../../redux/actions/product";

const ShopInfo = ({ isOwner }) => {
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);
   const fetchShopInfo=async()=>{
    axios
    .get(`${server}/seller/get-shop-info/${id}`)
    .then((res) => {
      setData(res.data.shop);
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
      console.log(err);
    });
   }
   fetchShopInfo()
  }, [dispatch, id]);

  const logoutHandler = async () => {
    await axios
      .get(`${server}/seller/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings = products && products.reduce((acc,product) => acc + product.reviews.reduce((sum,review) => sum + review.rating, 0),0);

  const averageRating = totalRatings / totalReviewsLength || 0;
  return (
    <div>
      <div className="w-full py-5">
        <div className="w-full flex items-center justify-center">
          <img
            src={`${backend_url}${data?.avatar}`}
            alt="avatar"
            className="w-[150px] h-[150px] object-cover rounded-full"
          />
        </div>
        <h3 className="text-center py-2 text-[20px] font-bold">{data?.name}</h3>
        <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
          {data?.description}
        </p>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Address</h5>
        <h5 className=" text-[#000000a6]">{data?.address}</h5>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Phone Number</h5>
        <h5 className=" text-[#000000a6]">{data?.phoneNumber}</h5>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Total Products</h5>
        <h5 className=" text-[#000000a6]">{products && products.length}</h5>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Shop Ratings</h5>
        <h5 className=" text-[#000000a6]">{averageRating}/5</h5>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Joined On</h5>
        <h5 className=" text-[#000000a6]">{data.createdAt?.slice(0, 10)}</h5>
      </div>
      {isOwner && (
        <div className="py-3 px-4">
          <Link to={`/settings`}>
            <div
              className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
            >
              <span className="text-white">Edit Shop</span>
            </div>
          </Link>
          <div
            className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
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
