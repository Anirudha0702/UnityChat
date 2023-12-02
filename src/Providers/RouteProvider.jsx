import { createBrowserRouter,RouterProvider} from "react-router-dom"
import { useContext } from "react"
import Login from "../Pages/Login/Login"
import { Auth } from "./AuthProvider"
import Home from "../Pages/Home/Home"
import Chats from "../Pages/Chats/Chats"





const RouteProvider = ({children}) => {
  const {currentUser}=useContext(Auth)
  const router=createBrowserRouter(
    [
        {
            path: "/",
            element: currentUser ? <Home/> : <Login/>,  
        },
        {
          path: "/login",
          element: currentUser ? <Home/> : <Login/>,  
      },
        {
          path: "/globalChat",
          element: currentUser ? <Chats/> : <Login/>,
        }
    ]
)
  return (
    <RouterProvider router={router}>
        {children}
    </RouterProvider>
  )
}

export default RouteProvider