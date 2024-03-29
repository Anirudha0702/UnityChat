
import axios from "axios";
const getStatusVisibleTo=async(uid)=>{
    try{
        const res=await axios.get(`${import.meta.env.VITE_backendAPI}/api/status/visibleto/${uid}`);
        console.log(res.data)
        return res.data
    }catch(error){
        console.log(error)
        return {
            error: error.message,
        };
    }
}
export default getStatusVisibleTo;