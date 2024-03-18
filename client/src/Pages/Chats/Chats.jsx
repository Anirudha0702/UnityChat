import { ScreenWidthContext } from "../../Providers/ScreenWidthProvider"
import { useContext } from 'react'
import { Auth } from '../../Providers/AuthProvider'
import UserInfo from '../../Components/UserInfo/UserInfo'
import Messages from '../../Components/Messages/Messages'

const Chats = () => {
  const isSmallScreen=useContext(ScreenWidthContext)
  const {currentUser}=useContext(Auth)
  return (
    <div className="chats" style={{display:'flex'}}>
      {
        !isSmallScreen && <UserInfo uid={currentUser?.uid}/> 
      }
      <Messages/>
    </div>
  )
}

export default Chats