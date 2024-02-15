export interface SecretApiResponse {
  message: string;
}

export interface Detail {
  id: number;
  name: string;
  height: number;
  mass: number;
  gender: string;
  homeworld: string | string[];
  wiki: string;
  image: string;
  born: number;
  died: number;
  diedLocation: string;
  species: string;
  eyeColor: string;
  skinColor: string;
  affiliations: string[];
  kajidic?: string;
  formerAffiliations: string[];
}

export interface Location {
  id: number;
  lat: number;
  long: number;
  detail?: Detail;
}

export interface Locations {
  [key: string]: Location;
}

export interface UserLocation {
  lat: number;
  long: number;
}

export interface MapProps {
  width?: number;
  height?: number;
  decodedData: Location[];
  userLocation: UserLocation | null;
  onUserLocationSet: (location: UserLocation) => void;
}
