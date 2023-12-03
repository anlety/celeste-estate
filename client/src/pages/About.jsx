import team from '../assets/team.jpg'
import about from '../assets/about.jpg'

export default function About() {
  return (
    <div className="py-20 px-4 max-w-6xl mx-auto">
      <div className="text-slate-600 font-bold text-3xl lg:text-6xl flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
        <h1>About us <span className="text-slate-400">perfect</span>
        <br/> place with ease</h1>
        <div className="text-gray-400 text-xs">
          Sahand Estate is the best place to find your next perfect place to lfa-inverse<br/>
          we have a wide range of properties for you to choose from
        </div>
      </div>

      {/* Image */}
      <div>
        <div className='w-full'>
          <img src={about} className='w-full h-[500px]'/>
        </div>
      </div>
        <div className='flex mt-6'>
          <div><img src={team} className='w-[1000px] h-[500px]'/></div>
          <div>
             {/* <h1 className="text-3xl font-bold mb-4 text-slate-700">About Celeste estate</h1> */}
      <p className="mb-4 text-slate-600">At realestate.com.au our purpose is to empower people by making property simple, efficient and stress free. Whether you’re just beginning your property journey or have had years of experience, realestate.com.au is the number one place for people to come together to explore, research and share their passion for Australian property.</p>
      <p className="mb-4 text-slate-600">With an average of over 12 million visitors each month across web and mobile we are the leading property resource in Australia1. Whether you are looking for a share house, an investment property with a great rental return or possibly even inspiration for updating that living room, realestate.com.au is here to help you make better decisions for taking your next step</p>
      <p className="mb-4 text-slate-600">Owned and operated by ASX-listed REA Group (REA:ASX), realestate.com.au was established in 1995 and is headquartered in Melbourne, Australia.</p>
      <p className="mb-4 text-slate-600">About REA Group: REA Group Limited is a market-leading digital advertising business specialising in property. Our operations include Australia’s leading residential and commercial property sites, realestate.com.au and realcommercial.com.au, as well as property sites in Europe and Asia. Listed on the Australian Securities Exchange (ASX: REA), the Group employs more than 1,400 people in Australia and international markets.</p></div>
        </div>

     
    </div>
  )
}
