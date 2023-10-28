import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import styles from '../../style/styles'
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import { server } from "../../server";


const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState(null);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate()


  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    setAvatar(file)
    // const reader = new FileReader();

    // reader.onload = () => {
    //   if (reader.readyState === 2) {
    //     setAvatar(reader.result);
    //   }
    // };

    // reader.readAsDataURL(e.target.files[0]);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: { "Content-Type": "multipart/form-data" }
    }
    const myForm = new FormData();
    myForm.append("file", avatar);
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);

    axios.post(`${server}/user/create-user`, myForm, config)
      .then((res) =>{
       alert(res.data.message)       
      })
      .catch((err) => console.log(err))
  }

  return (

    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h3 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register as a new user</h3>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form action="" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1">
                <input type="text"
                  name="name"
                  autoComplete="name"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shaddow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}

                />
              </div>

            </div>
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
            <div className="">
              <label htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 rounded-full overflow-hidden">
                  {
                    avatar ?
                      (
                      <img 
                      src={avatar}
                      alt="avatar"
                        className="h-full w-full object-cover rounded-full"
                      />) : (<RxAvatar className="w-8 h-8" />)
                  }
                </span>
                <label htmlFor="file-input"
                  className="ml-5 items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input type="file" name="avatar" id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>

            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >Sign Up</button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Already have a account?</h4>
              <Link to={'/login'}
                className=" text-blue-600 hover:text-blue-500  pl-2"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}


export default SignUp