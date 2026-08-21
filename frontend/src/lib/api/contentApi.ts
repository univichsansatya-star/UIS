import API_BASE_URL, { resolveMediaUrl } from './apiConfig';
import {
  mockCampusProfiles,
  mockCampusStats,
  mockContactInfo,
  mockHeroSlides,
  mockPopupAnnouncement,
  mockRectorGreeting,
  mockVideoTour,
  mockVisionMission,
} from './mockData';

async function getContent<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}/${path}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    if (Array.isArray(data)) return data as T;
    if (Array.isArray(data.results)) return data.results as T;
    return data as T;
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    return fallback;
  }
}

export const getContactInfo = () => getContent('contact-info/', mockContactInfo);
export const getCampusStats = () => getContent('campus-stats/', mockCampusStats);
export const getRectorGreeting = () => getContent('rector-greeting/', mockRectorGreeting);
export const getHeroSlides = () => getContent('hero-slides/', mockHeroSlides);
export const getVideoTour = () => getContent('video-tour/', mockVideoTour);
export const getVisionMission = () => getContent('vision-mission/', mockVisionMission);
export const getCampusProfiles = () => getContent('campus-profile/', mockCampusProfiles);
export async function getPopupAnnouncement() {
  const popup = await getContent('popup-announcement/', null);
  if (!popup) return mockPopupAnnouncement;
  return {
    ...popup,
    image: resolveMediaUrl(popup.image),
  };
}