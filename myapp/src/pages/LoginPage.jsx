import { useSelector } from "react-redux";
import Login from "../components/Login/Login.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  });

  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
