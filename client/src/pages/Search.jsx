import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import ListingItem from "../components/ListingItem";


export default function Search() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    type: 'all',
    office: false,
    furnished: false,
    intercom: false,
    balcony: false,
    gym: false,
    swimmingPool: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
})

// console.log(sidebarData)

useEffect(() => {
  const urlParams = new URLSearchParams(location.search);
  const searchTermFromUrl =urlParams.get('searchTerm');
  const typeFromUrl = urlParams.get('type')
  const officeFromUrl = urlParams.get('office')
  const furnishedFromUrl = urlParams.get('furnished')
  const balconyFromUrl = urlParams.get('balcony')
  const intercomFromUrl = urlParams.get('intercom')
  const gymFromUrl = urlParams.get('gym')
  const swimmingPoolFromUrl = urlParams.get('swimmingPool')
  const offerFromUrl = urlParams.get('offer')
  const sortFromUrl = urlParams.get('sort')
  const orderFromUrl = urlParams.get('order')

  if(searchTermFromUrl || typeFromUrl || officeFromUrl || furnishedFromUrl || balconyFromUrl || intercomFromUrl|| intercomFromUrl || gymFromUrl || swimmingPoolFromUrl || offerFromUrl || sortFromUrl || orderFromUrl ){
    setSidebarData({
      searchTerm: searchTermFromUrl || '',
      type: typeFromUrl || 'all',
      office: officeFromUrl === 'true' ? true : false,
      furnished: furnishedFromUrl === 'true' ? true : false,
      intercom: intercomFromUrl === 'true' ? true : false,
      balcony: balconyFromUrl === 'true' ? true : false,
      gym: gymFromUrl === 'true' ? true : false,
      swimmingPool: swimmingPoolFromUrl === 'true' ? true : false,
      offer: offerFromUrl === 'true' ? true : false,
      sort: sortFromUrl || 'created_at',
      order: orderFromUrl || 'desc',
    })
  }
  const fetchListings = async() => {
    setLoading(true);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/server/listing/get?${searchQuery}`);
    const data = await res.json();
    if(data.length > 8) {
      setShowMore(true)
    }else{
      setShowMore(false)
    }
    setListings(data);
    setLoading(false)
  }
  fetchListings();
}, [location.search])



const handleChange = (e) => {
  if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
    setSidebarData({...sidebarData, type: e.target.id})
  }

  if(e.target.id === 'searchTerm') {
    setSidebarData({...sidebarData, searchTerm: e.target.value})
  }
  if(e.target.id === 'office' || e.target.id === 'furnished'|| e.target.id === 'intercom' || e.target.id === 'balcony' || e.target.id === 'gym' || e.target.id === 'swimmingPool' || e.target.id === 'offer') {
    setSidebarData({...sidebarData, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false,}) 
  }
  if(e.target.id === 'sort_order'){
    const sort = e.target.value.split('_')[0] || 'created_at';
    const order = e.target.value.split('_')[1] || 'desc';
    setSidebarData({...sidebarData, sort, order})
  }
}

const handleSubmit = (e) => {
  e.preventDefault();
  const urlParams = new URLSearchParams();
  urlParams.set('searchTerm', sidebarData.searchTerm);
  urlParams.set('type', sidebarData.type);
  urlParams.set('office', sidebarData.office);
  urlParams.set('furnished', sidebarData.furnished);
  urlParams.set('intercom', sidebarData.intercom);
  urlParams.set('balcony', sidebarData.balcony);
  urlParams.set('gym', sidebarData.gym);
  urlParams.set('swimmingPool', sidebarData.swimmingPool);
  urlParams.set('offer', sidebarData.offer);
  urlParams.set('sort', sidebarData.sort);
  urlParams.set('order', sidebarData.order);

  const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)
  
}
const onShowMoreClick = async() => {
  const numberOfListing = listings.length;
  const startIndex = numberOfListing;
  const urlParams = new URLSearchParams(location.search)
  urlParams.set('startIndex', startIndex);
  const searchQuery = urlParams.toString();
  const res = await fetch(`/server/listing/get?${searchQuery}`);
  const data = res.json();
  if(data.length < 9){
    setShowMore(false)
  }
  setShowMore([...listings, ...data]);



}

  return (
    <div className="flex flex-col md:flex-row ">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit = {handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="font-semibold">Search:</label>
            <input id="searchTerm" className="border rounded-lg p-3 w-full" onChange={handleChange} value={sidebarData.searchTerm}/>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" onChange={handleChange} checked={sidebarData.type === "all"}/>
              <span>Rent & sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" onChange={handleChange} checked={sidebarData.type === "rent"}/>
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" onChange={handleChange} checked={sidebarData.type === "sale"}/>
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" onChange={handleChange} checked={sidebarData.offer}/>
              <span>Offer</span>
            </div>
            
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            
            <div className="flex gap-2">
              <input type="checkbox" id="office" className="w-5" onChange={handleChange} checked={sidebarData.office}/>
              <span> Office</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" onChange={handleChange} checked={sidebarData.furnished}/>
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="intercom" className="w-5" onChange={handleChange} checked={sidebarData.intercom}/>
              <span>Intercom</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="balcony" className="w-5" onChange={handleChange} checked={sidebarData.balcony}/>
              <span>Balcony</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="gym" className="w-5" onChange={handleChange} checked={sidebarData.gym}/>
              <span>Gym</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="swimmingPool" className="w-5" onChange={handleChange} checked={sidebarData.swimmingPool}/>
              <span>Swimming pool</span>
            </div>
            
            
          </div>

          <div className="flex items-center gap-2">
            <label  className="font-semibold">Sort:</label>
            <select onChange={handleChange} defaultValue={'created_at_desc'} id='sort_order'  
            className="border rounded-lg p-3">
            <option value='regularPrice_desc'>Price high to low</option>
            <option value='regularPrice_asc'>Price low to high</option>
            <option value='bedrooms_desc'>Bedroom high to low</option>
            <option value='bedrooms_asc'>Bedroom low to high</option>
            <option value='createdAt_desc'>Latest</option>
            <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button type="submit" className="rounded-lg w-23 mx-auto  text-white bg-blue-600 hover:bg-blue-800 p-3 uppercase">Search</button>
        </form>
      </div>

      <div className="">
        <h1 className="text-3xl font-semibold border-b  p-3 text-slate-700">Search Results</h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading &&listings.length === 0 && (
            <p className="text-xl text-slate-600 ">There are currently no properties that match your search criteria.</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">Loading...</p>
          )}
          {
            !loading && listings && listings.map((listing) => (<ListingItem key={listing._id} listing={listing}/>))
          }
          {
            showMore && (<button onClick={onShowMoreClick} className="text-blue-600 p-3 hover:text-blue-800 text-center w-full">Show more</button>)
          }
        </div>
      </div>
    </div>
  )
}
