import React from "react";
import styles from "../../style/styles";
import ShopInfo from "../../components/Shop/ShopInfo.jsx";
import ShopProfileData from "../../components/Shop/ShopProfileData.jsx";
const ShopHomePage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="full flex py-10 justify-between">
        <div className="w-[25%] rounded-[4px] shadow-sm bg-[#fff] overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
          <ShopInfo isOwner={true} />
        </div>
        <div className="w-[72%] rounded-[4px]">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
