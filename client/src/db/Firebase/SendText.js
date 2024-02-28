import { Timestamp, doc, setDoc } from "firebase/firestore";
import { v4 as uid } from 'uuid';
import { db } from "./firebase";
const SendText = async(text,reference,currentUser) => {
    const MessageId = uid();
    console.log(reference)
    const docRef=doc(db,"Messages",MessageId);
    try {
        await setDoc(docRef, {
            id: MessageId,
            text: text,
            sendByUid: currentUser?.uid,
            sender:currentUser?.displayName,
            senderPhoto:currentUser?.photoURL,
            reference: reference,
            sendAt: Timestamp.now(),
            img:null,
            video:null,
            reactions:[]
        })
    } catch (error) {
        return new Error("Cannot send message");
    }
};
export default SendText;