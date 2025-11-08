import { useState, useCallback } from 'react';
import type { Coordinates } from '../types.ts';

export const useGeolocation = () => {
  const [position, setPosition] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getPosition = useCallback(() => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("La géolocalisation n'est pas supportée par votre navigateur.");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        let errorMessage = "Impossible d'obtenir votre position. ";
        switch(err.code) {
          case err.PERMISSION_DENIED:
            errorMessage += "Vous avez refusé l'accès à la localisation.";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage += "Les informations de localisation ne sont pas disponibles.";
            break;

          case err.TIMEOUT:
            errorMessage += "La demande de localisation a expiré.";
            break;
          default:
            errorMessage += "Une erreur inconnue est survenue.";
            break;
        }
        setError(errorMessage);
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  return { position, error, isLoading, getPosition };
};