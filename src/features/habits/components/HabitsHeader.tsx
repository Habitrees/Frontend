import { Link } from 'react-router-dom';
import { decorativeAssets, mobileNavAssets } from './habitAssets';

/** No dashboard link: My Habits is now the landing page of this mock app. */
export function HabitsHeader() {
  return <>
    <header className="topbar">
      <span className="profile" aria-label="نمایهٔ آزمایشی کاربر">س</span>
      <span className="icon-button" title="اعلان‌ها هنوز فعال نشده‌اند">
        <img src={decorativeAssets.notification} alt="اعلان‌ها" />
      </span>
      <span className="topbar-title brand-title" lang="en">habitree</span>
      <span className="brand-mark" aria-hidden="true"><img src={decorativeAssets.brandMark} alt="" /></span>
    </header>
    <nav className="tablet-nav" aria-label="ناوبری تبلت">
      <span aria-disabled="true">گروه‌ها</span>
      <span aria-disabled="true">باغچهٔ من</span>
      <Link to="/my-habits" aria-current="page" className="active">عادت‌های من</Link>
    </nav>
  </>;
}

export function HabitsMobileNavigation() {
  return <nav className="bottom-nav" aria-label="ناوبری موبایل" dir="rtl">
    <Link to="/my-habits" aria-current="page" className="active">
      <img src={mobileNavAssets.habits} alt="" /><span>عادت‌های من</span>
    </Link>
    <span aria-disabled="true"><img src={mobileNavAssets.garden} alt="" /><span>باغچهٔ من</span></span>
    <span aria-disabled="true"><img src={mobileNavAssets.groups} alt="" /><span>گروه‌ها</span></span>
  </nav>;
}
