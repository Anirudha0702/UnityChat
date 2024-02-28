import debounce from '../../utils/debounce';
import './Search.css'
import { TfiSearch } from "react-icons/tfi";
const Search = () => {
  return (
    <div className="search-wrapper">
        <div className="search-bar-wrapper">
            <input 
            type="text" 
            className="search-bar" 
            placeholder="Search for a user" 
            onChange={e=>{debounce(e.target.value)}}/>
            <TfiSearch size={30}/>
        </div>
        <div className="search-results-wrapper">
        </div>   
    </div>
  )
}

export default Search