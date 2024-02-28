import './Nav.css'
import { FaUser } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';
import { MdPostAdd } from "react-icons/md";
import { IoChatboxOutline,IoSearchOutline } from "react-icons/io5";
const Nav = () => {
  return (
    <nav className="navbar">
        <ol className='nav-option-wrapper'>
            <li className='option'>
                <NavLink to='/users' className=''><FaUser className='icon user-icon'/></NavLink>
            </li>
            <li className='option'>
                <NavLink to='/status' className=''><MdPostAdd className='icon post-icon'/></NavLink>
            </li>
            <li className='option'>
                <NavLink to='/globalChat' className=''><IoChatboxOutline className='icon chat-icon'/></NavLink>
            </li>
            <li className='option'>
                <NavLink to='/search' className=''><IoSearchOutline className='icon search-icon'/></NavLink>
            </li>
        </ol>
    </nav>
  )
}

export default Nav