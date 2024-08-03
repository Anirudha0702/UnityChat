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
    <div className="flex items-center justify-center h-svh dark:bg-gray-800 " onClick={handleSignIn}>
    <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
        <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
        <span>Login with Google</span>
    </button>
</div>
      {
      Err && <div className="err">Something went wrong Try again</div>
    }
    
    </>
  )
}

export default Login