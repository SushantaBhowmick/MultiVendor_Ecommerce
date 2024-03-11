import React, { useState } from "react";
import { backend_url } from "../../server";
import { useSelector } from "react-redux";
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import Button from "@mui/material/Button";
import styles from "../../style/styles";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { MdOutlineTrackChanges } from "react-icons/md";

const ProfileContnet = ({ active, setActive }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState();
  const [zip, setZip] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };



  return (
    <div className="w-full">
      {/* Profile  */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backend_url}${user?.avatar}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt="dp"
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  //   onChange={handleImage}
                />
                <label htmlFor="image" className="cursor-pointer">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form action="" onSubmit={handleSubmit} area-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="blcok pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="w-[100%] 800px:w-[50%]">
                  <label className="blcok pb-2">Email Address</label>
                  <input
                    type="email"
                    className={`${styles.input} !w-[95%] mb-2 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="blcok pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="w-[100%] 800px:w-[50%]">
                  <label className="blcok pb-2">Zip Code</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="blcok pb-2">Address 1</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>

                <div className="w-[100%] 800px:w-[50%]">
                  <label className="blcok pb-2">Address 2</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%]`}
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>
              <input
                type="submit"
                value={"Update"}
                required
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              />
            </form>
          </div>
        </>
      )}

      {/* order  */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}
      {/* refund  */}
      {active === 3 && (
        <div>
          <AllRefunds />
        </div>
      )}
      {/* Track order  */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}
      {/* Payment Method */}
      {active === 6  && (
        <div>
          <PaymentMethod />
        </div>
      )}
      {/* Payment Method  */}
      {active === 7  && (
        <div>
          <Address />
        </div>
      )}

    </div>
  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: "7463hv658965dfdfgdf332",
      orderItems: [
        { name: "Iphone 14 pro max" },
    ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

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
            <Link to={`/user/order/${params.id}`}>
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

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefunds=()=>{

    const orders = [
        {
          _id: "7463hv658965dfdfgdf332",
          orderItems: [
            { name: "Iphone 14 pro max" },
        ],
          totalPrice: 120,
          orderStatus: "Processing",
        },
      ];
    
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
                <Link to={`/user/order/${params.id}`}>
                  <Button>
                    <AiOutlineArrowRight size={20} />
                  </Button>
                </Link>
              </>
            );
          },
        },
      ];

      const row=[];
      orders &&
      orders.forEach((item) => {
        row.push({
          id: item._id,
          itemsQty: item.orderItems.length,
          total: "US$ " + item.totalPrice,
          status: item.orderStatus,
        });
      });
    

    return(
        <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
    )
}

const TrackOrder=()=>{

    const orders = [
        {
          _id: "7463hv658965dfdfgdf332",
          orderItems: [
            { name: "Iphone 14 pro max" },
        ],
          totalPrice: 120,
          orderStatus: "Processing",
        },
      ];
    
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
          minWidth: 130,
          headerName: "",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/order/${params.id}`}>
                  <Button>
                    <MdOutlineTrackChanges size={20} title="Track order" />
                  </Button>
                </Link>
              </>
            );
          },
        },
      ];

      const row=[];
      orders &&
      orders.forEach((item) => {
        row.push({
          id: item._id,
          itemsQty: item.orderItems.length,
          total: "US$ " + item.totalPrice,
          status: item.orderStatus,
        });
      });
    

    return(
        <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
    )
}

const PaymentMethod=()=>{

    return(
        <div className="w-full px-5">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-[25px] font-[600] text-[#000000ba]">
                Payment Methods
                </h1>
                <div className={`${styles.button} !rounded-md`}>
                    <span className="text-[#fff]">Add New</span>
                </div>
            </div>
            <br />
            <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
                <div className="flex items-center">
                    <img src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg" alt="visa card" />
                    <h5 className="font-[600] pl-5">Sushanta Bhowmick</h5>
                </div>
                <div className="flex pl-8 items-center">
                    <h6>123 **** *** ****</h6>
                    <h5 className="pl-6">08/2024</h5>
                </div>
                <div className="flex items-center justify-between pl-8">
                    <AiOutlineDelete size={25} className="cursor-pointer" color="red"/>
                </div>
            </div>
        </div>
    )
}

const Address=()=>{
    return(
        <div className="w-full px-5">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-[25px] font-[600] text-[#000000ba]">
                My Addresses
                </h1>
                <div className={`${styles.button} !rounded-md`}>
                    <span className="text-[#fff]">Add New</span>
                </div>
            </div>
            <br />
            <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
                <div className="flex items-center">
                    <h5 className="font-[600] pl-5">Default</h5>
                </div>
                <div className="flex pl-8 items-center">
                    <h6>171 Bhagabanpur,Shyampur,Howrah,WB</h6>
                </div>
                <div className="flex pl-8 items-center">
                    <h6>8017052720</h6>
                </div>
                <div className="flex items-center justify-between pl-8">
                    <AiOutlineDelete size={25} className="cursor-pointer" color="red"/>
                </div>
            </div>
        </div>
    )
}



export default ProfileContnet;
