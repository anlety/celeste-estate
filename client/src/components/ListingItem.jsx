import { Link } from "react-router-dom";

import { ImLocation2 } from "react-icons/im";
import { BiBed, BiBath } from "react-icons/bi";
import { AiOutlineCar } from "react-icons/ai";

import { LiaRulerCombinedSolid } from "react-icons/lia";
import { LuSofa } from "react-icons/lu";
import { FaComputer } from "react-icons/fa6";

const ListingItem = ({ listing }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[270px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
          }
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <ImLocation2 className="h-4 w-4 text-red-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>
          {/* <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p> */}
          <p className="text-slate-500 mt-2 font-semibold ">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-sm flex items-center gap-1">
              {listing.bedrooms} <BiBed className="text-lg" />
            </div>
            <div className="font-bold text-sm flex items-center gap-1">
              {listing.bathrooms} <BiBath className="text-lg" />
            </div>
            <div className="font-bold text-sm flex items-center gap-1">
              {listing.parking} <AiOutlineCar className="text-lg" />{" "}
            </div>
           {listing.office && (<div className="font-bold text-sm flex items-center gap-1">
              {listing.office} <FaComputer className="text-lg" />{" "}
            </div>)}
            <div className="font-bold text-sm flex items-center gap-1">
              {listing.furnished ? <LuSofa  className="text-lg" /> : ""}
            </div>
            
           
            
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
