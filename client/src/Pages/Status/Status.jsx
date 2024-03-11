import ShowStatus from "../../Components/ShowStatus/ShowStatus";
import "./Status.css";

import { useContext, useRef, useState } from "react";
import { MdCreate, MdCamera } from "react-icons/md";
import { Auth } from "../../Providers/AuthProvider";
import CreateStatus from "../../Components/CreateStatus/CreeateStatus";
import { GetStatus } from "../../UseHooks";
const Status = () => {
  const [showPortal, setShowPortal] = useState(false);
  const { currentUser } = useContext(Auth);
  const { data: status} = GetStatus(currentUser?.uid);
  const [createStatusPortal, setCreateStatusPortal] = useState(false);
  const text = useRef(false);
  const statusArray = useRef([]);
  const docLink = useRef(null);
  const addStatus = (e) => {
    e.preventDefault();
    docLink.current=null;
    text.current = true;
    setCreateStatusPortal(true);
  };
  const selectDoc=(e)=>{
    e.preventDefault();
    docLink.current=null;
    const ref=e.target.files[0];
    docLink.current={
      file:ref,
      url:URL.createObjectURL(ref)
    }
    text.current = false;
    setCreateStatusPortal(true);
  }
  const showStatus=(statusList)=>{
    statusArray.current=statusList;
    setShowPortal(true);
  }
  return (
    <>
      {showPortal ? <ShowStatus callback={setShowPortal} display={statusArray.current}/> : null}
      {createStatusPortal ? (
        <CreateStatus
          callback={setCreateStatusPortal}
          isText={text.current}
          doc={docLink.current}
          uid={currentUser?.uid}
        />
      ) : null}
      <div className="status-holder">
        <div className="user-status">
          <div className="user-image-wrapper" onClick={()=>{if(status?.length>0)showStatus(status)}}>
            <img src={currentUser?.photoURL} alt="user" className="user-image" />
            {
              status?.length>0?
              <svg width="4.5rem" height="4.5rem" viewBox="0 0 100 100" className="svg">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="rgb(37,211,102)"
                strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 46/status?.length} 2`}
                strokeDashoffset="-2"
              />
            </svg>
            :null
            }
          </div>
          <div className="">
            <h3>My Status</h3>
            <span>12:20</span>
          </div>
        </div>
        <span className="title-bar">Recent Status</span>
        <div className="statuses">No Status</div>
        <span className="title-bar">Viewed Status</span>
        <div className="statuses">No Status</div>
        <MdCreate className="create-status" size={40} onClick={addStatus} />
        <label htmlFor="file"><MdCamera className="create-status cam" size={40} /></label>
        <input type="file" name="file" id="file"  style={{visibility:"hidden"}} onChange={e=>selectDoc(e)}/>

      </div>
    </>
  );
};

export default Status;
