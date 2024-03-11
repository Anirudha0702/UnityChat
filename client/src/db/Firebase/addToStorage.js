import { ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import {storage} from './firebase';
import { v4 as uid } from "uuid";
const addToStorage = async (file) => {

    const file_name=new Date().getTime()+uid();
    let url;
    console.log(file_name)
    const meta_data = {
        contentType: '*'
    };
    const storage_ref =ref(storage,`status/images/${file_name}`);
    const upload = await uploadBytesResumable(storage_ref,file,meta_data);
    if(upload.error){
        console.log(upload.error);
        return null;
    }
    url=await getDownloadURL(upload.ref);
    return url;
};
export default addToStorage;