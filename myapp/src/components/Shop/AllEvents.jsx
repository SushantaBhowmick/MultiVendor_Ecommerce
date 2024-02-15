import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button } from "@mui/material";
import Loader from "../Layout/Loader";
import { DataGrid } from "@material-ui/data-grid";
import {toast} from 'react-toastify'
import { deleteeventShop, getAlleventsShop } from "../../redux/actions/event";

const AllEvents = () => {
  const { events, isLoading,message,error } = useSelector((state) => state.event);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteeventShop(id))
  };

  useEffect(() => {
    dispatch(getAlleventsShop(seller._id));
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
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
    { field: "stock", headerName: "Stock", minWidth: 80, flex: 0.5,type:"number" },
    { field: "sold", headerName: "Sold Out", minWidth: 130, flex: 0.6,type:"number" },
    {
      field: "preview",
      headerName: "",
      minWidth: 100,
      flex: 0.8,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        // const d = params.row.name;
        // const product_name = d.replace(/\s+g,"-");
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} color="green" />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "delete",
      headerName: "",
      minWidth: 120,
      flex: 0.8,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
              <Button onClick={() => handleDelete(params.id)}>
                <AiOutlineDelete size={20} color="red" />
              </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  events &&
  events.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        stock: item.stock,
        sold: 10,
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

export default AllEvents