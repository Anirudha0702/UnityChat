import './Welcome.css'
import Logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
const Welcome = () => {
    const navigate=useNavigate()
    const handleJoin=(e) => {
        e.preventDefault()
        navigate('/globalChat')
    }
  return (
    <div className="welcome">
        <img src={Logo} alt="" />
        <p>Welcome to <span>UnityChat</span></p>
        <button type="button" onClick={handleJoin}>Join Chat</button>
    </div>
  )
}

export default Welcome