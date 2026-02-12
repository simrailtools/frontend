import { useCallback, useEffect, useRef, useState } from "react";
import { useMap } from "react-map-gl/maplibre";

/**
 * Type representing a geographical position, identified by latitude and longitude.
 */
type LatLng = {
  latitude: number;
  longitude: number;
};

/**
 *
 * @param a
 * @param b
 * @param t
 */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const useDriftPosition = (initial: LatLng, slideDurationMs: number) => {
  const { current: map } = useMap();
  const [pos, setPos] = useState<LatLng>(initial);

  const startPosRef = useRef<LatLng>(initial);
  const destPosRef = useRef<LatLng>(initial);
  const currentPosRef = useRef<LatLng>(initial);

  const untilTimestampRef = useRef(0);
  const lastPaintTimestampRef = useRef(0);
  const animationFrameRequestHandleRef = useRef<number | null>(null);

  // callback to update the current position
  const updatePosition = useCallback((pos: LatLng) => {
    setPos(pos);
    currentPosRef.current = pos;
  }, []);

  // callback to cancel the current animation frame request
  const cancelAnimationFrameRequest = useCallback(() => {
    const frameHandle = animationFrameRequestHandleRef.current;
    animationFrameRequestHandleRef.current = null;
    if (frameHandle) {
      cancelAnimationFrame(frameHandle);
    }
  }, []);

  // function to request stepping the current running marker animation
  const stepMarkerAnimation = useCallback(() => {
    const now = performance.now();
    const remaining = untilTimestampRef.current - now;
    if (remaining <= 0) {
      updatePosition(destPosRef.current);
      cancelAnimationFrameRequest();
      return;
    }

    const startPos = startPosRef.current;
    const destPos = destPosRef.current;
    const percentDone = (slideDurationMs - remaining) / slideDurationMs;
    const framePoint: LatLng = {
      latitude: lerp(startPos.latitude, destPos.latitude, percentDone),
      longitude: lerp(startPos.longitude, destPos.longitude, percentDone),
    };

    const lastPaintTimestamp = lastPaintTimestampRef.current;
    const elapsedTimeSinceLastPaint = now - lastPaintTimestamp;
    if (elapsedTimeSinceLastPaint >= 50) {
      // only trigger re-render once every 50ms
      updatePosition(framePoint);
      lastPaintTimestampRef.current = now;
    }

    animationFrameRequestHandleRef.current = requestAnimationFrame(stepMarkerAnimation);
  }, [cancelAnimationFrameRequest, slideDurationMs, updatePosition]);

  // function to request sliding the marker to a given position
  const slideTo = useCallback(
    (target: LatLng) => {
      // stop previous animation frame request, will be overridden now
      cancelAnimationFrameRequest();

      // if the map is not yet (or no longer) present, just set the target position (nothing to animate on)
      if (!map) {
        updatePosition(target);
        return;
      }

      destPosRef.current = target;
      startPosRef.current = currentPosRef.current;
      untilTimestampRef.current = performance.now() + slideDurationMs;
      animationFrameRequestHandleRef.current = requestAnimationFrame(stepMarkerAnimation);
    },
    [map, slideDurationMs, cancelAnimationFrameRequest, stepMarkerAnimation, updatePosition],
  );

  // effect to cancel any pending animation frame request when unmounting
  useEffect(() => {
    return () => {
      cancelAnimationFrameRequest();
    };
  }, [cancelAnimationFrameRequest]);

  return { pos, slideTo };
};
