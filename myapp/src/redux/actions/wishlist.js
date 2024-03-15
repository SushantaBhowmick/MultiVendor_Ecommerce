//add to wishlist
export const addTowishlist = (data) => async (dispatch, getState) => {
    dispatch({
      type: "addToWishlist",
      payload: data,
    });
    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
    return data;
  };
  
  //remove from  cart
  export const removeFromWishlist = (data) => async (dispatch, getState) => {
    dispatch({
      type: "removeFromWishlist",
      payload: data._id,
    });
    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
    return data;
  };
  