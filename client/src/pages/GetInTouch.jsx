

export default function GetInTouch() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Contact us</h1>
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
          <textarea className=" border p-3 rounded-lg" placeholder='e.g tomsailor@gmail.com'/>
        </div>

        <button className="text-white bg-blue-500 uppercase p-3 rounded-lg hover:bg-blue-700 transition ease-in-out duration-200 items-center">Get In Touch </button>
      </form>

    </div>
  )
}
