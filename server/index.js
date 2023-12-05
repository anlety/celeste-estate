import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.router.js";
import listingRoute from "./routes/listing.route.js";
import bookingRoute from "./routes/booking.router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
// import path from 'path'
dotenv.config();

// Connection to mongoDB
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Successfully connected to MongoDb");
  })
  .catch((err) => {
    console.log(err);
  });

  // const __dirname = path.resolve();

// const __dirname = path.resolve();
const app = express();
// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });


app.use(express.json());
app.use(cookieParser());

app.listen(4000, () => {
  console.log(`The server is running on port 4000`);
});
app.use(cors());



app.use("/server/user", userRoute);
app.use("/server/auth", authRoute);
app.use("/server/listing", listingRoute);
app.use("/server/booking", bookingRoute);

// app.use(express.static(path.join(__dirname, '/client/dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// })


// Handling error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});




// mongoose.connect("mongodb+srv://leti:kongolo@cluster0.sqfsvmc.mongodb.net/celeste-estate?retryWrites=true&w=majority").then(() => {console.log('Successfully connected to MongoDb');}).catch(err => {console.log(err);});

// Listen to a port number



