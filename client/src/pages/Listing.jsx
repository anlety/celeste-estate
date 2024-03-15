

import { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';

import { IoRestaurantOutline } from "react-icons/io5";
import { LuSchool } from "react-icons/lu";
import 'swiper/css/bundle';
import {LiaToiletSolid} from 'react-icons/lia'
import {ImFloppyDisk} from 'react-icons/im'
import {TbAirConditioning} from 'react-icons/tb'
import {FaCheck, FaMapMarkerAlt, FaShare} from 'react-icons/fa';
// import {ImLocation2} from 'react-icons/im'
 import {BiBed, BiBath} from 'react-icons/bi'
 import {AiOutlineCar} from 'react-icons/ai';
//  import {GiDesk} from 'react-icons/gi'
 import { FaComputer } from "react-icons/fa6";
 import { LuSofa } from "react-icons/lu";
import Contact from '../components/Contact';


import balcony from '../assets/balcony.png'
import intercom from '../assets/intercom.png'
import office from '../assets/office.png'
import wardrobe from '../assets/wardrobe.png'
import gym from '../assets/gym.png'
import alarm from '../assets/alarm.png'
import garage from '../assets/garage1.png'
import pool from '../assets/swimmingPool.png'
import sofa from '../assets/sofa.png'

import { TbBusStop } from "react-icons/tb";
import { GiParkBench } from "react-icons/gi";
import { LiaRulerCombinedSolid } from "react-icons/lia";
import Inspection from '../components/Inspection';


// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/server/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  

  return (
    <main className=''>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}

                <div className='flex flex-col md:flex-row m-4 max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5'>
          {/* <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'> */}
          {/* Card */}
          <div className='w-full mt-3 md:grid md:grid-cols-2 gap-3'>
            <div>
            <p className='text-xl font-semibold mb-3'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 mb-3 text-slate-600  text-2xl font-semibold'>
              <FaMapMarkerAlt className='text-red-700 text-lg' />
              {listing.address}
            </p>
            <div className='flex gap-4 mb-3'>
              <p className='bg-purple-500 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-red-500 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice} discount
                </p>
              )}
            </div>
            <p className='text-slate-800 mb-3'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            <ul className=' font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 mb-6'>
              <li className='flex items-center gap-1 whitespace-nowrap  text-lg'>
                
                {listing.bedrooms}
                <BiBed className='text-2xl' />
              </li>
              <li className='flex text-lg items-center gap-1 whitespace-nowrap '>
                
                {listing.bathrooms}
                <BiBath className='text-2xl' />
              </li>
              <li className='flex text-lg items-center gap-1 whitespace-nowrap '>
                
                {listing.parking}
                <AiOutlineCar className='text-2xl'/> 
              </li>
              {listing.office? (<li className="font-bold text-sm flex items-center gap-1">
              {listing.office} <FaComputer  className="text-2xl" />{" "}
              </li>) : ''}

              {listing.furnished? (<li className="font-bold text-sm flex items-center gap-1">
              {listing.furnished} <LuSofa  className="text-2xl" />{" "}
              </li>) : ''}
             
             {listing.squareFeet? (<li className='flex items-center gap-1 whitespace-nowrap '>
              
              <LiaRulerCombinedSolid className='text-2xl '/>{listing.squareFeet} m2
              </li>) : ''}
            </ul>
            </div>

            <div>

            {/* Landlord */}
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              // <button
              //   onClick={() => setContact(true)}
              //   className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
              // >
              //   Contact agent
              // </button>
              <Contact listing={listing} />
            )}
            {/* {contact && <Contact listing={listing} />} */}
            {/* New test */}
            </div>


          </div>
       
 </div>

        </div>
      )}

   

     {/* <Inspection /> */}

      <div className='max-w-6xl mx-auto mt-8 mb-5'>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-lg font-bold mb-6">Amenities</h3>

              <ul className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 list-none space-y-2">

                {/* <li>
                 <FaCheck className="inline-block text-green-600 mr-2"/> parking
               </li> */}

               <li className='flex item-center mb-2 gap-1'> <FaCheck className="inline-block text-green-600 mr-2"/>
               <TbAirConditioning  className='text-3xl'/>
          <p>Air conditioning</p>

        </li>
        <li className='flex item-center mb-2 gap-1'>
        <FaCheck className="inline-block text-green-600 mr-2"/><img src={wardrobe} className='w-[30px] h-[30px]'/>
          <p>built-in wardrobes</p>
        </li>
        <li className='flex item-center mb-2 gap-1'>
        <FaCheck className="inline-block text-green-600 mr-2"/><img src={alarm} className='w-[30px] h-[30px] text-black'/>
        <p>Alarm</p>
        </li>
        <li className='flex item-center mb-2 gap-1'>
        <FaCheck className="inline-block text-green-600 mr-2"/> <LiaToiletSolid className='text-2xl'/>
          <p>Toilet</p>
        </li>
     
      {listing?.intercom && (<li className='flex item-center gap-1'>
      <FaCheck className="inline-block text-green-600 mr-2"/> <img src={intercom} className='w-[30px] h-[30px]'/>
        <p>Intercom</p>
      </li>)}
      {listing?.parking && (<li className='flex item-center gap-1'>
      <FaCheck className="inline-block text-green-600 mr-2"/> <img src={garage} className='w-[30px] h-[30px]'/>
        <p>Garage - space</p>
      </li>)}
             
        {listing?.balcony && (<li className='flex item-center gap-1'>
        <FaCheck className="inline-block text-green-600 mr-2"/> <img src={balcony} className='w-[30px] h-[30px] mb-2'/>
          <p>Balcony</p>
        </li>)}
       {listing?.furnished && ( <li className='flex item-center mb-2 gap-1'>
          <FaCheck className="inline-block text-green-600 mr-2"/><img src={sofa} className='w-[30px] h-[30px]'/>
           <p>Furnished</p>
        </li>)}
        <li className='flex item-center mb-2 gap-1'>
          <FaCheck className="inline-block text-green-600 mr-2"/> <ImFloppyDisk className='text-2xl text-gray-700'/>
          <p>Dishwasher</p>
        </li>
      {listing?.gym && ( <li className='flex item-center mb-2 gap-1'>
        <FaCheck className="inline-block text-green-600 mr-2"/> <img src={gym} className='w-[30px] h-[30px]'/>
        <p>Gym</p>
        </li>)}
       {listing?.office && ( <li className='flex item-center mb-2 gap-1'>
        <FaCheck className="inline-block text-green-600 mr-2"/> <img src={office} className='w-[30px] h-[30px]' />
          <p>Office</p>
        </li>)}

      {listing?.swimmingPool && ( <li className='flex item-center gap-1'>
          <FaCheck className="inline-block text-green-600 mr-2"/><img src={pool} className='w-[30px] h-[30px]'/>
           <p>Swimming pool - in-ground</p>
        </li>)}
              </ul>
            </div>
            </div>

           <Inspection />

            <div className='max-w-6xl mx-auto mt-8 mb-5'>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-lg font-bold mb-6">Nearby palaces</h3>

      {/* <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 list-none space-y-2"> */}
      <ul className="grid grid-cols-2 md:flex md:justify-between ">
      <li className='flex item-center mb-2 gap-1'>
           <TbBusStop  className='text-2xl text-gray-700'/>
          <div className='flex items-center'><span className='font-semibold'>Bus stop</span> <span>100m away</span></div>
        </li>
      <li className='flex item-center mb-2 gap-1'>
           <LuSchool   className='text-2xl text-gray-700'/>
          <p><span className='font-semibold'>School</span> <span>200m away</span></p>
        </li>
      <li className='flex item-center mb-2 gap-1'>
      <IoRestaurantOutline   className='text-2xl text-gray-700'/>
          <p ><span className='font-semibold'>Restaurant</span> <span>250m away</span></p>
        </li>
      <li className='flex item-center mb-2 gap-1'>
      <GiParkBench  className='text-2xl text-gray-700'/>
          <p ><span className='font-semibold'>Park</span> <span>100m away</span></p>
        </li>
      </ul>
      </div>
      </div>

      
            
    </main>
  );
}
