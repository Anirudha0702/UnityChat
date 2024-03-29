import { useContext, useEffect, useState, useRef } from "react";
import Text from "../Text/Text";
import { MdEmojiEmotions } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { ChatContext } from "../../Providers/ChatContextProvider";
import { RxCross2 } from "react-icons/rx";
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../../db/Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { db } from "../../db/Firebase/firebase";
import SendText from "../../db/Firebase/SendText";
import { Auth } from "../../Providers/AuthProvider";




const EmojiPicker = ({onEmojiSelect,message}) => {
  const emoji = JSON.parse(localStorage.getItem('emojis'));
  const addEmojitoText = (emoji) => {
    console.log(message+emoji)
    onEmojiSelect(message=>message+emoji);
  }
  return (
    <div className='absolute bottom-16 rounded-md h-60 aspect-square p-2 overflow-y-scroll flex justify-center items-center gap-2 bg-slate-800 flex-wrap'>
        {
            emoji && emoji.map((item, indx) => (
                <span 
                key={indx} 
                className='cursor-pointer w-6 aspect-square select-none' 
                onClick={()=>addEmojitoText(item.character)}>
                  {item.character}
                </span>
            ))
        }
    </div>
  )
}






const Messages = () => {
  const [chat, setChat] = useState([]);
  const [text, setText] = useState("");
  const navigate=useNavigate()
  const prevDate = useRef(0);
  const { data, dispatch } = useContext(ChatContext);
  const [pickerOn, setPickerOn] = useState(false);
  const { currentUser } = useContext(Auth);
  const ref = useRef(null);

  useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);
  useEffect(() => {
    const _query = query(collection(db, "Messages"), orderBy("sendAt"));
    onSnapshot(_query, (snapshot) => {
      const chats = [];
      snapshot.forEach((doc) => {
        chats.push(doc.data());
      });
      setChat(chats);
    });
  }, []);
  const signout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      window.alert(error.message);
    }
  };
  const sendText = async (e) => {
    if (text === "") return;
    try {
      await SendText(text, data?.reference, currentUser);
      setText("");
      dispatch({ type: "RESET_REFERENCE" });
    } catch (error) {
      window.alert(error.message);
    }
  };
  return (
    <div className="h-[100svh]  grow relative overflow-x-hidden">
      <div className="navbar bg-base-100 absolute top-0 border-b-2 border-slate-500 z-10">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">UnityChat</a>
        </div>

        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User" src={currentUser?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li onClick={signout} className="bg-base-400">
              Logout
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16 h-[calc(100svh_-_8rem)]  relative overflow-y-scroll flex flex-col p-2 gap-2 overflow-x-hidden">
        {chat.map((_chat, idx) => {
          const date = _chat.sendAt.toDate();
          const month = date.toLocaleDateString(undefined, { month: "long" });
          const min = date.getMinutes();
          const hour =
            date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
          const meridiem = date.getHours() > 12 ? "PM" : "AM";
          const newDate = date.getDate() === prevDate.current ? false : true;
          const year = date.getFullYear();
          prevDate.current = date.getDate();
          return (
            <Text
              key={idx}
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
              img={_chat.img || null}
              video={_chat.video || null}
              year={year}
            />
          );
        })}
        <div className="dmy" ref={ref}></div>
      </div>
      <div className="relative h-16  flex items-center gap-2 px-2 ">
        {data?.reference && (
          <div className="absolute -top-20 h-20  w-[90%] flex justify-between p-2 bg-base-300 rounded-md">
            <div className="bg-base-100 p-2 rounded-md w-full ">
              <div className="reply-name">{data.reference.senderName}</div>
              <div className="reply-msg">
                {data.reference.message.length > 50
                  ? data.reference.message.slice(0, 50) + "..."
                  : data.reference.message}
              </div>
            </div>
            <RxCross2
              onClick={(e) => {
                dispatch({ type: "RESET_REFERENCE" });
              }}
              className="cross"
            />
          </div>
        )}
        <MdEmojiEmotions className="" size={40}  onClick={() => setPickerOn(!pickerOn)}/>
        {pickerOn && (
          <EmojiPicker onEmojiSelect={setText} message={text}/>
        )}
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered  grow"
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              sendText(e);
            }
          }}
        />

        <button className="send-btn" onClick={(e) => sendText(e)}>
          <IoMdSend className="send-icon" size={40} />
        </button>
      </div>
    </div>
  );
};

export default Messages;
