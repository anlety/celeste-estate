import { Link } from "react-router-dom"


const Inspection = () => {
  return (
    <div className='max-w-6xl mx-auto mt-8 mb-5 pl-5'>
    <h3 className="text-lg font-bold ">Inpections</h3>
    <p>Request for an <Link className='text-blue-500 hover:text-blue-700 cursor-pointer' to='/inspection'>inspection</Link></p>
  </div>
  )
}

export default Inspection