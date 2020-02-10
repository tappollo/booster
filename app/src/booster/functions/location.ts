import { assertLocationPermission } from "./permissions";
import Geolocation from "react-native-geolocation-service";

export const getLocation = async () => {
  await assertLocationPermission();
  return await new Promise<{ lat: string; lng: string }>((ful, rej) => {
    Geolocation.getCurrentPosition(
      async location => {
        const { latitude: lat, longitude: lng } = location.coords;
        ful({ lat: String(lat), lng: String(lng) });
      },
      error => {
        rej(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 1000
      }
    );
  });
};
