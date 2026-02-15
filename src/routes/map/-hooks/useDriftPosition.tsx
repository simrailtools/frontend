import { useCallback, useEffect, useRef } from "react";
import { useMap } from "react-map-gl/maplibre";

/**
 * Type representing a geographical position, identified by latitude and longitude.
 */
type LatLng = {
  latitude: number;
  longitude: number;
};

/**
 * Executes a linear interpolation between the given start and end values.
 * @param a interpolation start.
 * @param b interpolation end.
 * @param t interpolation factor.
 */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const useDriftPosition = (
  initial: LatLng,
  slideDurationMs: number,
  setPosition: (lat: number, lon: number) => void,
) => {
  const { current: map } = useMap();

  const startPosRef = useRef<LatLng>(initial);
  const destPosRef = useRef<LatLng>(initial);
  const currentPosRef = useRef<LatLng>(initial);

  const untilTimestampRef = useRef(0);
  const timerIdRef = useRef<number | undefined>(undefined);

  // callback to update the current position
  const updatePosition = useCallback(
    (lat: number, lon: number) => {
      setPosition(lat, lon);
      currentPosRef.current = { latitude: lat, longitude: lon };
    },
    [setPosition],
  );

  // callback to cancel the current running timer
  const cancelTimer = useCallback(() => {
    if (timerIdRef.current !== undefined) {
      window.clearTimeout(timerIdRef.current);
      timerIdRef.current = undefined;
    }
  }, []);

  // function to request stepping the current running marker animation
  const tickMarker = useCallback(() => {
    const now = performance.now();
    const remaining = untilTimestampRef.current - now;
    if (remaining <= 0) {
      const { latitude, longitude } = destPosRef.current;
      updatePosition(latitude, longitude);
      cancelTimer();
      return;
    }

    const startPos = startPosRef.current;
    const destPos = destPosRef.current;
    const percentDone = (slideDurationMs - remaining) / slideDurationMs;
    updatePosition(
      lerp(startPos.latitude, destPos.latitude, percentDone),
      lerp(startPos.longitude, destPos.longitude, percentDone),
    );

    // step the marker again in 50ms (to get ~20fps)
    timerIdRef.current = window.setTimeout(tickMarker, 50);
  }, [cancelTimer, slideDurationMs, updatePosition]);

  // function to request sliding the marker to a given position
  const slideTo = useCallback(
    (lat: number, lon: number) => {
      // cancel the current running marker step request
      cancelTimer();

      // if the map is not yet (or no longer) present, just set the target position (nothing to animate on)
      if (!map) {
        updatePosition(lat, lon);
        return;
      }

      startPosRef.current = currentPosRef.current;
      destPosRef.current = { latitude: lat, longitude: lon };
      untilTimestampRef.current = performance.now() + slideDurationMs;
      timerIdRef.current = window.setTimeout(tickMarker, 0);
    },
    [map, slideDurationMs, cancelTimer, tickMarker, updatePosition],
  );

  // effect to cancel any pending step request when unmounting
  useEffect(
    () => () => {
      cancelTimer();
    },
    [cancelTimer],
  );

  return { slideTo, currentPosRef };
};
