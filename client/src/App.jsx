import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import GetInTouch from "./pages/GetInTouch";
import RequestAppraisal from "./components/RequestAppraisal";

import InspectionForm from "./components/InspectionForm";

function App() {
  

  return (
    <Router>
      
      <Header/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/contact" element={<GetInTouch/>} />
        <Route path="/request" element={<RequestAppraisal/>} />
        <Route path="/inspection" element={<InspectionForm/>} />
        <Route path='/listing/:listingId' element={<Listing/>} />
        
        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/create-listing" element={<CreateListing/>} />
          <Route path="/update-listing/:listingId" element={<UpdateListing/>} />
        </Route>
        

      </Routes>

      <Footer/>
     
    </Router>
  )
}

export default App
