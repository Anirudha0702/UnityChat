import Nav from "../../Components/Nav/Nav"
import './Home.css'
import { useContext } from "react"
import { Auth } from "../../Providers/AuthProvider"
import UserInfo from "../../Components/UserInfo/UserInfo"
import { ScreenWidthContext } from "../../Providers/ScreenWidthProvider"
const Home = () => {
  const {currentUser}=useContext(Auth)
  const isSmallScreen=useContext(ScreenWidthContext)
  return (
    <div className="home" style={{display:'flex'}}>
      <UserInfo />
      
    </div>
  )
}

export default Home