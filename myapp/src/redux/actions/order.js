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
  