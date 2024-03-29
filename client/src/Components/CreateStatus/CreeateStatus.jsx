import {useState } from "react";
import { createPortal } from "react-dom";
import { MdOutlineCancel } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import _getDoc from "../../db/Firebase/getDoc";
import createStatus from "../../db/MongoDB/createStatus";
import { useQueryClient } from "@tanstack/react-query";
import addToStorage from "../../db/Firebase/addToStorage";
import Spin from "../Loaders/Spin/Spin";
const CreateStatus = ({ callback, isText, doc, uid }) => {
  const [statusText,setStatusText] = useState("");
  const isVideo = doc ? doc?.file.type.includes("video") : false;
  const isImage = doc ? doc?.file.type.includes("image") : false;
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);
  const queryClient = useQueryClient();
  async function addStatus() {
    try {
      if (processing) return;
      setProcessing(true);
      const { displayName, followers ,photoURL} = await _getDoc("Users", uid);

      const text = statusText.length > 0;
      let url;

      if (isVideo || isImage) url = await addToStorage(doc.file);
      if (url === null) {
        setError(true);
        setProcessing(false);
        return;
      }
      const res = await createStatus(
        isVideo,
        isImage,
        text,
        statusText,
        isImage ? url : null,
        isVideo ? url : null,
        uid,
        displayName,
        photoURL,
        followers
      );

      if (!res.error) {
        queryClient.setQueryData(["status", uid], (old) => {
          return [res.status, ...old].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        });
        setProcessing(false);
      } else setError(true);
      callback(false);
    } catch (error) {
      console.log(error);
      setProcessing(false);
      setError(true);
    }
  }
  return createPortal(
    <div className="status-wrappe">
      {
        error?<div className="error">Something went wrong  <MdOutlineCancel size={30} color="red" onClick={()=>{setError(false)}}/></div>:null
      }
      <div
        className="close-btn"
        onClick={() => callback(false)}
        disabled={processing}
      >
        <MdOutlineCancel size={50} color="white" />
      </div>
      <div className={`container ${isImage || isVideo?'bg-transparent':''}`}>
        <span className="text-length">{statusText.length}/150</span>
        {
          isText?<>
          <span className="text-field">{statusText}</span>
          </>
          :isImage?(
            <img src={doc.url} alt="status" className="status-image"/>
          ):isVideo?(
            <video src={doc.url}  className="status-image" autoPlay loop></video>
          ):null
        }
          <div className="action-wrapper">
          <input
          className="text-input"
            type="text"
            maxLength="150"
            onChange={(e) => {
              setStatusText(e.target.value);
            }}
            placeholder="Type something..."
          />
          {processing ? (
            <Spin size={40}/>
          ) : (
            <IoSend size={40} color="white" onClick={addStatus} />
          )}
          </div>
      </div>
    </div>,
    document.getElementById("create-status")
  );
};

export default CreateStatus;
