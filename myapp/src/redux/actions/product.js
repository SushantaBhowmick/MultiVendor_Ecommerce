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
      {withCredentials:true},
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

// Delete Product
export const deleteProductShop = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProductShopRequest" });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const {data} = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,{withCredentials:true},
      config
    );

    dispatch({
      type: "deleteProductShopSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductShopFail",
      payload: error.response.data.message,
    });
  }
};

// Get all Products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllProductRequest" });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const {data} = await axios.get(
      `${server}/product/get-all-products`,
      config
    );

    dispatch({
      type: "getAllProductSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductFail",
      payload: error.response.data.message,
    });
  }
};
