import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice'
import OAuth from "../components/OAuth";


export default function SignIN() {
  const [formData, setFormData] = useState({})
  // const [error, setError] = useState(null)
  // const [loading, setLoading] = useState(false)
  const {loading, error} = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      // setLoading(true)
      dispatch(signInStart())
    const res = await fetch('/server/auth/signin', {method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    }, 
    body: JSON.stringify(formData),
  }
    )
    const data = await res.json();
    if(data.success === false){
      // setLoading(false);
      // setError(data.message)
      dispatch(signInFailure(data.message));
      return
    }
    // setLoading(false)
    // setError(null)
    dispatch(signInSuccess(data))
    navigate('/')

    } catch (error) {
      // setLoading(false)
      // setError(error.message)
      dispatch(signInFailure(error.message))
    }
    
    // console.log(data)
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
     
      <input type="email" placeholder="email" className="border p-3 rounded-lg" id="email" onChange={handleChange}/>
      <input type="password" placeholder="password" className="border p-3 rounded-lg" id="password" onChange={handleChange}/>
      <button disabled={loading} className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition ease-in-out duration-200" type="submit">{loading? "LOADING..." :  "SIGN IN"}</button> 
      
      <OAuth/>
    </form>
    <div className="mt-5">
      <p>Do not have an account? 
        <Link to='/sign-up' className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"> Sign up</Link>
      </p>
    </div>
    
    {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
    
  )
}
