
import boss from '../assets/boss.jpg'
import christina from '../assets/christina.jpg'
import portrait from '../assets/portrait.jpg'
import {AiOutlineMail, AiOutlinePhone} from 'react-icons/ai'
export default function Agents() {
  return (
    <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
      
      <h1 className="text-3xl text-center font-semibold my-7">Our Agents</h1>
      <div className='flex gap-6 justify-center flex-wrap'>
        {/* first card */}

         <div className=''>
          <img src={boss} className='h-[320px] w-[320px]  rounded-lg'/>
          <div className='flex flex-col justify-center items-center'>
          <h2 className='text-xl font-medium'>Jonie Cage</h2>
        <div className='flex items-center gap-1'>
          <AiOutlineMail/>
          <p>JonieCage2gmail.com</p>
        </div>
          <div className='flex items-center gap-1'>
            <AiOutlinePhone/>
          <p>0412 345 678</p>
          </div>
          
        </div>
        
      </div>
{/* 2 */}
      <div>
          <img src={christina} className='h-[320px] w-[320px] rounded-lg'/>
        <div className='flex flex-col justify-center items-center'>
          <h2 className='text-xl font-medium'>Jonie Cage</h2>
        <div className='flex items-center gap-1'>
          <AiOutlineMail/>
          <p>JonieCage2gmail.com</p>
        </div>
          <div className='flex items-center gap-1'>
            <AiOutlinePhone/>
          <p>0412 345 678</p>
          </div>
          
        </div>
        
      </div>


     {/* 3 */}
     <div>
          <img src={portrait} className='h-[320px] w-[320px]  rounded-lg'/>
          <div className='flex flex-col justify-center items-center'>
          <h2 className='text-xl font-medium'>Jonie Cage</h2>
        <div className='flex items-center gap-1'>
          <AiOutlineMail/>
          <p>JonieCage2gmail.com</p>
        </div>
          <div className='flex items-center gap-1'>
            <AiOutlinePhone/>
          <p>0412 345 678</p>
          </div>
          
        </div>
        
      </div>




      </div>
     
    </div>
  )
}
