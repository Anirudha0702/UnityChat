import axios from "axios";
const createUser = async (user) => {
    console.log(import.meta.env.VITE_backendAPI+"/api/users/register")
    try {
        const res = await axios.post(import.meta.env.VITE_backendAPI+"/api/users/register", user);
        console.log(res)
        return {
        isError: false,
        infos: res.data,
        };
    } catch (error) {
        console.log( error)
        return {
        isError: true,
        error: error.message,
        };
    }
};
export default createUser;