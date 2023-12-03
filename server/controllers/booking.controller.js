import Booking from "../models/booking.model.js"
// import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js"

export const bookListing = async(req, res, next) => {

  try {
    // Create a new Listing from The Listing model
    const Booking = await Booking.create(req.body)
    return res.status(201).json({listing})
  } catch (error) {
    next(error)
  }
}