import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button } from "@mui/material";
import Loader from "../Layout/Loader";
import { DataGrid } from "@material-ui/data-grid";
import { toast } from "react-toastify";
import { deleteeventShop, getAlleventsShop } from "../../redux/actions/event";
import styles from "../../style/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";

const AllCoupouns = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState(null);
  const [minAmount, setMiniAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleDelete = async(id) => {
    await axios.delete(`${server}/coupon/delete-coupon/${id}`,{withCredentials:true})
    .then((res)=>{
        toast.success(res.data.message)
        window.location.reload()
    })
    .catch((err)=>toast.error(err.response.data.message))
  };

  useEffect(() => {
    const getCoupons = async () => {
      setIsLoading(true);
      await axios
        .get(`${server}/coupon/get-coupons/${seller._id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setIsLoading(false);
          setCoupons(res.data.coupons);
        })
        .catch((err) => {
          setIsLoading(true);
        });
    };
    getCoupons();

  }, [seller._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          value,
          minAmount,
          maxAmount,
          selectedProduct,
          shopId: seller._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        setName("");
        setValue(null);
        setMiniAmount(null);
        setMaxAmount(null);
        setSelectedProduct("");
        setOpen(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setOpen(false);
      });
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "discount", headerName: "Discount", minWidth: 100, flex: 0.6 },
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
 
  coupons &&
  coupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        discount: item.value + " %",
        sold: 10,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              onClick={() => setOpen(true)}
              className={`${styles.button} !w-[180px] !h-[45px] mr-3 mb-4`}
            >
              <span className="text-white text-center">Create Coupon Code</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            autoHeight
            pageSize={10}
            disableSelectionOnClick
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#0000005f] z-[20000] flex items-center justify-center">
              <div className="w-[90%] h-[90vh] 800px:w-[40%] bg-white rounded-md shadow-md p-4">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={25}
                    onClick={() => setOpen(false)}
                    cursor={"pointer"}
                    title="Close"
                  />
                </div>
                <h5 className={`text-center text-[30px] font-Poppins`}>
                  Create Coupon Code
                </h5>
                {/* Create coupon code */}
                <form action="" onSubmit={handleSubmit} className="p-5">
                  <br />
                  <div>
                    <label className="pb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="mt-2 appearance-none block w-full px-3 h-[40px] border border-gray-300 rounded-[3px] placeholder:gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
                      placeholder="Enter your coupon code name..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Discount Percentage{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="Discount"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      required
                      className="mt-2 appearance-none block w-full px-3 h-[40px] border border-gray-300 rounded-[3px] placeholder:gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
                      placeholder="Enter your coupon discount percentage..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Minimum Amount</label>
                    <input
                      type="number"
                      name="Minimum"
                      value={minAmount}
                      onChange={(e) => setMiniAmount(e.target.value)}
                      className="mt-2 appearance-none block w-full px-3 h-[40px] border border-gray-300 rounded-[3px] placeholder:gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
                      placeholder="Enter your coupon minimum amount..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Maximum Amount</label>
                    <input
                      type="number"
                      name="Maximum"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                      className="mt-2 appearance-none block w-full px-3 h-[40px] border border-gray-300 rounded-[3px] placeholder:gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
                      placeholder="Enter your coupon maximum amount..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Selected Product</label>
                    <select
                      name=""
                      id=""
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                      <option value="Choose your selected product">
                        Choose your selected product
                      </option>
                      {products &&
                        products.map((i, index) => (
                          <option value={i.name} key={index}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <div>
                    <input
                      type="submit"
                      value="Create"
                      className="mt-2 bg-black text-white cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupouns;
