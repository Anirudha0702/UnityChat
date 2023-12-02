import { useEffect, useState } from "react"
import { signOut } from "firebase/auth";
import {auth} from '../../db/Firebase/firebase'
import "./UserInfo.css"
import PropTypes from 'prop-types'
import getDoc from "../../db/Firebase/getDoc";
import PackmanLoader from '../../assets/packmanLoader.gif'
const UserInfo = ({uid}) => {
  const[userInfo, setUserInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const [error,setError] = useState(false)
  useEffect(() => {
    const res= getDoc('Users', uid)
    .then((doc) => {
      setUserInfo(doc); 
      setLoading(false)})
    .catch((error) => {setError(error); setLoading(false)})
  }, [uid])
  const signout = async() => {
    try {
      await signOut(auth);
      // navigate("/")
    } catch (error) {
      window.alert(error.message);
    }
  }
  if(loading) {
    console.log('loading')
    return (
      <div className="user-info">
  
        <div className="load-wrapper">
          <img src={PackmanLoader} alt="Loading" />
        </div>
      </div>)
  }
  return (
    
    <div className="user-info">
      <div className="cover-image-wrapper">
        <img src={userInfo?.coverURL} alt="" className="cover-image" />
      </div>
      <div className="profile-image-wrapper">
        <img src={userInfo?.photoURL} alt="" className="profile-image" referrerPolicy="no-referrer"/>
      </div>
      <h2>{userInfo?.displayName}</h2>
      <h5>{userInfo?.email}</h5>
      <span>{userInfo?.about}</span>
      <div className="follow-section">
        <span className="follower-count">{userInfo?.followersCount}</span>
        <button type="button" className="follow-btn" onClick={signout}>SignOut</button>
      </div>
      <button className="join-chat">Join Global Chat</button>
    </div>
  )
}
UserInfo.propTypes = {
  uid:PropTypes.string.isRequired
}

export default UserInfo