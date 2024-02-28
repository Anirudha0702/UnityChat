import {db} from './../db/Firebase/firebase';
import {arrayRemove, doc,getDoc,increment,updateDoc} from 'firebase/firestore';
/** 
 * @param {will be unfollowed} docId 
 * @param {will be unfollowed by} uid 
 * @returns 
 */

const unFollow= async (docId,uid) => {
    console.log("in unfollow")
    if(docId===uid) return new Error("You can't unfollow yourself");
    if(!docId || !uid) return;
    try {
        const docRef=doc(db,'Users',docId);
        await updateDoc(docRef,{
            followers:arrayRemove(uid),
            followersCount:increment(-1)
        });
        const userRef=doc(db,'Users',uid);
        await updateDoc(userRef,{
            following:arrayRemove(docId),
        });
        const _doc=await getDoc(docRef);
        return _doc.data();
    } catch (error) {
        console.log(error)
        return error;
    }
}
export default unFollow;