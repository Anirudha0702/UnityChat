import { signInWithPopup } from "firebase/auth";
import {auth,provider,db} from './firebase';

import { Timestamp ,doc, getDoc,setDoc} from "firebase/firestore";
import createUser from "../MongoDB/createUser";
const signin=async()=>{
            try {
                const res= await signInWithPopup(auth, provider);
                const {email,photoURL,displayName,uid}=res.user;
                console.log(email,photoURL,displayName,uid)
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
                        about:'Busy',
                        followers:[],
                        followersCount:0,
                        following:[],
                        memberSince:Timestamp.now(),
                    });
                    await createUser({//mongoDB create user
                        uid,
                        displayName,
                        email,
                        photoURL
                    })
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