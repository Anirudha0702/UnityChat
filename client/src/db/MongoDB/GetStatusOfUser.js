import axios from "axios";
const GetStatusOfUSer = async (uid) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_backendAPI}/api/status/ofUser?uid=${uid}`);
        return res.data
    } catch (error) {
        console.log( error)
        return {
        error: error.message,
        };
    }
};
export default GetStatusOfUSer;