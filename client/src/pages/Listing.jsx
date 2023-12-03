

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import { MapContainer,TileLayer } from 'react-leaflet';
import 'swiper/css/bundle';
import {LiaToiletSolid} from 'react-icons/lia'
import {ImFloppyDisk} from 'react-icons/im'
import {TbAirConditioning} from 'react-icons/tb'
import {
  
  // FaChair,
 
  FaMapMarkerAlt,
 
  FaShare,
} from 'react-icons/fa';
// import {ImLocation2} from 'react-icons/im'
 import {BiBed, BiBath} from 'react-icons/bi'
 import {AiOutlineCar} from 'react-icons/ai';
 import {GiDesk} from 'react-icons/gi'
import Contact from '../components/Contact';
import Map from '../components/Map';

import balcony from '../assets/balcony.png'
import intercom from '../assets/intercom.png'
import office from '../assets/office.png'
import wardrobe from '../assets/wardrobe.png'
import gym from '../assets/gym.png'
import alarm from '../assets/alarm.png'
import garage from '../assets/garage1.png'
import pool from '../assets/swimingpool.png'
import sofa from '../assets/sofa.png'

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
    <main>
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
          <div className='w-full mt-3'>
            <p className='text-2xl font-semibold mb-3'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 mb-3 text-slate-600  text-lg font-semibold'>
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
              <li className='flex items-center gap-1 whitespace-nowrap '>
                
              {/* <div className="font-bold text-xs flex items-center gap-1">{listing.furnished ? <GiDesk className='text-lg '/> : ''} </div> */}
              {listing.office ? <GiDesk className='text-2xl '/> : ''}
              </li>
            </ul>

            {/* Landlord */}
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact agent
              </button>
            )}
            {contact && <Contact listing={listing} />}
            {/* New test */}
            


          </div>


         
          {/* Map */}
          <div className='w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2'>
        <MapContainer center={[53.35, 18.8]}  zoom={1} scrollWheelZoom={false} style={{height:"100%", width:"100%"}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    <Map address={listing.address}/>
  </MapContainer>
        </div>
 </div>

        </div>
      )}

      <div className='max-w-6xl mx-auto mt-8 mb-5'>
        <h3 className='text-lg font-semibold mb-3 mt-4'>Property features</h3>
            <div className='flex gap-12'>
                <div>
        <div className='flex item-center mb-2 gap-1'>
          
          <TbAirConditioning  className='text-3xl'/>
          <p>Air conditioning</p>
        </div>
        <div className='flex item-center mb-2 gap-1'>
        <img src={wardrobe} className='w-[30px] h-[30px]'/>
          <p>built-in wardrobes</p>
        </div>
        <div className='flex item-center mb-2 gap-1'>
          <img src={alarm} className='w-[30px] h-[30px] text-black'/>
          <p>Alarm</p>
        </div>
        <div className='flex item-center mb-2 gap-1'>
          <LiaToiletSolid className='text-2xl'/>
          <p>Toilet</p>
        </div>
        <div className='flex item-center mb-2 gap-1'>
        <img src={intercom} className='w-[30px] h-[30px]'/>
          <p>intercom</p>
        </div>
        <div className='flex item-center gap-1'>
          <img src={garage} className='w-[30px] h-[30px]'/>
          <p>Garage - space</p>
        </div>
             </div>
              <div>
        <div className='flex item-center gap-1'>
        <img src={balcony} className='w-[30px] h-[30px] mb-2'/>
          <p>Balcony</p>
        </div>
        <div className='flex item-center mb-2 gap-1'>
          <img src={sofa} className='w-[30px] h-[30px]'/>
          <p>Furnished</p>
        </div>
        <div className='flex item-center mb-2 gap-1'>
          <ImFloppyDisk className='text-2xl text-gray-700'/>
          <p>Dishwasher</p>
        </div>
        <div className='flex item-center mb-2 gap-1'>
        <img src={gym} className='w-[30px] h-[30px]'/>
          <p>Gym</p>
        </div>
        <div className='flex item-center mb-2 gap-1'>
        <img src={office} className='w-[30px] h-[30px]' />
          <p>Office</p>
        </div>
        <div className='flex item-center gap-1'>
          <img src={pool} className='w-[30px] h-[30px]'/>
          <p>Swimming pool - in-ground</p>
        </div>
            </div>

        </div>
      </div>

      <div className='max-w-6xl mx-auto mt-8 mb-8'>
        <h3 className='text-lg font-semibold mb-3 mt-4'>Inspections</h3>
        <p>7 days are currently available for inspections. <Link to='/inspection' className='text-blue-600 hover:text-blue-800'>Request a time </Link>to see this place</p>
      </div>
    </main>
  );
}
