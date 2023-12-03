import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase.js";
import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  // console.log(currentUser.username);
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [deleteListingError, setDeleteListingError] = useState(false)
  // console.log(listing)
  // console.log(formData)
  // console.log(imagePercentage)
  // console.log(imageError)
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
      },
      (error) => {
        setImageError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/server/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async() => {
    try {
      dispatch(deleteUserStart())

      const res = await fetch(`/server/user/delete/${currentUser._id}`, {
        method: "DELETE"
      })
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  } 

  const handleSignOut = async() => {
    try {
      dispatch(signOutUserStart())
      const res  = await fetch('/server/auth/signout')
      const data = res.json();

      if(data.success === false) {
        dispatch(signOutUserFailure(error.message));
        return
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  }
  // Handle Show listing
 
  const handleShowListings = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/server/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  };

  // Handle delete listing
  const handleDeleteListing = async(listingId) => {
    try {
      const res = await fetch(`/server/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success === false) {
        setDeleteListingError(data.message);
        return
      }

      setUserListings((prev) => prev.filter((listing) => listing.id !== listingId))
    } catch (error) {
      setDeleteListingError(error.message)
    }
  }

 
 
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
          hidden
          accept="image/*"
        />
        <img
          src={formData?.avatar || currentUser.avatar}
          alt="profile picture"
          className="rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-600">
              Error image upload (image must be less than 2 mb)
            </span>
          ) : imagePercentage > 0 && imagePercentage < 100 ? (
            <span className="text-slate-700">{`uploading ${imagePercentage}%`}</span>
          ) : imagePercentage === 100 ? (
            <span className="text-green-600">Image successfully uploaded</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          id="username"
          placeholder="username"
          className="border p-3 rounded-lg bg-white"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="text"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 rounded-lg p-3 text-white uppercase hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          {loading ? "Loading..." : "UPDATE"}
          
        </button>
        <Link to={'/create-listing'} className='bg-green-500 text-white p-3 rounded-lg text-center uppercase hover:bg-green-700 transition duration-200 ease-in-out'>Create Listing</Link>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-500 hover:text-red-700 transition duration-200 ease-in-out cursor-pointer" onClick={handleDelete}>
          Delete account?
        </span>
        <span onClick={handleSignOut} className="text-red-500 hover:text-red-700 transition duration-200 ease-in-out cursor-pointer">
          Sign out
        </span>
      </div>
      <p className="text-red-600 mt-5">{error? error : ""}</p>
      <p className="text-green-600 mt-5">{updateSuccess? "User updated successfully" : ""}</p>
      <button className="text-green-600 w-full cursor-pointer" onClick = {handleShowListings}>Show listings</button>
      <p>{
        showListingError? "Error showing listings" : ""
}</p>
{userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
{userListings.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              {
                deleteListingError && (<p className="text-red-600">{deleteListingError}</p>)
              }

              <div className='flex flex-col item-center'>
                <button
                  onClick = {() => handleDeleteListing(listing._id)}
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-purple-700 uppercase'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
                  </div>
      )}

    </div>
  );
}
