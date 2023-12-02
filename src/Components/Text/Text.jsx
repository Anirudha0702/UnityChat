import { useContext, useRef ,useState} from 'react'
import './Text.css'
import { RiArrowDropDownLine } from "react-icons/ri";
import { ChatContext } from '../../Providers/ChatContextProvider';
import PropTypes from 'prop-types'
const Text = ({chat}) => {
  const chatRef=useRef();
  const {dispatch}=useContext(ChatContext)
  const [showOptions,setShowOptions]=useState(false);
  const touchRef=useRef(null);
  const[reference,setReference]=useState(null)
  const handleTouchMove=(e)=>{
    if(touchRef.current===null) return
    const touch=e.touches[0]
    const currX=touch.clientX
    const del=currX-touchRef.current;
    console.log(del)
    if(del>0){
      if(del>100 && reference===null) dispatch({type:'SET_REFERENCE',payload:chat})
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
    if(type==='reply') dispatch({type:'SET_REFERENCE',payload:chat})
    setShowOptions(!showOptions)

  }
  return (
    <div className="text-wrapper" 
    onTouchMove={(e)=>{handleTouchMove(e)}}
    onTouchEnd={(e)=>{handleTouchEnd(e)}}
    onTouchStart={(e)=>{handleTouchStart(e)}}
    style={{alignSelf:chat.id%2==0?'flex-start':'flex-end'}} ref={chatRef}>
      {
        showOptions && (
          <div className="options">
            <div className="chat-option">Copy</div>
            <div className="chat-option" onClick={e=>{ handleClick('reply')}}>Reply</div>
            <div className="chat-option">React</div>
            <div className="chat-option">Delete</div>
          </div>
        )
      }
        <div className='img-wrapper' style={{order:chat.id%2==0?'':'2'}}><img src="" alt="" className="user-img" /></div>
        <div className="text">
          <div className="name">
            {chat.sendBy}
            <RiArrowDropDownLine className='drop-down' onClick={e=>setShowOptions(!showOptions)}/>
            </div>
            {chat.message}
        </div>
    </div>
  )
}
Text.propTypes={
  chat:PropTypes.object.isRequired
}
export default Text