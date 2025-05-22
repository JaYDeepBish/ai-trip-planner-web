import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { Button } from "../../components/ui/Button";
import { GetPlaceDetails } from "../../service/GlobalApi";
import axios from "axios";

const PHOTO_REF_URL='https://places.googleapis.com/v1/places/{NAME}/media?maxHeightPx=350&maxWidthPx=750&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY

function InfoSection({ trip }) {

 const [photoUrl,setPhotoUrl] =useState(null);

  useEffect(()=>{
 trip&&GetPlacePhoto();
  },[trip])
 
 const GetPlacePhoto = async () => {
  const data = {
    textQuery: trip?.userSelection?.location?.label,
  };

  try {
    const resp = await GetPlaceDetails(data);
    console.log(resp.data);
    const photoMeta = resp.data?.places?.[0]?.photos?.[0];
    if (!photoMeta?.name) return;

    const photoRef = photoMeta.name.split("/").pop();
    const PhotoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=750&photo_reference=${photoRef}&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;

    setPhotoUrl(PhotoUrl);
  } catch (err) {
    console.error("Error getting photo", err);
  }
};


  return (
    <div>
  <img
  src={photoUrl}
  alt="Location preview"
  className="h-[340px] w-full object-cover rounded-xl"
  onError={(e) => {
    console.warn("Image failed:", e.target.src);
    // Reduce resolution and retry loading
    const newUrl = e.target.src.replace("maxwidth=1000", "maxwidth=600"); 
    e.target.src = newUrl;
  }}
/>

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>
          <div className="hidden sm:flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅 {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🥂 {trip?.userSelection?.traveler} No. of Travelers
            </h2>
          </div>
        </div>
        <Button >
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;