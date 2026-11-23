import type { HabitIcon } from '../types';

// Vite resolves these local imports at build time. Missing source files cause a
// build failure rather than invisible 404 icons when /public assets are moved.
// All UI icons are the original SVG assets from the supplied Figma Make code.
import notificationImage from '../assets/icons/desktop/ebffe.svg';
import brandMarkImage from '../assets/icons/desktop/73806.svg';
import newHabitArrowImage from '../assets/icons/desktop/20c07.svg';
import sortChevronImage from '../assets/icons/desktop/2481a.svg';
import menuImage from '../assets/icons/desktop/a5f59.svg';
import editImage from '../assets/icons/desktop/fcabc.svg';
import trashImage from '../assets/icons/desktop/1e03b.svg';
import checkImage from '../assets/icons/desktop/cfa04.svg';
import flameImage from '../assets/icons/desktop/cc172.svg';
import groupsImage from '../assets/icons/responsive/5253a.svg';
import gardenImage from '../assets/icons/responsive/33e6d.svg';
import habitsImage from '../assets/icons/responsive/32cca.svg';
import dashboardImage from '../assets/icons/responsive/83570.svg';
import waterDesktopImage from '../assets/icons/desktop/6b6bd.svg';
import waterResponsiveImage from '../assets/icons/responsive/bfd9a.svg';
import studyDesktopImage from '../assets/icons/desktop/d0668.svg';
import studyResponsiveImage from '../assets/icons/responsive/f3093.svg';
import exerciseDesktopImage from '../assets/icons/desktop/c5c1e.svg';
import exerciseResponsiveImage from '../assets/icons/responsive/deb60.svg';
import mindfulnessDesktopImage from '../assets/icons/desktop/4f2b7.svg';
import mindfulnessResponsiveImage from '../assets/icons/responsive/b56b8.svg';
import sleepDesktopImage from '../assets/icons/desktop/5f453.svg';
import sleepResponsiveImage from '../assets/icons/responsive/38a3b.svg';
import bluebellImage from '../assets/plants/bluebell.png';
import daisyImage from '../assets/plants/daisy.png';
import lavenderImage from '../assets/plants/lavender.png';

export const decorativeAssets = {
  notification: notificationImage,
  brandMark: brandMarkImage,
  newHabitArrow: newHabitArrowImage,
  sortChevron: sortChevronImage,
  menu: menuImage,
  edit: editImage,
  trash: trashImage,
  check: checkImage,
  flame: flameImage,
} as const;

export const mobileNavAssets = {
  groups: groupsImage,
  garden: gardenImage,
  habits: habitsImage,
  dashboard: dashboardImage,
} as const;

// The three user-provided transparent PNGs are used, not any old placeholder plants.
// full.png = bluebell; full (1).png = daisy; full (2).png = lavender.
export const habitAssets: Record<HabitIcon, {
  iconDesktop: string;
  iconResponsive: string;
  plant: string;
  plantName: string;
}> = {
  water: { iconDesktop: waterDesktopImage, iconResponsive: waterResponsiveImage,
    plant: bluebellImage, plantName: 'گل زنگوله‌ای آبی' },
  study: { iconDesktop: studyDesktopImage, iconResponsive: studyResponsiveImage,
    plant: lavenderImage, plantName: 'اسطوخودوس' },
  exercise: { iconDesktop: exerciseDesktopImage, iconResponsive: exerciseResponsiveImage,
    plant: daisyImage, plantName: 'گل مینا' },
  mindfulness: { iconDesktop: mindfulnessDesktopImage, iconResponsive: mindfulnessResponsiveImage,
    plant: lavenderImage, plantName: 'اسطوخودوس' },
  sleep: { iconDesktop: sleepDesktopImage, iconResponsive: sleepResponsiveImage,
    plant: bluebellImage, plantName: 'گل زنگوله‌ای آبی' },
};
