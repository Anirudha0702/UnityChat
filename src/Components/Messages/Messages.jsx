import './Messages.css'
import { useContext, useEffect ,useState,useRef} from 'react'
import Logo from '../../assets/logo.png'
import Text from '../Text/Text'
import { MdEmojiEmotions } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { ChatContext } from '../../Providers/ChatContextProvider'
import { RxCross2 } from "react-icons/rx";
import { onSnapshot,collection,orderBy, query } from 'firebase/firestore'
import { db } from '../../db/Firebase/firebase'
import SendText from '../../db/Firebase/SendText'
import { Auth } from '../../Providers/AuthProvider'
const Messages = () => {
  const [chat, setChat] = useState([])
  const [text, setText] = useState('')
  const prevDate=useRef(0);
  const {data,dispatch}=useContext(ChatContext)
  const {currentUser}=useContext(Auth)
  const ref=useRef(null)
  useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])
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

  const sendText = async(e) => {
    if(text==='') return
    try {
      await SendText(text,data?.reference,currentUser);
      setText('')
      dispatch({type:'RESET_REFERENCE'})
    } catch (error) {
      window.alert(error.message)
    }
  }
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
            const date=_chat.sendAt.toDate()
              const month=date.toLocaleDateString(undefined, { month: 'long' })
              const min=date.getMinutes()
              const hour=date.getHours()>12?date.getHours()-12:date.getHours()
              const meridiem=date.getHours()>12?"PM":"AM"
              const newDate=date.getDate()===prevDate.current?false:true
              const year=date.getFullYear() 
              prevDate.current=date.getDate()
            return (
              <Text key={idx} 
                    message={_chat.text}
                    senderId={_chat.sendByUid}
                    senderName={_chat.sender}
                    photoURL={_chat?.senderPhoto}
                    date={date.getDate()}
                    month={month}
                    min={min}
                    _reference={_chat.reference}
                    hour={hour}
                    meridiem={meridiem}
                    isNewDate={newDate}
                    img={_chat.img||null}
                    video={_chat.video||null}
                    year={year}/>
            )
          })
        }
      </div>
      <div className="dmy" ref={ref}></div>
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
        <input type="text" className="msg-send" onChange={e=>setText(e.target.value)} value={text}onKeyDown={e=>{
          if(e.key=="Enter"){
            sendText(e);
        }
        }}/>
        <button className="send-btn" onClick={e=>sendText(e)}>
          <IoMdSend className="send-icon" />
        </button>
      </div>
    </div>
  )
}

export default Messages