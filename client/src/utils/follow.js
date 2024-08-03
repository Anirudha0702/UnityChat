import {db} from './../db/Firebase/firebase';
import { arrayUnion, doc, getDoc, increment, updateDoc} from "firebase/firestore";
/** 
 * @param {will be followed} docId 
 * @param {will be followed by} uid 
 * @returns 
 */
const follow=async(docID,uid)=>{
    if(docID===uid) return new Error("You can't follow yourself");
    if(!docID || !uid) return;
    try {
        const docRef=doc(db,'Users',docID);
        await updateDoc(docRef,{
            followers:arrayUnion(uid),
            followersCount:increment(1)
        });
        const userRef=doc(db,'Users',uid);
        await updateDoc(userRef,{
            following:arrayUnion(docID),
            
        });
        const _doc=await getDoc(docRef);
        return _doc.data();
    } catch (error) {
        console.log(error)
        return error;
    }
}
export default follow;