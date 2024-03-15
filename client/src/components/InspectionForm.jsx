

export default function InspectionForm() {
  return (
    <div className="p-3 max-w-lg mx-auto bg-white m-2">
   
      <h1 className="text-3xl text-center font-semibold my-7">Request an inspection</h1>
      
     
      <h4 className="text-center  mb-3">Provide your contact details to request an inpection</h4>
      
      <form className="flex flex-col gap-4">
        <div>
          <div>
          <div className="flex flex-col mb-3">
            <label htmlFor="">First Name </label>
            <input className="border p-3 rounded-lg"/>
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="">Last Name  </label>
            <input className="border p-3 rounded-lg"/>
          </div>
         </div>
          <div>
          <div className="flex flex-col mb-3">
            <label htmlFor=""> Email</label>
            <input className="border p-3 rounded-lg"/>
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor=""> Phone number </label>
            <input className="border p-3 rounded-lg"/>
          </div>
         </div>

         <div className="flex flex-col mb-3">
          <label>Looking to move in by</label>
          <input className="border p-3 rounded-lg" type='date'/>
         </div>
         <div className="flex flex-col mb-3">
          <label>Comments</label>
          <textarea className=" border p-3 rounded-lg"/>
         </div>

         <button className="text-white w-full bg-blue-500 uppercase p-3 rounded-lg hover:bg-blue-700 transition ease-in-out duration-200 items-center mb-5">Send a request </button>

        </div>
      </form>
    </div>
  )
}

