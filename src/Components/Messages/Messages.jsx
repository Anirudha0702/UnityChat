import './Messages.css'
import {chats} from '../../Data/Dummy'
import { useContext, useEffect ,useState} from 'react'
import Logo from '../../assets/logo.png'
import Text from '../Text/Text'
import { MdEmojiEmotions } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { ChatContext } from '../../Providers/ChatContextProvider'
import { RxCross2 } from "react-icons/rx";
import { onSnapshot,collection,orderBy, query } from 'firebase/firestore'
import { db } from '../../db/Firebase/firebase'
const Messages = () => {
  const [chat, setChat] = useState([])
  const {data,dispatch}=useContext(ChatContext)
  useEffect(() => {
    const _query=query(collection(db, 'Messages'), orderBy('sendAt'))
    const unSub = onSnapshot(_query, (snapshot) => {
      const chats=[]
      snapshot.docs.forEach((doc) => {
      chats.push(doc.data())
      });
      setChat(chats)
    });

    return () => {
      unSub();
    };
  }, []); 
  return (
    <div className="messages-box">
      <nav className="message-nav">
        <div className="logo-wrapper">
          <img src={Logo} alt="" className="logo" />
        </div>
      </nav>
      <div className="message-wrapper">
        {
          chat.map((_chat,idx) => {
            return (
              <Text key={idx} chat={_chat}/>
            )
          })
        }
      </div>
      <div className="sending-options">
        {
          data?.reference && (
            <div className="reply">
              <div className="reply-text">
                <div className="reply-name">{data.reference.sendBy}</div>
                <div className="reply-msg">{
                  data.reference.message.length > 50 ? data.reference.message.slice(0,50) + '...' : data.reference.message
                }</div>
              </div>
              <RxCross2 onClick={(e)=>{dispatch({type:'RESET_REFERENCE'})}} className='cross'/>
            </div>
          )
        }
        <MdEmojiEmotions className="emoji-icon" />
        <input type="text" className="msg-send" />
        <button className="send-btn">
          <IoMdSend className="send-icon" />
        </button>
      </div>
    </div>
  )
}

export default Messages