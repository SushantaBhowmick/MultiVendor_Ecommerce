import axios from "axios";
import { server } from "../../server";

// Create Product

export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({ type: "productCreateRequest" });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const {data} = await axios.post(
      `${server}/product/create-product`,
      newForm,
      config
    );

    dispatch({
      type: "productCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "productCreateFail",
      payload: error.response.data.message,
    });
  }
};

// Get all Product
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getAllProductShopRequest" });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const {data} = await axios.get(
      `${server}/product/get-all-products-shop/${id}`,
      config
    );

    dispatch({
      type: "getAllProductShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductShopFail",
      payload: error.response.data.message,
    });
  }
};
