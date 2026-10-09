'use client';

import { useEffect } from 'react';
import { captureUtmParams } from '../utm';

/** Stores campaign UTM tags from the landing URL. Renders nothing. */
export function UtmTracker() {
  useEffect(() => {
    captureUtmParams(window.location.search);
  }, []);

  return null;
}
