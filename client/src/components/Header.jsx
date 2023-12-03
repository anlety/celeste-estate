import { Link} from "react-router-dom";
import {FcHome} from "react-icons/fc";
// import {BsSearch} from "react-icons/bs";
import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";


export default function Header() {
  const {currentUser} = useSelector(state => state.user)
//   const [searchTerm, setSearchTerm] = useState('')
// const navigate = useNavigate()
  
// const handleSubmit = (e) => {
//     e.preventDefault()
//     const urlParams = new URLSearchParams(window.location.search);
//     urlParams.set('searchTerm', searchTerm);
//     const searchQuery = urlParams.toString();
//     navigate(`/search?${searchQuery}`);
//   }

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(location.search);
  //   const searchTermFromUrl = urlParams.get('searchTerm');
  //   if(searchTermFromUrl) {
  //     setSearchTerm(searchTermFromUrl);
  //   }
  // }, [location.search])
  return (
    <header className=" bg-blue-700 shadow-md  p-3">

      <div className="flex justify-between  max-w-6xl mx-auto items-center">

        <Link to='/'>
          <h1 className=" font-bold text-xl sm:text-xl flex items-center text-white "><FcHome className=" text-4xl bg-white rounded-full p-1 border-2 mr-1"/> Celeste-estate.com</h1>
        </Link>

         

      <div className="flex gap-4 items-center">
      <Link to='/'><li className="hidden sm:inline text-white hover:underline decoration-white font-semibold" >Home</li></Link>
        <Link to='/about'><li className="hidden sm:inline font-semibold   text-white hover:underline">About</li></Link>
        <Link to='/contact'><li className="hidden sm:inline  font-semibold  text-white hover:underline">Contact</li></Link>
      </div>

      <ul className="flex gap-4 items-center">
        {/* <Link to='/'><li className="hidden sm:inline text-white hover:underline decoration-white font-semibold" >Home</li></Link>
        <Link to='/about'><li className="hidden sm:inline font-semibold   text-white hover:underline">About</li></Link>
        <Link to='/contact'><li className="hidden sm:inline  font-semibold  text-white hover:underline">Contact</li></Link> */}
        <Link to='profile'>
          {currentUser ? (<img src={currentUser.avatar} alt="profile" className="rounded-full h-7 w-7 object-cover text-white"/>) : (<li className=" sm:inline  font-semibold text-white hover:underline">Sign in</li>)}
          </Link>
        <Link to='/sign-up'><li className=" sm:inline   hover:bg-blue-500 transition ease-in-out duration-200 bg-blue-400 p-2 rounded-lg text-white px-3">Join</li></Link>
      </ul>
      </div>
     

    </header>
  )
}
