import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    uid:{
        type:String,
        required:true,
        unique:true
    },
    displayName : {
        type: String,
        required : true,
        trim : true
    },
    email : {
        type: String,
        required : true,
        unique : true
    },
    photoURL : {
        type: String,
        required : true
    },     
}, {
    timestamps : true
});

export default mongoose.model("User",userSchema)
