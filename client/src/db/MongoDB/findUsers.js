import axios from "axios";
const FindUsers = async (key) => {
    try {
        const res = await axios.get(` ${import.meta.env.VITE_backendAPI}/api/users/find?key=${key}`);
        console.log(res)
        return res.data
    } catch (error) {
        console.log( error)
        return {
        error: error.message,
        };
    }
};
export default FindUsers;