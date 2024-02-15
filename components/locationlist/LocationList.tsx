import React from 'react';
import { Location, UserLocation } from '@/types';
import LocationListItem from './LocationListItem';
import { calculateDistance } from '@/utils/utils';

export interface LocationListProps {
  decodedData: Location[];
  userLocation: UserLocation | null;
}

const LocationList: React.FC<LocationListProps> = ({
  decodedData,
  userLocation,
}) => {
  const sortedLocations = Object.values(decodedData).sort((a, b) => {
    if (userLocation) {
      const distanceA = Number(
        calculateDistance(userLocation.lat, userLocation.long, a.lat, a.long)
      );
      const distanceB = Number(
        calculateDistance(userLocation.lat, userLocation.long, b.lat, b.long)
      );
      return distanceA - distanceB;
    }
    return 0;
  });

  return (
    <div>
      <h1 className="mb-8 mt-4 text-4xl font-semibold">
        Found {sortedLocations.length} entities on current world{' '}
      </h1>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left max-lg:text-center gap-2">
        {sortedLocations.map((location) => (
          <LocationListItem
            key={location.id}
            location={location}
            userLocation={userLocation}
            locationToUser={calculateDistance(
              userLocation ? userLocation.lat : 0,
              userLocation ? userLocation.long : 0,
              location.lat,
              location.long
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default LocationList;
