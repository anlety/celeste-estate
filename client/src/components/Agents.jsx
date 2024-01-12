
import boss from '../assets/boss.jpg'
import christina from '../assets/christina.jpg'
import portrait from '../assets/portrait.jpg'
import ceo from '../assets/ceo.jpg'
import {AiOutlineMail, AiOutlinePhone} from 'react-icons/ai'
export default function Agents() {
  return (
    <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
      
      <h1 className="text-3xl text-center font-semibold my-7">Our Agents</h1>
      <div className='flex gap-6 justify-center flex-wrap'>
        {/* first card */}

         <div className='bg-white shadow-md hover:shadow-lg transition-shadow  rounded-lg p-5 '>
          <img src={boss} className='h-[200px] w-[200px]  rounded-full'/>
          <div className='flex flex-col justify-center items-center'>
          <h2 className='text-xl font-medium'>Amy Cobos</h2>
        <div className='flex items-center gap-1 mt-2'>
          <AiOutlineMail/>
          <p>amucobos@gmail.com</p>
        </div>
          <div className='flex items-center gap-1 '>
            <AiOutlinePhone/>
          <p>0412 345 678</p>
          </div>
          
        </div>
        
      </div>
{/* 2 */}
      <div className='bg-white shadow-md hover:shadow-lg transition-shadow  rounded-lg p-5 '>
          <img src={christina} className='h-[200px] w-[200px] rounded-full'/>
        <div className='flex flex-col justify-center items-center'>
          <h2 className='text-xl font-medium'>Bibi Larenta</h2>
        <div className='flex items-center gap-1 mt-2'>
          <AiOutlineMail/>
          <p>bibi-larenta@gmail.com</p>
        </div>
          <div className='flex items-center gap-1 '>
            <AiOutlinePhone/>
          <p>0413 320 379</p>
          </div>
          
        </div>
        
      </div>


     {/* 3 */}
     <div className='bg-white shadow-md hover:shadow-lg transition-shadow  rounded-lg p-5 '>
          <img src={portrait} className='h-[200px] w-[200px] rounded-full'/>
          <div className='flex flex-col justify-center items-center'>
          <h2 className='text-xl font-medium'>Johnny Cage</h2>
        <div className='flex items-center gap-1 mt-2'>
          <AiOutlineMail/>
          <p>JonieCage@gmail.com</p>
        </div>
          <div className='flex items-center gap-1'>
            <AiOutlinePhone/>
          <p>0454 333 908</p>
          </div>
          
        </div>
        
      </div>
    {/* 4 */}
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow  rounded-lg p-5 '>
          <img src={ceo} className='h-[200px] w-[200px] rounded-full'/>
          <div className='flex flex-col justify-center items-center'>
          <h2 className='text-xl font-medium'>Kate Williams</h2>
        <div className='flex items-center gap-1 mt-2'>
          <AiOutlineMail/>
          <p>katewilliams@gmail.com</p>
        </div>
          <div className='flex items-center gap-1'>
            <AiOutlinePhone/>
          <p>0404 843 345</p>
          </div>
          
        </div>
        
      </div>



      </div>
     
    </div>
  )
}
