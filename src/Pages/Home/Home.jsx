import Nav from "../../Components/Nav/Nav"
import './Home.css'
import { useContext } from "react"
import { Auth } from "../../Providers/AuthProvider"
import Welcome from "../../Components/Welcome/Welcome"
const Home = () => {
  const {currentUser}=useContext(Auth)
  const clientwidth=window.innerWidth
  console.log(clientwidth)
  return (
    <div className="home" style={{display:'flex'}}>
      <Nav/>
      
      <Welcome/>
    </div>
  )
}

export default Home