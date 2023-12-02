import './Login.css'
import Google from '../../assets/google.jpg'
import { useState } from 'react'
import signin from '../../db/Firebase/Signin'
const Login = () => {
  const [Err,setErr]=useState(false)
  const handleSignIn = async() => {
    const res=await signin();
    if(res?.isError){
      setErr(true)
    }
  }
  return (
    <>
    <div className="login" onClick={handleSignIn}>
      <div className="login-options">
      <div className="google-logo-wrapper">
        <img src={Google} alt="" className="google-logo" />
      </div>
      <span>SignIn with Google</span>
      </div>
      {
      Err && <div className="err">Something went wrong Try again</div>
    }
    </div>
    
    
    </>
  )
}

export default Login