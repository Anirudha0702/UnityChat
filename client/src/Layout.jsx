import './Layout.css'
const Layout = ({children}) => {

  return (
    <div className="wrapper">
        {children}
    </div>
  )
}

export default Layout