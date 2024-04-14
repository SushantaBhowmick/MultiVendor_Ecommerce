import axios from "axios";
import { server } from "../../server";


export const getAllOrders = (userId) => async (dispatch) => {
    try {
      dispatch({ type: "getAllOrdersUserRequest" });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const {data} = await axios.get(
        `${server}/order/get-all-orders/${userId}`,
        {withCredentials:true},
        config
      );
  
      dispatch({
        type: "getAllOrdersUserSuccess",
        payload: data.orders,
      });
    } catch (error) {
      dispatch({
        type: "getAllOrdersUserFail",
        payload: error.response.data.message,
      });
    }
  };
  

export const getAllOrdersSeller = (shopId) => async (dispatch) => {
    try {
      dispatch({ type: "getAllOrdersSellerRequest" });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const {data} = await axios.get(
        `${server}/order/get-seller-all-orders/${shopId}`,
        {withCredentials:true},
        config
      );
  
      dispatch({
        type: "getAllOrdersSellerSuccess",
        payload: data.shopOrders,
      });
    } catch (error) {
      dispatch({
        type: "getAllOrdersSellerFail",
        payload: error.response.data.message,
      });
    }
  };
  