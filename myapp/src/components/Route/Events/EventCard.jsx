import React from "react";
import styles from "../../../style/styles.js";
import CountDown from "./CountDown.jsx";
import { backend_url } from "../../../server.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart.js";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExist = cart && cart.find((i) => i._id === data._id);
    if (isItemExist) {
      toast.error("Item already exists");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };
  return (
    <>
      <div
        className={`w-full block bg-white rounded-lg ${
          active ? "unset" : "mb-12"
        } lg:flex p-2 mb-12`}
      >
        <div className="w-full lg:-w[50%] m-auto">
          <img src={`${backend_url}${data && data.images[0]}`} alt="event" />
        </div>
        <div className="w-full lg:[w-50%] flex flex-col justify-center">
          <h2 className={`${styles.productTitle}`}>{data && data.name}</h2>
          <p>{data && data.description}</p>
          <div className="flex py-2 justify-between">
            <div className="flex">
              <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                {data && data.originalPrice}$
              </h5>
              <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                {data && data.discountPrice}$
              </h5>
            </div>
            <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
              {data && data.stock} sold
            </span>
          </div>
          <CountDown data={data} />
          <br />
          <div className="flex items-center">
            <Link to={`/product/${data._id}?isEvent=true`}>
              <div className={`${styles.button} text-white mr-5`}>
                See Details
              </div>
            </Link>
            <div
              className={`${styles.button} text-white`}
              onClick={() => addToCartHandler(data)}
            >
              Add to Cart
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
