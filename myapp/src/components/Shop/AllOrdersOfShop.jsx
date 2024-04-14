import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Button } from "@mui/material";
import Loader from "../Layout/Loader";
import { DataGrid } from "@material-ui/data-grid";
import {toast} from 'react-toastify'
import { getAllOrdersSeller } from "../../redux/actions/order";

const AllOrdersOfShop = () => {
  const { shopOrders,isLoading,message,error } = useSelector((state) => state.orders);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

//   const handleDelete = (id) => {
//     dispatch(deleteProductShop(id))
//   };

  useEffect(() => {
    dispatch(getAllOrdersSeller(seller._id));
    dispatch(getAllProductsShop(seller._id));
    if(error){
      toast.error(error);
      dispatch({type:"clearErrors"})
    }
    if(message){
      toast.success(message);
      dispatch({type:"clearMessages"})

    }
  }, [dispatch, seller._id,error,message]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  shopOrders &&
  shopOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <>{isLoading ? <Loader /> : 
    <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <DataGrid
        rows={row}
        columns={columns}
        autoHeight
        pageSize={10}
        disableSelectionOnClick
         />
    </div>}
    </>
  );
};


export default AllOrdersOfShop