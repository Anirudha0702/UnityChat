import { useContext, useEffect, useState } from "react"
import { signOut } from "firebase/auth";
import {auth} from '../../db/Firebase/firebase'
import "./UserInfo.css"
import PackmanLoader from '../../assets/packmanLoader.gif'
import { Auth } from "../../Providers/AuthProvider";
import { GetUser ,Search} from "../../UseHooks";
import follow from "../../utils/follow";
import unFollow from "../../utils/unFollow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const UserInfo = () => {
  const queryClient=useQueryClient();
  const {currentUser}=useContext(Auth)
  const [id,setID]=useState(undefined)
  const [searchString,setSearchString]=useState('')
  const [processing,setProcessing]=useState(false)
  useEffect(() => {
    setID(currentUser?.uid)
  }, [currentUser?.uid])
  const {data:userInfo,isLoading,isError,error}=GetUser(id)
  const {data:searchedUsers}=Search(searchString)
  const handleClick = (uid) => {
    setSearchString('')
    setID(uid)
  }
  const signout = async() => {
    try {
      await signOut(auth);
      // navigate("/")
    } catch (error) {
      window.alert(error.message);
    }
  }
 
  const followUser=useMutation({
    mutationFn:()=>{return follow(userInfo?.uid,currentUser?.uid)},
    onSuccess:(data)=>{
      queryClient.setQueryData(['Users',userInfo?.uid],data)
    }
  })
  const unFollowUser=useMutation({
    mutationFn:()=>{return unFollow(userInfo?.uid,currentUser?.uid)},
    onSuccess:(data)=>{
      queryClient.setQueryData(['Users',userInfo?.uid],data)
    }
  })
  const handleFollowUnfollow=async(e)=>{
    setProcessing(!processing)
    if(processing) return;
    if(!userInfo?.followers.includes(currentUser?.uid)){
      followUser.mutate({},{
        onSuccess:()=>{
          console.log("Success follow")
          setProcessing(false)
        },
        onError:()=>{
          setProcessing(false)
        }
      })
    }
    else{
      unFollowUser.mutate({},{
        onSuccess:()=>{
          console.log("Success unfollow")
          setProcessing(false)
        },
        onError:()=>{
          setProcessing(false)
        }
      })
    }

  }
  if(isLoading || !userInfo) {
    return (
      <div className="user-info">
  
        <div className="load-wrapper">
          <img src={PackmanLoader} alt="Loading" />
        </div>
      </div>)
  }
  if(isError) return (<div className="user-info">
    <h1>{error.message}</h1></div>)
  return (
    
    <div className="user-info">
      <div className="search-box">
        <input type="search" name="" id="" placeholder="Enter Name or Email" onChange={e=>{
          setSearchString(e.target.value)
        }}/>
      </div>
      <div className="search-results">
        {
          searchedUsers?.map((user)=>{
            return <div className="result" key={user.uid} onClick={()=>{handleClick(user.uid)}}>
              <img src={user.photoURL} alt="" className="result-image"/>
              <div className="info">
              <h3>{user.displayName}</h3>
              <h5>{user.email}</h5>
              </div>
              </div>
        })}
      </div>
      {
        userInfo?.uid===currentUser?.uid?<button className="edit-profile">Edit Profile</button>:null
      }
      {
        userInfo?.uid!==currentUser?.uid?<button className="join-chat" onClick={()=>setID(currentUser?.uid)}>Your Profile</button>:null
      }
      <div className="profile-image-wrapper">
        <img src={userInfo?.photoURL} alt="" className="profile-image" referrerPolicy="no-referrer"/>
      </div>
      <h2>{userInfo?.displayName}</h2>
      <h5>{userInfo?.email}</h5>
      <span>{userInfo?.about}</span>
      <div className="follow-section">
        <span className="follower-count">Followers:{userInfo?.followersCount}</span>
        {
          userInfo?.uid===currentUser?.uid?<button className="signout " onClick={signout}>Sign Out</button>:<button type="button" className={`follow-btn ${processing?'disabled-btn':''}`} onClick={e=>handleFollowUnfollow(e)} disabled={processing}>{userInfo?.followers.includes(currentUser?.uid)?"Un Follow":"Follow"}</button>
        }
      </div>
      {/* <button className="join-chat" onClick={e=>cr()}>Create</button> */}
    </div>
  )
}

export default UserInfo