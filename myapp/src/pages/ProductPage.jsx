import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../style/styles";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/Route/ProductCard";
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);
  const {allProducts,isLoading} = useSelector(state=>state.product)


  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts 
      setData(d);
    } else {
      const d =
      allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
  }, [allProducts,categoryData]);

  return (
  <>
     {
    isLoading?(
      <Loader />
    ):(
      <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
        {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {data && data.length===0?
        (
          <h1 className="text-center w-full pb-[100px] text-[20px] font-medium">No Products found</h1>
        ):null
        }
      </div>
    </div>
    )
   }
  </>
  );
};

export default ProductPage;
