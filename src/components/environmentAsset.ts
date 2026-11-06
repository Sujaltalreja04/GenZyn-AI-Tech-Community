const CITY_ENVIRONMENT_URL =
  'https://raw.githack.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/hdri/potsdamer_platz_1k.hdr';
const ENVIRONMENT_CACHE_NAME = 'genzyn-3d-environment-v1';

let environmentBytesPromise: Promise<ArrayBuffer> | null = null;

async function loadEnvironmentBytes(): Promise<ArrayBuffer> {
  let assetCache: Cache | null = null;
  if ('caches' in window) {
    try {
      assetCache = await window.caches.open(ENVIRONMENT_CACHE_NAME);
      const cached = await assetCache.match(CITY_ENVIRONMENT_URL);
      if (cached) return await cached.arrayBuffer();
    } catch {
      // Cache Storage may be unavailable in private browsing.
    }
  }

  const response = await fetch(CITY_ENVIRONMENT_URL, { cache: 'force-cache', mode: 'cors' });
  if (!response.ok) {
    throw new Error(`Unable to load the city environment map (${response.status})`);
  }

  if (assetCache) {
    // Persist independently so storage latency cannot delay the first render.
    void assetCache.put(CITY_ENVIRONMENT_URL, response.clone()).catch(() => {});
  }
  return response.arrayBuffer();
}

export function getEnvironmentBytes(): Promise<ArrayBuffer> {
  if (!environmentBytesPromise) {
    environmentBytesPromise = loadEnvironmentBytes().catch((error) => {
      environmentBytesPromise = null;
      throw error;
    });
  }
  return environmentBytesPromise;
}
