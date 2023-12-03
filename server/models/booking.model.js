import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  email: { type: String,
          // required: true,
              
           },
  userId: { type: String,
          // required: true,
              
           },
  booAt:{ type: Date,
        //   required: true,
              
          },
  PropertyName:{ type: String,
          // required: true,
               
            },
 
 
}, 
{timestamps: true});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;