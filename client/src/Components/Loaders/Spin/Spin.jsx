import "./Spin.css"
import { FaSpinner } from "react-icons/fa";
const Spin = ({size=30,className,color='white'}) => {
  return (
    <div className={` ${className}`}>
        <FaSpinner size={size} color={color} className="spinner"/>
    </div>
  )
}

export default Spin