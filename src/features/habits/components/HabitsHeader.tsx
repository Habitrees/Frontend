import { Link } from 'react-router-dom';
import { decorativeAssets, mobileNavAssets } from './habitAssets';

/** Visual header from Figma Make. No desktop sidebar or duplicated heading. */
export function HabitsHeader() {
  return (
    <>
      <header className="topbar">
        <span className="profile" aria-label="نمایه نمایشی کاربر">س</span>
        <span className="icon-button" title="اعلان‌ها هنوز فعال نشده‌اند">
          <img src={decorativeAssets.notification} alt="اعلان‌ها" />
        </span>
        <span className="topbar-title brand-title" lang="en">habitree</span>
        <span className="brand-mark" aria-hidden="true">
          <img src={decorativeAssets.brandMark} alt="" />
        </span>
      </header>
      <nav className="tablet-nav" aria-label="ناوبری تبلت">
        <span aria-disabled="true" title="این بخش هنوز پیاده‌سازی نشده است">گروه‌ها</span>
        <span aria-disabled="true" title="این بخش هنوز پیاده‌سازی نشده است">باغچه من</span>
        <Link to="/my-habits" aria-current="page" className="active">عادت‌های من</Link>
        <Link to="/">داشبورد</Link>
      </nav>
    </>
  );
}

/** Mobile navigation displays only destinations actually implemented in the host. */
export function HabitsMobileNavigation() {
  const destinations = [
    { label: 'گروه‌ها', icon: mobileNavAssets.groups, to: null },
    { label: 'باغچه من', icon: mobileNavAssets.garden, to: null },
    { label: 'عادت‌های من', icon: mobileNavAssets.habits, to: '/my-habits' },
    { label: 'داشبورد', icon: mobileNavAssets.dashboard, to: '/' },
  ] as const;
  return (
    <nav className="bottom-nav" aria-label="ناوبری موبایل">
      {destinations.map(({ label, icon, to }) => {
        const content = <><img src={icon} alt="" aria-hidden="true" /><span>{label}</span></>;
        return to ? (
          <Link to={to} key={label} className={to === '/my-habits' ? 'active' : ''}
            aria-current={to === '/my-habits' ? 'page' : undefined}>{content}</Link>
        ) : (
          <span key={label} aria-disabled="true" title="این بخش هنوز پیاده‌سازی نشده است">{content}</span>
        );
      })}
    </nav>
  );
}
