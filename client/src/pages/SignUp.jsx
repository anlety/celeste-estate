import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";



export default function SignUp() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      setLoading(true)
    const res = await fetch('/server/auth/signup', {method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    }, 
    body: JSON.stringify(formData),
  }
    )
    const data = await res.json();
    if(data.success === false){
      setLoading(false);
      setError(data.message)
      
      return
    }
    setLoading(false)
    setError(null)
    navigate('/sign-in')

    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
    
    // console.log(data)
  }
  return (
    <div className="p-3 max-w-lg mx-auto mb-3">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="text" placeholder="username" className="border p-3 rounded-lg" id="username"  onChange={handleChange}/>
      <input type="email" placeholder="email" className="border p-3 rounded-lg" id="email" onChange={handleChange}/>
      <input type="password" placeholder="password" className="border p-3 rounded-lg" id="password" onChange={handleChange}/>
      <button disabled={loading} className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition ease-in-out duration-200" type="submit">{loading? "LOADING..." :  "SIGN UP"}</button>
      
      <OAuth/>
    </form>
    <div className="mt-5">
      <p>Have an account? 
        <Link to='/sign-in' className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"> Sign in</Link>
      </p>
    </div>
    
    {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
    
  )
}
