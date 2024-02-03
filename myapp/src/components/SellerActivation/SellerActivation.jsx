import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { server } from '../../server'

const SellerActivation = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
          await axios.post(`${server}/seller/activation`, { activation_token })
          .then((res)=>{
            console.log(res)
          }).catch((err)=>{
            console.log(err)
          setError(true)
        });
      }
      activationEmail();
    }
  }, [])

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center"
      }}
    >
      {
        error ? (
          <p>Your token is expired!</p>
        ) : (
          <h1>
            Your Account has Created Successfully!
          </h1>
        )
      }
    </div>
  )
}


export default SellerActivation