import Nav from "../../Components/Nav/Nav"
import './Home.css'
import { useContext } from "react"
import { Auth } from "../../Providers/AuthProvider"
import Welcome from "../../Components/Welcome/Welcome"
import UserInfo from "../../Components/UserInfo/UserInfo"
const Home = () => {
  const {currentUser}=useContext(Auth)
  const clientwidth=window.innerWidth
  console.log(clientwidth)
  return (
    <div className="home" style={{display:'flex'}}>
      <Nav/>
      <UserInfo uid={currentUser?.uid}/>
      {clientwidth>550?<Welcome/>:null}
    </div>
  )
}

export default Home