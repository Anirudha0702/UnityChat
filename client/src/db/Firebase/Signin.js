import { signInWithPopup } from "firebase/auth";
import {auth,provider,db} from './firebase';
import { Timestamp ,doc, getDoc,setDoc} from "firebase/firestore";
const signin=async()=>{
            try {
                const res= await signInWithPopup(auth, provider);
                const {email,photoURL,displayName,uid}=res.user;
                const docRef=doc(db,'Users',uid);
                const _doc=await getDoc(docRef);
                console.log(_doc.exists())
                if(!_doc.exists()){
                    await setDoc(docRef,{
                        uid,
                        displayName,
                        email,
                        photoURL,
                        coverURL:'https://w0.peakpx.com/wallpaper/1005/796/HD-wallpaper-one-piece-monkeydluffy-onepiece.jpg',
                        about:"Hi there! I'm new to this chat app and excited to connect with interesting people. I enjoy discussing a wide range of topics, from technology and science to art and literature.",
                        followers:[],
                        followersCount:0,
                        following:[],
                        memberSince:Timestamp.now(),
                    });
                
                }
                return {
                    isError:false,
                    infos:{
                        email,
                        photoURL,
                        displayName,
                        uid
                    }
                };
            } catch (error) {
                console.log(error.message)
                return {isError:true,error:error.message};
            }
           
}
export default signin;