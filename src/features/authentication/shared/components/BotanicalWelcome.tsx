import type { ReactNode } from "react";
import loginBotanicalImage from "../../../../assets/login-botanical.png";

export interface BotanicalWelcomeProps {
  heading?: ReactNode;
  description?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  variant?: "login" | "registration";
}

export function BotanicalWelcome({
  heading = <>حالِ خوب،<br />از همین‌جا ریشه می‌گیره.</>,
  description = <>اینجا برای ساختن عادت‌های خوب کنار هم هستیم؛<br />قدم‌به‌قدم، برای رشد خودت.</>,
  imageSrc = loginBotanicalImage,
  imageAlt = "گلدانی از گل‌های صورتی و برگ‌های سبز",
  variant = "login",
}: BotanicalWelcomeProps) {
  const registration = variant === "registration";
  const panelClass = registration ? "registration-botanical-panel" : "";
  const headingClass = registration ? "text-registration-panel-title" : "text-botanical-heading";
  const copyClass = registration ? "text-registration-panel-copy" : "text-botanical-copy";

  return (
    <aside className={`botanical-panel ${panelClass} hidden flex-col items-center overflow-hidden rounded-[28px] pb-9 text-center lg:flex`} dir="rtl" aria-labelledby="botanical-heading">
      <div className="botanical-copy-block w-full px-6">
        <h2 id="botanical-heading" className={`text-login-heading font-extrabold ${headingClass} xl:text-panel-heading`}>
          {heading}
        </h2>
        <p className={`mt-3.5 text-body ${copyClass}`}>{description}</p>
      </div>
      <img className="botanical-art shrink-0 object-contain" src={imageSrc} alt={imageAlt} width={440} height={440} />
      <p className={`mt-4 text-label ${headingClass}`}>هر روز، یک برگ تازه</p>
      <div className="mt-3 flex items-center gap-1.5" aria-hidden="true">
        <span className="size-[5px] rounded-full bg-login-primary/40" />
        <span className="h-[5px] w-6 rounded-full bg-login-primary" />
        <span className="size-[5px] rounded-full bg-login-primary/40" />
      </div>
    </aside>
  );
}
