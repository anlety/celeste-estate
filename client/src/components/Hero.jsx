import heroImg from '../assets/real-estate.jpg';
import {BsSearch} from "react-icons/bs";

export default function Hero() {
  return (
    <div className='mb-20'>
      <div className='absolute w-full z-20'>
        <div className='bg-gray-900/40 absolute z-10 w-full h-[30rem]'></div>
        <img src={heroImg} alt="Hero" className='object-cover w-full h-[30rem]'/>
      </div>
      <div className='relative z-30 flex flex-col items-center w-full pt-10'>
      <p className='text-4xl text-white font-bold'>To each their home.</p>
      <p className='text-lg text-white font-medium'>let's find a home that's perfect for you</p>
      <form  className="bg-white p-3 rounded-lg flex items-center shadow-sm">
        <input className="bg-white focus:outline-none w-[27rem]" type="text" placeholder="Search suburb"  />
        <button type="submit"><BsSearch className="text-slate-600"/></button>
      </form>
      </div>
      
    </div>
  )
}
