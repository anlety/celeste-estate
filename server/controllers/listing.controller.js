import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    // Create a new Listing from The Listing model
    const listing = await Listing.create(req.body);
    return res.status(201).json({ listing });
  } catch (error) {
    next(error);
  }
};

export const deleteUserListing = async (req, res, next) => {
  // Check if the listing exist
  const listing = await Listing.findById(req.params.id);

  // If not found
  if (!listing) return next(errorHandler(401, "Listing not found"));

  // if the listing exist check if the user is the owner of the listing
  if (req.user.id !== listing.userRef)
    return next(errorHandler(401, "You can only delete your own listing"));
  try {
    await Listing.findByIdAndDelete(req.params.id);

    res.status(200).json("The listing has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updateUserListing = async (req, res, next) => {
  // Check if the listing exist
  const listing = await Listing.findById(req.params.id);

  // If not found
  if (!listing) return next(errorHandler(401, "Listing not found"));

  // if the listing exist check if the user is the owner of the listing
  if (req.user.id !== listing.userRef)
    return next(errorHandler(401, "You can only update your own listing"));
  try {
    const updateListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    // If there is no listing
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let office = req.query.office;

    if (office === undefined || office === 'false') {
      office = { $in: [false, true] };
    }
   
    let intercom = req.query.intercom ;
    if (intercom  === undefined || intercom  === 'false') {
      intercom  = { $in: [false, true] };
    }
    let swimmingPool = req.query.swimmingPool ;
    if (swimmingPool  === undefined || swimmingPool  === 'false') {
      swimmingPool  = { $in: [false, true] };
    }

    let balcony = req.query.balcony ;
    if (balcony  === undefined || balcony  === 'false') {
      balcony  = { $in: [false, true] };
    }
    let gym = req.query.gym ;
    if (gym  === undefined || gym  === 'false') {
      gym  = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }
  

    const searchTerm = req.query.searchTerm || "";
    // const title = req.query.title || "";

    const sort = req.query.sort || "createdAt";
    // const sort = req.query.sort || 'bedrooms';

    const order = req.query.order || "desc";

    const listings = await Listing.find({
      
      address: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      office,
      intercom,
      balcony,
      gym,
      swimmingPool,
      type,
    }).sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
