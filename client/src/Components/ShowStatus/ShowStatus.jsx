
import { MdOutlineCancel } from "react-icons/md";
import { createPortal } from "react-dom";
import { FaEye } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
const Status = ({ callback, display }) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    // will share the status seen by 
  }, [idx]);
  const changeStatus = (e) => {
    if (e.target.classList.contains("fa-angle-right")) {
      if (idx === display.length - 1) {
        setIdx(0);
      } else {
        setIdx(idx + 1);
      }
    } else {
      if (idx === 0) {
        setIdx(display.length - 1);
      } else {
        setIdx(idx - 1);
      }
    }
  };
  return (
    <div className="portal-wrapper">
      <div className="close-btn" onClick={() => callback(false)}>
        <MdOutlineCancel size={50} color="white" />
      </div>
      <FaAngleLeft onClick={(e) => changeStatus(e)} />
      <div className="all-status">
        {
          <div
            className={`container ${
              display[idx].isImage || display[idx].isVideo
                ? "bg-transparent"
                : ""
            }`}
          >
            {!display[idx].isImage && !display[idx].isVideo ? (
              <>
                <span className="text-field">{display[idx].text}</span>
              </>
            ) : null}
            {display[idx].isImage ? (
              <img
                src={display[idx].image}
                alt="status"
                className="status-image "
              />
            ) : null}
            {display[idx].isVideo ? (
              <video
                src={display[idx].video}
                className="status-image show"
                autoPlay
                loop
              ></video>
            ) : null}
            <div className="seen-by">
              <FaEye size={20} color="white" />
              <span className="text-field">{display[idx].seenBy.length}</span>
              {/* <span className="text-field">{display[idx].statusText}</span> */}
            </div>
          </div>
        }
      </div>
      <FaAngleRight
        onClick={(e) => changeStatus(e)}
        className="fa-angle-right"
      />
    </div>
  );
};
const ShowStatus = ({ callback, display }) => {
  return createPortal(
    <Status callback={callback} display={display} />,
    document.getElementById("show-status")
  );
};

ShowStatus.propTypes = {
  callback: PropTypes.func.isRequired,
  display: PropTypes.array.isRequired,
};
export default ShowStatus;
