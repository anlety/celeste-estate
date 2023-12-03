import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const signup = async(req, res, next) => {
  // Destructure the date coming from the user
  const {username, email, password} = req.body;

  // After getting the password hash before to save it to the database
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Create a new user with the User model and save it to the database
  const newUser = new User({username, email, password: hashedPassword});

  try {
      await newUser.save()
  res.status(200).json('User created successfully')
  } catch (error) {
    next(error)
  }

}

export const signin = async(req, res, next) => {
  // Destructure the date coming from the user
  const {email, password} = req.body;

  try {
    // Check if the email is valid with the mongoDB method findOne()
     const validUser = await User.findOne({email})

    //  if the email does not match
    if(!validUser) 
      return next(errorHandler(404, 'User not found!'))

      // Compare password with a bcryptjs method compareSync()
      const validPassword = bcryptjs.compareSync(password, validUser.password)
    if(!validPassword) return next(errorHandler(404, "Wrong credentials"));

    // When the 2 credential are  correct, use jsonwebtoken to authenticate the user
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)

    // We want to remove and keep the rest the password before sending it to the user
    const {password: pass, ...rest} = validUser._doc

    // After creating the token we want to save it as a cookie
    res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)
    
  
  } catch (error) {
    next(error)
  }

}

// Google authentication
// export const google = async(req, res, next) => {
//   try {
//     // Check if the user exist
//     const user = await User.findOne({email: req.body.email})
//     // If yes create a token for the user
//     if (user) {
//     const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
//     // remove the password and keep the rest
//     const {password: pass, ...rest} = user._doc;
//     res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)
//   }else{
//     // create a  random password
//     const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)

//     // Hash the password
//     const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
//     // Save the user
//     const newUser = new User({username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email: req.body.email , password: hashedPassword, avatar: req.body.photo});
//     await newUser.save()

//     const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
//     // remove the password and keep the rest
//     const {password: pass, ...rest} = newUser._doc;
//     res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)
//   }
   
    
//   } catch (error) {
//     next(error)
//   }
// }

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res, next) => {
//  Just clear the cookie
try {
  res.clearCookie('access_token');
  res.status(200).json('User has been logged out')
} catch (error) {
  next(error)
}

}

