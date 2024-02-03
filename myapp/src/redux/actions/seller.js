import axios from "axios";
import {server} from "../../server"
//load User
export const loadSeller = ()=>async(dispatch)=>{
    try {
        dispatch({type:"LoadSellerRequest"});
        const {data}= await axios.get(`${server}/seller/getSeller`,{
            withCredentials:true,
        })
        dispatch({
            type:"LoadSellerSuccess",
            payload:data.seller,
        });
    } catch (error) {
        dispatch({
            type:"LoadSellerFail",
            payload:error.response.data.message,
        });
        
    }
}