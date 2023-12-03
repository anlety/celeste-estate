
import {FcGoogle} from 'react-icons/fc';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import {useDispatch} from 'react-redux';
import {signInSuccess} from '../redux//user/userSlice';
import {useNavigate} from 'react-router-dom'

export default function OAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogleClick = async() => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)
          // console.log(result)
      const res = await fetch('/server/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName, 
          email: result.user.email, 
          photo: result.user.photoURL,
        }),
      });
        const data = await res.json()
        dispatch(signInSuccess(data))
        navigate ("/")
    } catch (error) {
      console.log("Could not sign in with Google")
    }
  }
  return (
      <button 
      onClick={handleGoogleClick}
      type='button'  
      className="text-white flex bg-blue-500 uppercase p-3 rounded-lg hover:bg-blue-700 transition ease-in-out duration-200 items-center justify-center"> <FcGoogle className='mr-1 text-2xl bg-white rounded-full p-1 border-2' />
          Continue with Google
      </button>
  )
}


