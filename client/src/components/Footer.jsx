import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube} from 'react-icons/fa'
import {AiTwotonePhone} from 'react-icons/ai'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-blue-700 flex flex-col items-center">

      <div className='flex flex-col items-center mt-2'>
        <p className='text-white'>Address: 2/87 West Street, Hadfield, Vic 3046</p>
        <p className='text-white flex gap-1 items-center '> <span className='text-white text-lg'><AiTwotonePhone/></span>03 123 4567</p>
      </div>
      <div className='flex items-center p-3 gap-2'>
        <Link to=''>
        <FaFacebookF className='text-gray-300 text-3xl rounded-lg hover:text-white'/>
        </Link>
        <Link to=''><FaTwitter className='text-gray-300 text-3xl rounded-lg hover:text-white'/></Link>
        
        <Link to=''><FaYoutube className='text-gray-300 text-3xl rounded-lg hover:text-white'/></Link>
        
        <Link to=''><FaLinkedinIn className='text-gray-300 text-3xl rounded-lg hover:text-white'/></Link>
        <Link to=''><FaInstagram className='text-gray-300 text-3xl rounded-lg hover:text-white'/></Link>
        
      </div>
      <div className='flex gap-3 items-center mb-2'>
        <Link className='text-gray-200 hover:text-white '>Home</Link>
        <Link className='text-gray-200 hover:text-white '>About </Link>
        <Link className='text-gray-200 hover:text-white '>contact us</Link>
        <Link to="/request" className='bg-blue-400 rounded-md p-1 hover:bg-blue-600'><button className='text-gray-200 hover:text-white '>Request an appraisal</button> </Link>
      </div>
      <div className='bg-black w-full text-center p-2'>
        <p className="text-white text-sm ">&#169 Celeste-estate.com 2023</p>
      </div>
      
    </footer>
  )
}
