import React, { useEffect, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import { MapProps, Location } from '@/types';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DynamicMap: React.FC<MapProps> = ({
  decodedData,
  userLocation,
  onUserLocationSet,
}) => {
  const mapRef = useRef<any | null>(null);

  useEffect(() => {
    if (mapRef.current && userLocation) {
      mapRef.current.setView([userLocation.lat, userLocation.long], 2);
    }
  }, [userLocation]);

  const handleOnUserLocationSet = (e: any) => {
    const { lat, lng } = e.latlng;
    onUserLocationSet({ lat, long: lng });
  };

  // When the user clicks on the map, the `handleOnUserLocationSet` function is called with the event object. This function extracts the latitude and longitude from the event object and calls the `onUserLocationSet` function with the new location. This function is passed in as a prop from the parent component. The `useMapEvents` hook is used to listen for the click event on the map.
  // When the click happens, we should create a marker on the map displaying the user's location
  // When this value is updated, the map's zoom level should remain the same.

  function UserLocationMarker() {
    const map = useMapEvents({
      click: handleOnUserLocationSet,
    });

    if (userLocation) {
      return (
        <Marker
          position={[userLocation.lat, userLocation.long]}
          icon={
            new Leaflet.Icon.Default({
              iconRetinaUrl: '/leaflet/images/marker-icon-2x-green.png',
              iconUrl: '/leaflet/images/marker-icon-green.png',
              shadowUrl: '/leaflet/images/marker-shadow.png',
            })
          }
        />
      );
    }
    return null;
  }

  useEffect(() => {
    // This is a workaround for the marker icon not showing up in the map due to an issue with the Leaflet library and Next.js.
    (async function init() {
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
        iconUrl: 'leaflet/images/marker-icon.png',
        shadowUrl: 'leaflet/images/marker-shadow.png',
      });
    })();
  }, []);

  return (
    <MapContainer center={[0, 0]} zoom={2} ref={mapRef}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      {Object.values(decodedData).map((location: Location) => (
        <Marker key={location.id} position={[location.lat, location.long]}>
          <Popup>{location.detail?.name}</Popup>
        </Marker>
      ))}
      <UserLocationMarker />
    </MapContainer>
  );
};

export default DynamicMap;
