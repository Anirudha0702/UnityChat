import { doc ,getDoc} from "firebase/firestore";
import { db } from "./firebase";
import delay from "../../utils/delay";
const _getDoc=async (collection,docId)=>{
    await delay();
    const docRef=doc(db,collection,docId)
    try {
        let _doc=await getDoc(docRef);
        if(_doc.exists())return _doc.data()
        else throw new Error('No such document!')
        
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
};
export default _getDoc;