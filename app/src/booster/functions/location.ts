import { assertLocationPermission } from "./permissions";
import Geolocation from "react-native-geolocation-service";

export const getLocation = async () => {
  await assertLocationPermission();
  return await new Promise<{ lat: number; lng: number }>((ful, rej) => {
    Geolocation.getCurrentPosition(
      async location => {
        const { latitude: lat, longitude: lng } = location.coords;
        ful({ lat, lng });
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
