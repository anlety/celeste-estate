import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"


export default function Contact({listing}) {
  const [landlord, setLandlord] = useState(null)
   const [message, setEMessage] = useState('')
  

  useEffect(() => {
    const fetchLandlord = async() => {
try {
  const res = await fetch(`/server/user/${listing.userRef}`)
  const data = res.json()
  setLandlord(data)
} catch (error) {
  console.log(error.message)
}
    }
    fetchLandlord()
  }, [listing.userRef])

  const handleChange = (e) => {
    
  }
  return (
    <div>
      {
        landlord && (
          <div className="">
            <p>Contact <span>{landlord.username}</span> for <span>{listing.name.toLowerCase}</span></p>
            <textarea name='message' id='message' value={message} rows='2' onChange={handleChange} placeholder="Enter your message here..." className="w-full border p-3 rounded-lg"></textarea>

            <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className="bg-blue-600 text-white text-center p-3 uppercase rounded-lg hover:bg-blue-800">
              Send message
            </Link>
          </div>
        )
      }
    </div>
  )
}
