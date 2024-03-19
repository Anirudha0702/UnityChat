import ShowStatus from "../../Components/ShowStatus/ShowStatus";
import { useContext, useRef, useState } from "react";
import { MdCreate, MdCamera } from "react-icons/md";
import { Auth } from "../../Providers/AuthProvider";
import CreateStatus from "../../Components/CreateStatus/CreeateStatus";
import { GetStatus, GetStatusVisibleTo } from "../../UseHooks";
import formatime from "../../utils/formatTime";
const Status = () => {
  const [showPortal, setShowPortal] = useState(false);
  const { currentUser } = useContext(Auth);
  const { data: status } = GetStatus(currentUser?.uid);
  const { data: visibleStatus ,isError,isPending,error} = GetStatusVisibleTo(currentUser?.uid);
  const [createStatusPortal, setCreateStatusPortal] = useState(false);
  const text = useRef(false);
  const statusArray = useRef([]);
  const docLink = useRef(null);
  const addStatus = (e) => {
    e.preventDefault();
    docLink.current = null;
    text.current = true;
    setCreateStatusPortal(true);
  };
  const selectDoc = (e) => {
    e.preventDefault();
    docLink.current = null;
    const ref = e.target.files[0];
    docLink.current = {
      file: ref,
      url: URL.createObjectURL(ref),
    };
    text.current = false;
    setCreateStatusPortal(true);
  };
  const showStatus = (statusList) => {
    statusArray.current = statusList;
    setShowPortal(true);
  };
  return (
    <>
      {showPortal ? (
        <ShowStatus callback={setShowPortal} display={statusArray.current} />
      ) : null}
      {createStatusPortal ? (
        <CreateStatus
          callback={setCreateStatusPortal}
          isText={text.current}
          doc={docLink.current}
          uid={currentUser?.uid}
        />
      ) : null}
      <div className="relative flex flex-col w-full sm:w-80 justify-start  h-[100svh] border-r-2 border-r-white">
        <div className="flex p-2 gap-4 items-center">
          <div
            className="relative w-24 rounded-full aspect-square flex  items-center justify-center"
            onClick={() => {
              if (status?.length > 0) showStatus(status);
            }}
          >
            <img
              src={currentUser?.photoURL}
              alt="user"
              className="absolute h-[95%] w-[95%] rounded-full object-cover"
            />
            {status?.length > 0 ? (
              <svg
                width="6.5rem"
                height="6.5rem"
                viewBox="0 0 100 100"
                className="absolute"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="rgb(37,211,102)"
                  strokeWidth="4"
                  strokeDasharray={`${(2 * Math.PI * 46) / status?.length} 2`}
                  strokeDashoffset="-2"
                />
              </svg>
            ) : null}
          </div>
          <div className="">
            <h2>My Status</h2>
            <span>
              {status?.length > 0
                ? formatime(status[0]?.createdAt)
                : "No updates from you!"}
            </span>
          </div>
        </div>
        <span className="mt-2 text-white pl-2 text-lg">Recent Status</span>
        <div className="pl-4 h-20 flex flex-col">
          {visibleStatus && Object.keys(visibleStatus).map((key, index) => {
            return (
              <div className="flex p-2 gap-4 items-center" key={key}>
                <div
                  className="relative w-12 rounded-full aspect-square flex  items-center justify-center"
                  onClick={() => {
                    showStatus(visibleStatus[key]);
                  }}
                >
                  <img
                    src={visibleStatus[key][0]?.photoURL  }
                    alt="user"
                    className="absolute h-[95%] w-[95%] rounded-full object-cover"
                  />
                  
                    <svg
                      width="3.5rem"
                      height="3.5rem"
                      viewBox="0 0 100 100"
                      className="absolute"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        stroke="rgb(37,211,102)"
                        strokeWidth="4"
                        strokeDasharray={`${
                          (2 * Math.PI * 46) / visibleStatus[key].length
                        } 2`}
                        strokeDashoffset="-2"
                      />
                    </svg>
                </div>
                <div className="">
                  <h2>{visibleStatus[key][0]?.displayName} </h2>
                  <span>
                      {formatime(visibleStatus[key][0]?.createdAt)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <MdCreate
          className="absolute bottom-20 right-8 cursor-pointer p-2 rounded-[5px] bg-slate-800"
          size={40}
          onClick={addStatus}
        />
        <label htmlFor="file">
          <MdCamera
            className="absolute bottom-8 right-8 cursor-pointer p-2 rounded-[5px] bg-green-400 text-slate-800"
            size={40}
          />
        </label>
        <input
          type="file"
          name="file"
          id="file"
          style={{ visibility: "hidden" }}
          onChange={(e) => selectDoc(e)}
        />
      </div>
    </>
  );
};

export default Status;
