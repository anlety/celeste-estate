

export default function RequestAppraisal() {
  return (
    <div className="p-3 max-w-lg mx-auto mb-6">
      <h1 className="text-3xl text-center font-semibold my-7">Request an Appraisal</h1>
      <h3 className="text-3xl text-center font-semibold my-7">Your contact details</h3>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label>Your Full Name</label>
          <input className="border p-3 rounded-lg" placeholder='e.g Tom Sailor'/>
        </div>
        <div className="flex flex-col">
          <label>Your Phone Number</label>
          <input className="border p-3 rounded-lg" placeholder='e.g 04xx xxx xxx'/>
        </div>
        <div className="flex flex-col">
          <label>Your Email Address</label>
          <input className="border p-3 rounded-lg" placeholder='e.g tomsailor@gmail.com'/>
        </div>
        <div className="flex flex-col">
          <label>Additional Message</label>
          <textarea className=" border p-3 rounded-lg" placeholder=''/>
        </div>

        {/* <button className="text-white bg-blue-500 uppercase p-3 rounded-lg hover:bg-blue-700 transition ease-in-out duration-200 items-center">Get In Touch </button> */}
      </form>

      <h3 className="text-3xl text-center font-semibold my-7">Property details</h3>
      <form className="flex flex-col gap-4">
      <div className="flex flex-col">
          <label>Street address</label>
          <input className="border p-3 rounded-lg" placeholder='e.g 123 Example Street'/>
        </div>
      <div className="flex flex-col">
          <label>Suburb and postcode</label>
          <input className="border p-3 rounded-lg" placeholder='City, Suburb, Postcode'/>
        </div>
        <div className="flex justify-around">
          <div className="flex flex-col">
            <label>Bedrooms</label>
            <input className="border p-3 rounded-lg w-16"  type="number"/>
          </div>
          <div className="flex flex-col">
            <label>Bathrooms</label>
            <input className="border p-3 rounded-lg w-16" type="number"/>
          </div>
          <div className="flex flex-col">
            <label>car spaces</label>
            <input className="border p-3 rounded-lg w-16" type="number"/>
          </div>
        </div>
        <div className="flex flex-col mb-3">
          <label>Additional Message</label>
          <textarea className=" border p-3 rounded-lg" placeholder=''/>
        </div>

        <button className="text-white bg-blue-500 uppercase p-3 rounded-lg hover:bg-blue-700 transition ease-in-out duration-200 items-center">Request an appraisal </button>
      </form>



    </div>
  )
}
