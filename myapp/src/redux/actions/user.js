import axios from "axios";
import { server } from "../../server";
//load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });
    const { data } = await axios.get(`${server}/user/me`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

//update User Info
export const updateUserInfo =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch({ type: "updateUserInfoRequest" });

      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        { name, email, phoneNumber, password },
        { withCredentials: true }
      );
      dispatch({
        type: "updateUserInfoSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFail",
        payload: error.response.data.message,
      });
    }
  };

//update User Address
export const updateUserAddress =
  (country, city, zipCode, address1, address2, addressType) =>
  async (dispatch) => {
    try {
      dispatch({ type: "updateUserAddressRequest" });

      const { data } = await axios.put(
        `${server}/user/update-user-addresses`,
        { country, city, zipCode, address1, address2, addressType },
        { withCredentials: true }
      );
      dispatch({
        type: "updateUserAddressSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "updateUserAddressFail",
        payload: error.response.data.message,
      });
    }
  };
