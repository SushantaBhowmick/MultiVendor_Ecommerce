import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createProduct } from "../../redux/actions/product";
import {toast} from 'react-toastify'

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const { isLoading,success,error } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDicountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  const today = new Date().toISOString().slice(0,10);
  const minEndDate = startDate? new Date(startDate.getTime()+3*24*60*60*1000).toISOString().slice(0,10):"";
  
  const handleStartDateChange=(e)=>{
    const startDate = new Date(e.target.value)
    const minEndDate = new Date(startDate.getTime()+3*24*60*60*1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate.toISOString().slice(0,10);
  }
  
  const handleEndDateChange=(e)=>{
    const endDate = new Date(e.target.value)
   setEndDate(endDate)
  }

  useEffect(() => {
    if(error){
      toast.error(error)
    }
    if(success){
      toast.success("Product created Successfully");
      navigate('/dashboard');
      window.location.reload();

    }
  }, [error,success,navigate,dispatch])
  
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();
    images.forEach((image)=>{
      newForm.append("images",image);
    })
    newForm.append("name",name)
    newForm.append("description",description)
    newForm.append("category",category)
    newForm.append("tags",tags)
    newForm.append("originalPrice",originalPrice)
    newForm.append("discountPrice",discountPrice)
    newForm.append("stock",stock);
    newForm.append("shopId",seller._id);

    dispatch(createProduct(newForm))
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages((prevImages)=>[...prevImages,...files])
  };

  return (
    <div className="bg-white w-[90%] 800px:w-[50%] shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Event</h5>

      {/* create event form */}
      <form action="" onSubmit={handleSubmit}>
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
            placeholder="Enter your event product name..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your event product description..."
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name=""
            id=""
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a event category">Choose a event category</option>
            {categoriesData &&
              categoriesData.map((i, index) => (
                <option value={i.title} key={index}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-2 appearance-none block w-full px-3 h-[40px] border border-gray-300 rounded-[3px] placeholder:gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
            placeholder="Enter your event product tags..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Original Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className="mt-2 appearance-none block w-full px-3 h-[40px] border border-gray-300 rounded-[3px] placeholder:gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
            placeholder="Enter your event product original price..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="discountPrice"
            value={discountPrice}
            onChange={(e) => setDicountPrice(e.target.value)}
            required
            className="mt-2 appearance-none block w-full px-3 h-[40px] border border-gray-300 rounded-[3px] placeholder:gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
            placeholder="Enter your event product price with discount..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            className="mt-2 appearance-none block w-full px-3 h-[40px] border border-gray-300 rounded-[3px] placeholder:gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
            placeholder="Enter your event product stock..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Event Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="start-date"
            name="stock"
            value={startDate?startDate.toISOString().slice(0,10):""}
            onChange={(e) =>handleStartDateChange(e)}
            required
            min={today}
            className="mt-2 appearance-none block w-full px-3 h-[40px] border border-gray-300 rounded-[3px] placeholder:gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
            placeholder="Enter your event product stock..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Event End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="end-date"
            name="stock"
            value={endDate?endDate.toISOString().slice(0,10):""}
            onChange={(e) =>handleStartDateChange(e)}
            required
            min={minEndDate}
            className="mt-2 appearance-none block w-full px-3 h-[40px] border border-gray-300 rounded-[3px] placeholder:gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
            placeholder="Enter your event product stock..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
         <div className="flex flex-wrap items-center">
         <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
          {
            images && images.map((i)=>(
                <img src={URL.createObjectURL(i)} key={i} alt=""
                className="h-[120px] w-[120px] m-2 object-cover flex"
                 />
            ))
          }
         </div>
        </div>
        <div>
        <input
              type="submit"
              value="Create"
              className="mt-2 bg-black text-white cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>
      </form>
    </div>
  );
};

export default CreateEvent