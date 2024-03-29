import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from '../../style/styles'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from '../../server'
import { toast } from "react-toastify";

const ShopLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${server}/seller/login`,
        { email, password },
        { withCredentials: true });
      toast.success(res.data.message);
    //   navigate("/")
      window.location.reload(true);
    } catch (error) {
        console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (

    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h3 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to your Shop</h3>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form action="" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="mt-1">
                <input type="email"
                  name="email"
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shaddow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}

                />
              </div>

            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative">
                <input type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  className=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shaddow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {
                  visible ? (
                    <AiOutlineEye
                      className=" absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className=" absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )
                }
              </div>

            </div>
            <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input type="checkbox" name="remember-me" id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >Remember Me</label>
              </div>
              <div className="text-sm">
                <Link to={'/forgot/password'}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot Your password
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >Login</button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Not have any account?</h4>
              <Link to={'/shop-create'}
                className=" text-blue-600 hover:text-blue-500  pl-2"
              >
                Sign Up
              </Link>
            </div>
          </form>
         
        </div>
      </div>
    </div>

  )
}

export default ShopLogin