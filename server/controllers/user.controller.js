import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.send("hello Monde");
};

export const updateUser = async (req, res, next) => {
  // if the request.user from the verify user is not equal to the id from the params return error
  if (req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account!"));

  // if everything is correct update the user
  try {
    // Encrypt the password if there is one
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    // Update the user
    const updateUser = await User.findByIdAndUpdate(
      req.params.id, {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        }
      },
      { new: true }
    );

    // Separating the password and the rest
    const { password, ...rest } = updateUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  if(req.user.id !== req.params.id) return next(errorHandler(401, "You can only delete your own account"))
  try {
    await User.findByIdAndDelete(req.params.id)
    res.clearCookie('access_token');
    res.status(200).json("The user has been deleted");
  } catch (error) {
    next(error)
  }
}

export const getUserListing = async(req, res, next) => {
 if(req.user.id == req.params.id) {
  try {
    const listings = await Listing.find({userRef: req.params.id});
    res.status(200).json(listings);
  } catch (error) {
    next(error)
  }

 }else{
  return next(errorHandler(401, "You can only view your own listings"))
 }
}

export const getUser = async(req, res, next) => {

  try {
    const user = await User.findById(req.params.id)

    // If the user doest not exist
    if(!user) {return next(errorHandler(404, "User not found"))}

    const {password: pass, ...rest} = user._doc;
    res.status(200).json(rest)

  } catch (error) {
    next(error)
  }
}