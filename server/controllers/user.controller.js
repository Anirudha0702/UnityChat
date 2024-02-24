import User from "../models/User.model.js";
export const Register = async (req, res) => {
    try {
        const { uid, displayName, email ,photoURL} = req.body;
        console.log(uid,displayName,email,photoURL)
        const user = new User({ uid, displayName, email ,photoURL});
        await user.save();
        res.status(201).json(user);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};
export const getUserByKey = async (req, res) => {
    try {
        const { key } = req.query;
        const user = await User.find({ $or: [
            { displayName: { $regex:key, $options: "i" } }, 
            { email: { $regex:key, $options: "i" } } 
          ] });
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};