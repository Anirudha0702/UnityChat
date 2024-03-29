import Messages from '../../Components/Messages/Messages'
import UserInfo from '../../Components/UserInfo/UserInfo'
const Home = () => {
  return (
    <div className="flex justify-start h-[100svh]">
      <UserInfo/>
    <Messages/>
    </div>
  

  )
}

export default Home