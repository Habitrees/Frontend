import type { HabitIcon } from '../types';

// Vite resolves these local imports at build time. Missing source files cause a
// build failure rather than invisible 404 icons when /public assets are moved.
// All UI icons are the original SVG assets from the supplied Figma Make code.
import notificationImage from '../assets/icons/desktop/ebffe.svg';
import brandMarkImage from '../assets/icons/desktop/73806.svg';
import sortChevronImage from '../assets/icons/desktop/2481a.svg';
import menuImage from '../assets/icons/desktop/a5f59.svg';
import editImage from '../assets/icons/desktop/fcabc.svg';
import trashImage from '../assets/icons/desktop/1e03b.svg';
import groupsImage from '../assets/icons/responsive/5253a.svg';
import gardenImage from '../assets/icons/responsive/33e6d.svg';
import habitsImage from '../assets/icons/responsive/32cca.svg';
import bluebellImage from '../assets/plants/bluebell.png';
import daisyImage from '../assets/plants/daisy.png';
import lavenderImage from '../assets/plants/lavender.png';

export const decorativeAssets = {
  notification: notificationImage,
  brandMark: brandMarkImage,
  sortChevron: sortChevronImage,
  menu: menuImage,
  edit: editImage,
  trash: trashImage,
} as const;

export const mobileNavAssets = {
  groups: groupsImage,
  garden: gardenImage,
  habits: habitsImage,
} as const;

// The three user-provided transparent PNGs are used, not any old placeholder plants.
// full.png = bluebell; full (1).png = daisy; full (2).png = lavender.
export const habitAssets: Record<HabitIcon, {
  plant: string;
  plantName: string;
}> = {
  water: { plant: bluebellImage, plantName: 'گل زنگوله‌ای آبی' },
  study: { plant: lavenderImage, plantName: 'اسطوخودوس' },
  exercise: { plant: daisyImage, plantName: 'گل مینا' },
  mindfulness: { plant: lavenderImage, plantName: 'اسطوخودوس' },
  sleep: { plant: bluebellImage, plantName: 'گل زنگوله‌ای آبی' },
};
