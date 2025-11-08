import type { Coordinates } from '../types';

/**
 * Calcule la distance en mètres entre deux points GPS en utilisant la formule de Haversine.
 * @param pos1 - Les premières coordonnées (latitude, longitude).
 * @param pos2 - Les deuxièmes coordonnées (latitude, longitude).
 * @returns La distance en mètres.
 */
export const haversineDistance = (pos1: Coordinates, pos2: Coordinates): number => {
  const R = 6371e3; // Rayon de la Terre en mètres
  const φ1 = pos1.latitude * Math.PI / 180; // φ, λ en radians
  const φ2 = pos2.latitude * Math.PI / 180;
  const Δφ = (pos2.latitude - pos1.latitude) * Math.PI / 180;
  const Δλ = (pos2.longitude - pos1.longitude) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // en mètres
};
