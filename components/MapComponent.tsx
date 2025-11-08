import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { Coordinates } from '../types.ts';

interface MapComponentProps {
  userPosition: Coordinates;
  riddleLocation: Coordinates;
  riddleLocationName: string;
}

const RecenterAutomatically: React.FC<{ userPosition: Coordinates, riddleLocation: Coordinates }> = ({ userPosition, riddleLocation }) => {
  const map = useMap();
  useEffect(() => {
    map.fitBounds([
      [userPosition.latitude, userPosition.longitude],
      [riddleLocation.latitude, riddleLocation.longitude]
    ], { padding: [50, 50] });
  }, [userPosition, riddleLocation, map]);
  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ userPosition, riddleLocation, riddleLocationName }) => {
  const userLatLng: [number, number] = [userPosition.latitude, userPosition.longitude];
  const riddleLatLng: [number, number] = [riddleLocation.latitude, riddleLocation.longitude];

  return (
    <div className="mt-4 h-80 w-full rounded-lg overflow-hidden border-2 border-green-400/50 animate-fade-in">
      <MapContainer center={riddleLatLng} zoom={15} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={userLatLng}>
          <Popup>Vous êtes ici.</Popup>
        </Marker>
        <Marker position={riddleLatLng}>
          <Popup>Lieu de l'énigme : <br /> {riddleLocationName}</Popup>
        </Marker>
        <RecenterAutomatically userPosition={userPosition} riddleLocation={riddleLocation} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;