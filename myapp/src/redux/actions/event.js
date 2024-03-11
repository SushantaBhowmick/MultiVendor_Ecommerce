import axios from "axios";
import { server } from "../../server";

// Create event

export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch({ type: "eventCreateRequest" });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const {data} = await axios.post(
      `${server}/event/create-event`,
      newForm,
      {withCredentials:true},
      config
    );

    dispatch({
      type: "eventCreateSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

// Get all event by shop
export const getAlleventsShop = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getAlleventShopRequest" });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const {data} = await axios.get(
      `${server}/event/get-all-events-shop/${id}`,
      config
    );

    dispatch({
      type: "getAlleventShopSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAlleventShopFail",
      payload: error.response.data.message,
    });
  }
};

// Get all events
export const getAllevents = () => async (dispatch) => {
  try {
    dispatch({ type: "getAlleventsRequest" });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const {data} = await axios.get(
      `${server}/event/get-all-events`,
      config
    );

    dispatch({
      type: "getAlleventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAlleventsFail",
      payload: error.response.data.message,
    });
  }
};

// Delete event
export const deleteeventShop = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteeventShopRequest" });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const {data} = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,{withCredentials:true},
      config
    );

    dispatch({
      type: "deleteeventShopSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteeventShopFail",
      payload: error.response.data.message,
    });
  }
};
