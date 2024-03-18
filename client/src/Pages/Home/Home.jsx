import Messages from '../../Components/Messages/Messages'
import './Home.css'
import { useContext } from "react"
import { Auth } from "../../Providers/AuthProvider"
import UserInfo from "../../Components/UserInfo/UserInfo"
import { ScreenWidthContext } from "../../Providers/ScreenWidthProvider"
const Home = () => {
  const {currentUser}=useContext(Auth)
  const isSmallScreen=useContext(ScreenWidthContext)
  return (
    <div className="" style={{display:'flex'}}>
      <UserInfo uid={currentUser?.uid}/> 
      {
        !isSmallScreen && <Messages/>
      }
      {/* <Messages/> */}

    </div>
  )
}

export default Home