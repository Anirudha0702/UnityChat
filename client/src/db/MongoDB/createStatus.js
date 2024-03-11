import axios from "axios";
import { v4 as uid } from "uuid";
const createStatus = async (
  isVideo,
  isImage,
  isText,
  text = "",
  image = null,
  video = null,
  _uid,
  displayName,
  visibleTo
) => {
  const sid = uid();
  const status = {
    sid,
    isVideo,
    isImage,
    isText,
    text,
    image,
    video,
    uid:_uid,
    displayName,
    seenBy:[],
    visibleTo,
  };
  console.log(status)
    try {
        const res = await axios.post(`${import.meta.env.VITE_backendAPI}/api/status/create`,status);
        return {status:res.data, error:null};
    } catch (error) {
        return {status:null, error:error};
    }
};
export default createStatus;
