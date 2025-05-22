import React, { useEffect, useState } from 'react';
import { GetPlaceDetails } from '../../service/GlobalApi';
import { Link } from 'react-router-dom'; // ✅ Correct import

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (trip?.userSelection?.location?.label) {
      GetPlacePhoto();
    }
  }, [trip?.userSelection?.location?.label]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip.userSelection.location.label,
    };

    try {
      const resp = await GetPlaceDetails(data);
      const photoMeta = resp.data?.places?.[0]?.photos?.[0];

      if (!photoMeta?.name) return;

      const photoRef = photoMeta.name.split("/").pop();
      const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=750&photo_reference=${photoRef}&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;

      setPhotoUrl(url);
    } catch (err) {
      console.error("Error getting photo", err);
    }
  };

  const location = trip?.userSelection?.location?.label || 'Unknown location';
  const days = trip?.userSelection?.noOfDays || '?';
  const budget = trip?.userSelection?.budget || '?';

  return (
    <Link to={`/view-trip/${trip.id}`}>
      <div className="hover:scale-105 rounded-xl shadow-md overflow-hidden max-w-md w-full hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <img
          src={photoUrl || '/placeholder.jpg'}
          alt={location}
          className="object-cover w-full h-[220px] rounded-t-xl"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/placeholder.jpg';
          }}
        />
        <div className="p-3">
          <h2 className="font-bold text-lg text-gray-800">{location}</h2>
          <h2 className="text-sm text-gray-500">
            {days} Days trip with {budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
