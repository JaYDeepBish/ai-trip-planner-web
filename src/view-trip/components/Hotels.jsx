import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails } from "../../service/GlobalApi";

// Normalize keys in hotel objects
const normalizeKeys = (obj) =>
  Object.keys(obj).reduce((acc, key) => {
    acc[key.toLowerCase()] = obj[key]; // Convert all keys to lowercase
    return acc;
  }, {});

function Hotels({ trip }) {
  const [hotelPhotos, setHotelPhotos] = useState({});

  useEffect(() => {
    if (trip?.userSelection?.location?.label && trip?.tripData?.hotels?.length > 0) {
      fetchHotelPhotos(trip.tripData.hotels);
    }
  }, [trip]);

  const fetchHotelPhotos = async (hotels) => {
    const photoData = {};
    await Promise.all(
      hotels.map(async (hotel) => {
        const normalizedHotel = normalizeKeys(hotel);
        const hotelName = normalizedHotel["hotelname"];

        if (!hotelName) {
          console.warn("Hotel name is missing!");
          photoData[hotelName] = "/placeholder.jpg";
          return;
        }

        const data = { textQuery: hotelName };

        try {
          const result = await GetPlaceDetails(data);

          const photoArray = result?.data?.places?.[0]?.photos;
          if (!photoArray || photoArray.length === 0) {
            console.warn("No photos available!");
            photoData[hotelName] = "/placeholder.jpg";
            return;
          }

          const photoName = photoArray[0].name; // Use first photo
          const photoUrl = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=1000&maxWidthPx=1000&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;

          photoData[hotelName] = photoUrl;
        } catch (error) {
          console.error("Error fetching place details:", error);
          photoData[hotelName] = "/placeholder.jpg";
        }
      })
    );

    setHotelPhotos(photoData);
  };

  // Normalize hotel data
  const hotels =
    trip?.tripData?.hotels?.map((hotel) => {
      const normalizedHotel = normalizeKeys(hotel);
      return {
        name: normalizedHotel["hotelname"],
        address: normalizedHotel["hoteladdress"],
        price: normalizedHotel["price"],
        imageUrl: normalizedHotel["hotelimageurl"] || "/placeholder.jpg", // Fallback image
        geoCoordinates: normalizedHotel["geocoordinates"],
        rating: normalizedHotel["rating"],
        description: normalizedHotel["description"],
      };
    }) || [];

  return (
    <div>
      <h2 className="font-bold text-xl mt-5 mb-4">Hotel Recommendation</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {hotels.map((hotel, index) => (
          <Link
            key={index}
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              encodeURIComponent(hotel.name + ", " + hotel.address)
            }
            target="_blank"
          >
            <div className="hover:scale-105 transition-all cursor-pointer">
              <img
                src={hotelPhotos[hotel.name] || hotel.imageUrl}
                alt={hotel.name}
                className="rounded-xl h-[180px] w-full object-cover"  
              />
              <div className="my-2 flex flex-col">
                <h2 className="font-medium">{hotel.name}</h2>
                <h2 className="text-xs text-gray-500">📍 {hotel.address}</h2>
                <h2 className="text-sm">💰 {hotel.price}</h2>
                <h2 className="text-sm">⭐ {hotel.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;