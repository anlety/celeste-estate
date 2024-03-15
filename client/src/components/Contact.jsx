import { useEffect, useState } from "react"
import { Link} from "react-router-dom";
import { useSelector } from "react-redux";


export default function Contact({listing}) {
  const [landlord, setLandlord] = useState(null)
   const [message, setMessage] = useState('')
   const {currentUser} = useSelector(state => state.user)
  console.log(listing)

  useEffect(() => {
    const fetchLandlord = async() => {
try {
  const res = await fetch(`/server/user/${listing.userRef}`)
  const data = await res.json()
  setLandlord(data)
  
} catch (error) {
  console.log(error.message)
}
    }
    fetchLandlord()
  }, [listing.userRef])

  const handleChange = (e) => {
    setMessage(e.target.value);
  }
  return (
    <div>
      {
        landlord && (
          <div className="bg-gray-200 rounded-md shadow-gray-200 shadow-md p-5">
            <h1 className="font-bold mt-2 mb-1 text-center text-lg">Agent contact details</h1>
            <img src={currentUser.avatar} alt="profile" className="rounded-md h-20 w-20 object-cover text-white p-1"/>
            <p>Contact <span className="font-semibold">{landlord.username}</span> for the <span>{listing?.name.toLowerCase()}</span></p>
            
            <textarea name='message' id='message' value={message} rows='2' onChange={handleChange} placeholder="Enter your message here..." className="w-full border p-3 rounded-lg mb-3"></textarea>

            <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className="bg-blue-600 mb-4 text-white text-center p-3 uppercase rounded-lg hover:bg-blue-800 mt-2">
              Send message
            </Link>
          </div>
        )
      }
    </div>
  )
}
