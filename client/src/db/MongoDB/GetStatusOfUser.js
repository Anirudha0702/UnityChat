import axios from "axios";
const GetStatusOfUSer = async (uid) => {
    console.log(`${import.meta.env.VITE_backendAPI}/api/status/ofUser?uid=${uid}`)
    try {
        const res = await axios.get(`${import.meta.env.VITE_backendAPI}/api/status/ofUser?uid=${uid}`);
        console.log(res)
        return res.data
    } catch (error) {
        console.log( error)
        return {
        error: error.message,
        };
    }
};
export default GetStatusOfUSer;