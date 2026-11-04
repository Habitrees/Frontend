import botanicalImage from "../../../assets/login-botanical.png";

export function BotanicalWelcome() {
  return (
    <aside className="botanical-panel hidden flex-col items-center overflow-hidden rounded-[28px] pb-9 text-center lg:flex" dir="rtl" aria-labelledby="botanical-heading">
      <div className="w-full px-6 pt-20">
        <h2 id="botanical-heading" className="text-login-heading xl:text-panel-heading font-extrabold text-botanical-heading">
          حالِ خوب،<br />از همین‌جا ریشه می‌گیره.
        </h2>
        <p className="mt-3.5 text-body text-botanical-copy">
          اینجا برای ساختن عادت‌های خوب کنار هم هستیم؛<br />قدم‌به‌قدم، برای رشد خودت.
        </p>
      </div>
      <img className="botanical-art shrink-0 object-contain" src={botanicalImage} alt="گلدانی از گل‌های صورتی و برگ‌های سبز" width={440} height={440} />
      <p className="mt-7 text-label text-botanical-heading">هر روز، یک برگ تازه</p>
      <div className="mt-5 flex items-center gap-1.5" aria-hidden="true">
        <span className="size-[5px] rounded-full bg-login-primary/40" />
        <span className="h-[5px] w-6 rounded-full bg-login-primary" />
        <span className="size-[5px] rounded-full bg-login-primary/40" />
      </div>
    </aside>
  );
}
