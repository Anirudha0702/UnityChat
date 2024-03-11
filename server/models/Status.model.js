import mongoose from 'mongoose';
const { Schema } = mongoose;
const statusSchema = new Schema({
    sid:{
        type:String,
        required:true,
        unique:true
    },
    isVideo:{
        type:Boolean,
        default:false
    },
    isImage:{
        type:Boolean,
        default:false
    },
    isText:{
        type:Boolean,
        default:false
    },
    text:{
        type:String,
        default:""
    },
    image:{
        type:String,
        default:""
    },
    video:{
        type:String,
        default:""
    },
    uid:{
        type:String,
        required:true,
    },
    displayName : {
        type: String,
        required : true,
        trim : true
    },
    seenBy : {
        type: Array
    },
    visibleTo : {
        type: Array
    }
},{timestamps : true});
export default mongoose.model("Status",statusSchema)        