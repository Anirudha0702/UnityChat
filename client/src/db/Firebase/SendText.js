import { Timestamp, doc, setDoc } from "firebase/firestore";
import { v4 as uid } from 'uuid';
import { db } from "./firebase";
const SendText = async(text,reference,currentUser) => {
    const MessageId = uid();
    const docRef=doc(db,"Messages",MessageId);
    try {
        await setDoc(docRef, {
            id: MessageId,
            text: text,
            video:null,
            img:null,
            sendByUid: currentUser?.uid,
            sender:currentUser?.displayName,
            senderPhoto:currentUser?.photoURL,
            reference: reference,
            sendAt: Timestamp.now(),
            reactions:[]
        })
    } catch (error) {
        console.log(error.message)
        return new Error("Cannot send message");
    }
};
export default SendText;