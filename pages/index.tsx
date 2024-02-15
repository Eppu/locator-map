import { Inter } from 'next/font/google';
import Map from '@/components/map/Map';
import { useState } from 'react';
import { UserLocation } from '@/types';
import LocationList from '@/components/locationlist/LocationList';
import { decodeBase64 } from '@/utils/utils';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ locationData }: { locationData: any }) {
  const [userLocation, setUserLocation] = useState<null | UserLocation>(null);

  const handleUserLocationSet = (location: UserLocation) => {
    setUserLocation(location);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between lg:p-24 lg:pt-8 p-2  ${inter.className}`}
    >
      <h1 className="text-4xl font-semibold mb-4">Lifeform locator</h1>
      {/* TODO: Properly resize for mobile users */}
      <Map
        width={600}
        height={300}
        decodedData={locationData}
        userLocation={userLocation}
        onUserLocationSet={handleUserLocationSet}
      />
      <LocationList decodedData={locationData} userLocation={userLocation} />
    </main>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
  const data = await res.json();
  const decodedData = await decodeBase64(data.message);

  const detailsPromises = decodedData.map(
    async (item: { id: number; lat: number; long: number }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ENTITY_API_URL_BASE}/${item.id}.json`
      );
      const detail = await response.json();
      return { ...item, detail };
    }
  );

  const locationData = await Promise.all(detailsPromises);

  return {
    props: {
      locationData,
    },
  };
}
