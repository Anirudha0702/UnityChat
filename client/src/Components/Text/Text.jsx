import { useContext, useRef, useState } from "react";
import { ChatContext } from "../../Providers/ChatContextProvider";
import PropTypes from "prop-types";
import { Auth } from "../../Providers/AuthProvider";
import { IoMdShareAlt } from "react-icons/io";
import { BiSolidShare } from "react-icons/bi";
const Text = ({
  message,
  senderId,
  senderName,
  photoURL,
  date,
  month,
  min,
  _reference,
  hour,
  meridiem,
  isNewDate,
  img,
  video,
  year,
}) => {
  const chatRef = useRef();
  const { dispatch } = useContext(ChatContext);
  const { currentUser } = useContext(Auth);
  const touchRef = useRef(null);
  const [reference, setReference] = useState(null);
  const style = {
    margin: "auto",
    padding: "0.5rem 1rem",
    backgroundColor: "#bdbdbd44",
    width: "fit-content",
    borderRadius: "5px",
  };

  const handleTouchMove = (e) => {
    if (touchRef.current === null) return;
    const touch = e.touches[0];
    const currX = touch.clientX;
    const del = currX - touchRef.current;
    console.log(del);
    if (del > 0) {
      if (del > 100 && reference === null)
        dispatch({
          type: "SET_REFERENCE",
          payload: {
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
            year,
          },
        });
      chatRef.current.style.transform = `translateX(${del}px)`;
      console.log(reference);
    }
  };
  const handleTouchEnd = (e) => {
    chatRef.current.style.transform = `translateX(0px)`;
    setReference(null);
  };
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchRef.current = touch.clientX;
  };
  const handleClick = () => {
    dispatch({
      type: "SET_REFERENCE",
      payload: {
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
        year,
      },
    });
  };

  return (
    <>
      {isNewDate && <span style={style}>{`${date} ${month} ${year}`}</span>}
      {currentUser?.uid === senderId ? (
        <div
          className="chat chat-end  self-end bg-transparent  "
          onTouchMove={(e) => {
            handleTouchMove(e);
          }}
          onTouchEnd={(e) => {
            handleTouchEnd(e);
          }}
          onTouchStart={(e) => {
            handleTouchStart(e);
          }}
          ref={chatRef}
        >
          <div className="chat-image avatar ">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS chat bubble component" src={photoURL} />
            </div>
          </div>
          <div className="chat-header text-white">
            {senderName}
            <time className="text-xs opacity-50 ml-2">
              {hour}:{min} {meridiem}
            </time>
          </div>
          <div className="flex gap-2 items-center group">
            <BiSolidShare
              className="group-hover:visible invisible hidden md:flex"
              onClick={handleClick}
            />
            <div className="chat-bubble  text-wrap cursor-pointer">
              {_reference && (
                <div className="bg-base-100 p-2 rounded-md w-full ">
                  <div className="text-sm text-white">{_reference.senderName}</div>
                  <div className="text-xs">
                    {_reference?.message.length > 30
                      ? _reference?.message.slice(0, 30) + "..."
                      : _reference?.message}
                  </div>
                </div>
              )}
              {message}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="chat chat-start bg-transparent  "
          onTouchMove={(e) => {
            handleTouchMove(e);
          }}
          onTouchEnd={(e) => {
            handleTouchEnd(e);
          }}
          onTouchStart={(e) => {
            handleTouchStart(e);
          }}
          ref={chatRef}
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt={senderName} src={photoURL} />
            </div>
          </div>
          <div className="chat-header text-white">
            {senderName}
            <time className="text-xs opacity-50 ml-2">
              {hour}:{min} {meridiem}
            </time>
          </div>
          <div className="flex gap-2 items-center group w-full ">
            <div className="chat-bubble  text-wrap break-all">
              {_reference && (
                <div className="bg-base-100 p-2 rounded-md w-full ">
                  <div className="text-md text-white">{_reference.senderName}</div>
                  <div className="reply-msg">
                    {message.length > 30
                      ? message.slice(0, 30) + "..."
                      : message}
                  </div>
                </div>
              )}
              {message}
            </div>
            <IoMdShareAlt
              className="group-hover:visible invisible cursor-pointer hidden md:flex"
              onClick={handleClick}
            />
          </div>
        </div>
      )}
    </>
  );
};
Text.propTypes = {
  message: PropTypes.string.isRequired,
  senderId: PropTypes.string.isRequired,
  senderName: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  month: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  _reference: PropTypes.object,
  hour: PropTypes.number.isRequired,
  meridiem: PropTypes.string.isRequired,
  isNewDate: PropTypes.bool.isRequired,
  img: PropTypes.string,
  video: PropTypes.string,
  year: PropTypes.number.isRequired,
  photoURL: PropTypes.string,
};
export default Text;
