import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    toilet: {
      type: Number,
      required: true,
    },
    squareFeet: {
      type: Number,
      
    },
    furnished: {
      type: Boolean,
     
    },
    intercom: {
      type: Boolean,
     
    },
    balcony: {
      type: Boolean,
     
    },
    gym: {
      type: Boolean,
     
    },
    office: {
      type: Boolean,
      
    },
    swimmingPool: {
      type: Boolean,
      
    },
    parking: {
      type: Number,
      required: true,
    },
    
    type: {
      type: String,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  }, {timestamps: true}
)

const Listing = mongoose.model('Listing', listingSchema)

export default Listing