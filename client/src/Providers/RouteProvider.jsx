import { createBrowserRouter,RouterProvider} from "react-router-dom"
import { useContext } from "react"
import Login from "../Pages/Login/Login"
import { Auth } from "./AuthProvider"
import Home from "../Pages/Home/Home"
import Chats from "../Pages/Chats/Chats"
import Status from "../Pages/Status/Status"

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
        },
        {
          path: "/profile",
          element: <h1>Profile</h1>,
        },
        {
          path: "/settings",
          element: <h1>Settings</h1>,
        },
        {
          path: "/status",
          element: currentUser? <Status/>: <Login/>,
        },
        {
          path: "*",
          element: <h1>404 Not Found</h1>,
        },
        

    ]
)
  return (
    <RouterProvider router={router}>
        {children}
    </RouterProvider>
  )
}

export default RouteProvider