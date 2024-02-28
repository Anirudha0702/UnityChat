import { useContext, useRef ,useState} from 'react'
import './Text.css'

// import { RiArrowDropDownLine } from "react-icons/ri";
import { ChatContext } from '../../Providers/ChatContextProvider';
import PropTypes from 'prop-types'
import { Auth } from '../../Providers/AuthProvider';
const Text = ({message,senderId,senderName,photoURL,date,month,min,_reference,hour,meridiem,isNewDate,img,video,year}) => {
console.log(photoURL)
  const chatRef=useRef();
  const {dispatch}=useContext(ChatContext)
  const {currentUser}=useContext(Auth)
  const [showOptions,setShowOptions]=useState(false);
  const touchRef=useRef(null);
  const[reference,setReference]=useState(null)
  const style={
    margin:"auto",
    padding:"0.5rem 1rem",
    backgroundColor:"#bdbdbd44",
    width:"fit-content",
    borderRadius:"5px"
}
  const handleTouchMove=(e)=>{
    if(touchRef.current===null) return
    const touch=e.touches[0]
    const currX=touch.clientX
    const del=currX-touchRef.current;
    console.log(del)
    if(del>0){
      if(del>100 && reference===null) dispatch({type:'SET_REFERENCE',
      payload:{
        message,
        senderId,
        senderName,
        photoURL,
        month,
        min,
        hour,
        meridiem,
        img,
        video,
        year
      }})
      chatRef.current.style.transform=`translateX(${del}px)`
      console.log(reference)
    }
  }
  const handleTouchEnd=(e)=>{
    chatRef.current.style.transform=`translateX(0px)`
    setReference(null)
  }
  const handleTouchStart=(e)=>{
    const touch=e.touches[0]
    touchRef.current=touch.clientX
  }
  const handleClick=(type)=>{
    if(type==='reply') dispatch({type:'SET_REFERENCE',payload:{
      message,
      senderId,
      senderName,
      photoURL,
      month,
      min,
      hour,
      meridiem,
      img,
      video,
      year
    }})
    setShowOptions(!showOptions)

  }
  if(message==null){return <h5
    style={
        {
            textAlign:"center",
            color:"grey",
            padding:"2rem",
            borderRadius:"100px"
        
        }
    }
>No chats,start conversation</h5>}
  return (
    <>
    {
            isNewDate && 
            (
                <span style={style}>{`${date} ${month} ${year}`}</span>
            )

        }
     <div  
    onTouchMove={(e)=>{handleTouchMove(e)}}
    onTouchEnd={(e)=>{handleTouchEnd(e)}}
    onTouchStart={(e)=>{handleTouchStart(e)}}
    className= {`text-wrapper ${senderId===currentUser?.uid?'text-wrapper-sender':'text-wrapper-receiver'}`}ref={chatRef}>
      <div className="user-img-wrapper" style={{
          display:senderId===currentUser?.uid?'none':''
        }}>
          
          <img src={photoURL} alt="" referrerPolicy='no-referrer'/>
        </div>
      
      <div className={`current-text ${senderId===currentUser?.uid?'_sender':'_receiver'}`}>
        <span
        style={{
         display:senderId===currentUser?.uid?'none':''
       }}>{senderName}</span>
      {
        _reference && (
          <div className={`_reply ${senderId===currentUser?.uid?'reply-sender':'reply-receiver'}`}>
            <div className="_reply-text">
              <span>{_reference?.senderName}</span>
              <p>{_reference?.message}</p>
            </div>
          </div>
        )
      }
        <div className={`text ${senderId===currentUser?.uid?'text-sender':'text-receiver'}`} >
            
          <p>{message}</p>
      </div>
      </div>
      <div className="text-time">
            <span>{hour}:{min} {meridiem}</span>
          </div>
    </div>
    </>
  )
}
Text.propTypes={
  message:PropTypes.string.isRequired,
  senderId:PropTypes.string.isRequired,
  senderName:PropTypes.string.isRequired,
  date:PropTypes.number.isRequired,
  month:PropTypes.string.isRequired,
  min:PropTypes.number.isRequired,
  _reference:PropTypes.object,
  hour:PropTypes.number.isRequired,
  meridiem:PropTypes.string.isRequired,
  isNewDate:PropTypes.bool.isRequired,
  img:PropTypes.string,
  video:PropTypes.string,
  year:PropTypes.number.isRequired
}
export default Text