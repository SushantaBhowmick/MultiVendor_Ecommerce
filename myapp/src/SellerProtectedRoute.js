import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({ children }) => {
  // const navigate=useNavigate()
  const {isLoading,isSeller,seller} = useSelector(state=>state.seller)
  console.log(isSeller,seller)
    // if(isLoading===false){
        if (!isSeller) {
            return <Navigate to={`/shop-login`} replace />;
          }
          return children;
    // }
};



export default SellerProtectedRoute