import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  const normalizeItinerary = (itinerary) => {
    if (!itinerary) {
      console.warn("Itinerary is undefined or null.");
      return [];
    }

    if (Array.isArray(itinerary)) {
      return itinerary.map((item) => ({
        day: item?.day ?? item?.Day ?? "Unknown",
        plan: item?.Plan ?? item?.plan ?? item?.place ?? item?.Place ?? item?.Places ?? item?.places ?? [],
      }));
    } else if (typeof itinerary === 'object') {
      return Object.entries(itinerary).map(([dayKey, dayValue]) => ({
        day: dayKey.replace(/[^0-9]/g, '') || dayKey, // Extract day number or use key
        plan: Array.isArray(dayValue?.plan) ? dayValue.plan : Array.isArray(dayValue) ? dayValue : [],
      }));
    } else {
      console.warn("Unexpected itinerary format:", typeof itinerary, itinerary);
      return [];
    }
  };

  const itinerary = trip?.tripData?.itinerary ? normalizeItinerary(trip.tripData.itinerary) : [];

  return (
    <div>
      <h2 className="font-bold text-lg">Places to visit</h2>

      <div>
        {itinerary.length > 0 ? (
          itinerary.map((item, dayIndex) => (
            <div key={dayIndex}>
              <h2 className="font-medium text-lg">Day {item.day}</h2>
              <div className="grid grid-cols-2 gap-5">
                {item.plan?.length ? (
                  item.plan.map((place, placeIndex) => {
                    const travelTimeValue = place?.travelTime ?? place?.TravelTime ?? "Unknown Travel Time";
                    
                    return (
                      <div key={placeIndex} className="my-3">
                        <h2 className="font-medium text-sm text-orange-600">
                          {travelTimeValue}
                        </h2>
                        <PlaceCardItem place={place} />
                      </div>
                    );
                  })
                ) : (
                  <p>No plans available for this day.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No places found in the itinerary.</p>
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit;