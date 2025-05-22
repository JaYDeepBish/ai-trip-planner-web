import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails } from "../../service/GlobalApi";

// Normalize place data keys for consistency
const normalizeKeys = (obj) =>
  Object.keys(obj || {}).reduce((acc, key) => {
    acc[key.toLowerCase()] = obj[key]; // Convert all keys to lowercase
    return acc;
  }, {});

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState("/placeholder.jpg");

  useEffect(() => {
    if (place?.placeName) {
      GetPlacePhoto(place);
    }
  }, [place]);

  const GetPlacePhoto = async (place) => {
    if (!place?.placeName) {
      console.warn("Place name is missing!");
      setPhotoUrl("/placeholder.jpg");
      return;
    }

    const data = { textQuery: place.placeName };

    try {
      const result = await GetPlaceDetails(data);

      const photoArray = result?.data?.places?.[0]?.photos;
      if (!photoArray || photoArray.length === 0) {
        console.warn("No photos available!");
        setPhotoUrl("/placeholder.jpg");
        return;
      }

      // Use the first photo instead of the third
      const photoName = photoArray[0].name;

      // Construct the correct URL
      const photoUrl = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=1000&maxWidthPx=1000&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;

      setPhotoUrl(photoUrl);
    } catch (error) {
      console.error("Error fetching place details:", error);
      setPhotoUrl("/placeholder.jpg"); // Fallback image
    }
  };

  // Normalize `place` properties before using them
  const normalizedPlace = normalizeKeys(place);

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(normalizedPlace["placename"] + ", " + normalizedPlace["address"])
      }
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src={photoUrl?photoUrl : './placeholder.jpg'} // Ensure image fallback
          alt={normalizedPlace["placename"]}
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />
        <div>     
          <h2 className="font-bold text-lg">{normalizedPlace["placename"]}</h2>
          <p className="text-sm text-gray-400">{normalizedPlace["placedetails"]}</p>
          <h2 className="mt-2"> 🕰️ {normalizedPlace["traveltime"] || "Unknown Travel Time"}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;