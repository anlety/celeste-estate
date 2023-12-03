import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js';

export const verifyToken =(req, res, next) => {
  // get the data from the token
  const token = req.cookies.access_token;

  // Verify if there is no token
  if(!token) return next(401, 'You are not authorize') 

  // Check if the token if correct using jwt
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(err) return next(errorHandler(403, 'Forbidden'));

    // save the user to the request and then next
    req.user = user;
    next();
  })
}