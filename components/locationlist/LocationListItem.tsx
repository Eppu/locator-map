import React from 'react';
import { Location, UserLocation } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

interface LocationListItemProps {
  location: Location;
  userLocation: UserLocation | null;
  locationToUser: string;
}

const LocationListItem: React.FC<LocationListItemProps> = ({
  location,
  locationToUser,
}) => {
  return (
    <Link
      href={location.detail?.wiki as string}
      rel="noopener noreferrer"
      target="_blank"
    >
      {/* When screen is below md breakpoint show all data in column */}
      <div className="rounded-lg border border-transparent px-5 py-4 transition-colors border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/30">
        <h2 className={`mb-3 text-2xl font-semibold`}>
          {location.detail?.name}
        </h2>

        <h3 className="text-lg">Distance: {locationToUser} km</h3>

        <div className="mb-4">
          <div className=" text-sm opacity-50">
            <p>Height: {location.detail?.height} m</p>
          </div>

          <div className="text-sm opacity-50">
            <p>Weight: {location.detail?.mass} kg</p>
          </div>
        </div>
        <div className="relative h-72">
          <Image
            src={location.detail?.image as string}
            alt={location.detail?.name as string}
            layout="fill"
            className="rounded-lg"
            objectFit="cover"
          />
        </div>
      </div>
    </Link>
  );
};

export default LocationListItem;
