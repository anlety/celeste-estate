import { useEffect, useState } from "react";
import {BsSearch} from "react-icons/bs";

import { Link, useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import Agents from "../components/Agents";
// import Hero from "../components/Hero";
import heroImg from '../assets/real-estate.jpg';


export default function Home() {
  const [rentListing, setRentListing] = useState([])
  const [sellListing, setSellListing] = useState([])
  const [offerListing, setOfferListing] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
 


  useEffect(()=> {
    const fetchRentListings = async() => {
      try {
        const res = await fetch('server/listing/get?type=rent&limit=4')
        const data =await res.json();
        console.log(data)
        setRentListing(data)
        console.log(data)
        fetchSellListings()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchSellListings = async() => {
      try {
        const res = await fetch('server/listing/get?type=sale&limit=4')
        const data =await res.json();
        setSellListing(data)
        fetchOfferListings()
      } catch (error) {
        console.log(error)
      }
    }

    const fetchOfferListings = async()=>{
      try {
        const res = await fetch('server/listing/get?offer=true&limit=4')
        const data =await res.json();
        setOfferListing(data)
      } catch (error) {
        console.log(error)
      }
    }
  fetchRentListings()
  

  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [])
  return (
    <div>
      

<div className='mb-80 '>
      <div className='absolute w-full z-20'>
        <div className='bg-gray-900/40 absolute z-10 w-full h-[30rem]'></div>
        <img src={heroImg} alt="Hero" className='object-cover w-full h-[30rem]'/>
      </div>
      <div className='relative z-30 flex flex-col  w-full pt-10 items-center'>
      <p className='text-4xl text-white font-bold mt-20 mb-2'>Celeste-estate know how to get more for your property</p>
      <p className='text-lg text-white font-medium mb-1'>let find a home which is perfect for you</p>
      <form onSubmit = {handleSubmit}   className="bg-white p-3 rounded-lg flex items-center shadow-sm">
        <input className="bg-white focus:outline-none w-35 sm:w-80" type="text" placeholder="Search suburb"  value={searchTerm} onChange = {(e) => setSearchTerm(e.target.value)}/>
        <button type="submit" className="bg-blue-600 p-2 rounded-full hover:bg-blue-800"><BsSearch className=" text-white"/></button>
      </form>
      </div>
      
    </div>
     

{/* Swiper */}
{/* <Swiper navigation>
    {rentListing && rentListing.length >0 && rentListing.map((listing) => {
      <SwiperSlide>
        <div className="h-[500px]" key={listing} style={{background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize:"cover"}}></div>
      </SwiperSlide>
    })}
</Swiper> */}

{/* <Swiper navigation>
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper> */}

     {/* Hero */}
              
                {/* <Hero/> */}

{/* show the listings */}
    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
      {
        rentListing && rentListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Properties for rent</h2>
              <Link className="text-sm text-blue-600 hover:text-blue-800" to={'/search?type=rent'}>
                Show more rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {
                rentListing.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))
              }
            </div>
          </div>
        )
      }

      {/* Sale */}
      {
        sellListing && sellListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Properties for sell</h2>
              <Link className="text-sm text-blue-600 hover:text-blue-800" to={'/search?type=sale'}>
                Show more places for sell
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {
                sellListing.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))
              }
            </div>
          </div>
        )
      }

      {/* Offers */}
      {
        offerListing && offerListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent offer</h2>
              <Link className="text-sm text-blue-600 hover:text-blue-800" to={'/search?offer=true'}>
                Show more offer
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {
                offerListing.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))
              }
            </div>
          </div>
        )
      }
    </div>
      <div>

        <Agents/>
      </div>


    </div>
  )
}
