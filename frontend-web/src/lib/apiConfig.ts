// Determine backend URL based on environment
const getBackendURL = (): string => {
  // If running on Firebase domain
  if (typeof window !== 'undefined' && window.location.hostname === 'chemical-equipment-visua-79693.web.app') {
    return 'https://chemical-equipment-visualizer-xtbs.onrender.com/api/';
  }
  // If running on localhost (local development)
  if (typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.includes('192.168') ||
    window.location.hostname.includes('172.')
  )) {
    return 'http://localhost:8000/api/';
  }
  // Default to local
  return 'http://localhost:8000/api/';
};

export const BASE_URL = getBackendURL();
export const AUTH_BASE = getBackendURL() + 'auth/';