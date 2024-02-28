import Nav from '../../Components/Nav/Nav'
import { useContext } from 'react'
import { Auth } from '../../Providers/AuthProvider'
import UserInfo from '../../Components/UserInfo/UserInfo'
import Messages from '../../Components/Messages/Messages'
const Chats = () => {
  const clientwidth=window.innerWidth
  const {currentUser}=useContext(Auth)
  return (
    <div className="chats" style={{display:'flex'}}>
      <Nav/>
      {
        clientwidth > 650 && <UserInfo uid={currentUser?.uid}/> 
      }
      <Messages/>
    </div>
  )
}

export default Chats