import React from "react";

/**
 * Habitree responsive page.
 *
 * The original desktop, tablet and mobile compositions are kept intact and
 * selected with Tailwind breakpoints. Colors and typography use the tokens
 * declared in index.css.
 *
 * Breakpoints:
 * - Mobile: below md
 * - Tablet: md to below lg
 * - Desktop: lg and above
 */


/* ==================== Desktop layout ==================== */

const DesktopassetPathPrefix = "/assets"
const DesktopimgArrowLeft = `${DesktopassetPathPrefix}/4ca6d.svg`
const DesktopimgCheck = `${DesktopassetPathPrefix}/c27b0.svg`
const DesktopimgPlus = `${DesktopassetPathPrefix}/bede8.svg`
const DesktopimgIllustrationBotanicalGrowth = `${DesktopassetPathPrefix}/92921.svg`
const DesktopimgHeart = `${DesktopassetPathPrefix}/a0ee1.svg`
const DesktopimgSparkles = `${DesktopassetPathPrefix}/e3e30.svg`
const DesktopimgSprout = `${DesktopassetPathPrefix}/4f884.svg`
const DesktopimgSprout1 = `${DesktopassetPathPrefix}/66ddf.svg`
const DesktopimgFlame = `${DesktopassetPathPrefix}/7887f.svg`
const DesktopimgCircleCheck = `${DesktopassetPathPrefix}/7d63a.svg`
const DesktopimgUsers = `${DesktopassetPathPrefix}/4476a.svg`
const DesktopimgChartNoAxesColumnIncreasing = `${DesktopassetPathPrefix}/6624a.svg`
const DesktopimgSprout2 = `${DesktopassetPathPrefix}/73806.svg`
const DesktopimgGardenBackdrop = `${DesktopassetPathPrefix}/93b49.svg`
const DesktopimgOrbit = `${DesktopassetPathPrefix}/c9576.svg`
const DesktopimgIllustrationBotanicalGrowth1 = `${DesktopassetPathPrefix}/46545.svg`
const DesktopimgIllustrationBotanicalGrowth2 = `${DesktopassetPathPrefix}/942a3.svg`
const DesktopimgIllustrationBotanicalGrowth3 = `${DesktopassetPathPrefix}/4babf.svg`
const DesktopimgFloatingSeed = `${DesktopassetPathPrefix}/0f0f3.svg`
const DesktopimgFloatingSeed1 = `${DesktopassetPathPrefix}/323c0.svg`
const DesktopimgCheck1 = `${DesktopassetPathPrefix}/0b857.svg`
const DesktopimgIllustrationBotanicalGrowth4 = `${DesktopassetPathPrefix}/b0b53.svg`
const DesktopimgIllustrationBotanicalGrowth5 = `${DesktopassetPathPrefix}/65a06.svg`
const DesktopimgIllustrationBotanicalGrowth6 = `${DesktopassetPathPrefix}/e0980.svg`
const DesktopimgIllustrationBotanicalGrowth7 = `${DesktopassetPathPrefix}/a64e4.svg`
const DesktopimgIllustrationBotanicalGrowth8 = `${DesktopassetPathPrefix}/14798.svg`
const DesktopimgSprout3 = `${DesktopassetPathPrefix}/4a8e7.svg`
const DesktopimgIllustrationBotanicalGrowth9 = `${DesktopassetPathPrefix}/a8e5f.svg`
const DesktopimgIllustrationBotanicalGrowth10 = `${DesktopassetPathPrefix}/bf79d.svg`
const DesktopimgIllustrationBotanicalGrowth11 = `${DesktopassetPathPrefix}/9c0ae.svg`
const DesktopimgIllustrationBotanicalGrowth12 = `${DesktopassetPathPrefix}/73717.svg`
const DesktopimgBookOpen = `${DesktopassetPathPrefix}/76704.svg`
const DesktopimgDroplets = `${DesktopassetPathPrefix}/8c4d1.svg`
const DesktopimgFootprints = `${DesktopassetPathPrefix}/17a33.svg`
const DesktopimgSun = `${DesktopassetPathPrefix}/981e7.svg`
const DesktopimgLayoutDashboard = `${DesktopassetPathPrefix}/32c66.svg`
const DesktopimgSprout4 = `${DesktopassetPathPrefix}/8654e.svg`
const DesktopimgChartNoAxesColumnIncreasing1 = `${DesktopassetPathPrefix}/41482.svg`
const DesktopimgUsers1 = `${DesktopassetPathPrefix}/987d1.svg`
const DesktopimgHeart1 = `${DesktopassetPathPrefix}/32716.svg`
const DesktopimgHeart2 = `${DesktopassetPathPrefix}/e6329.svg`
const DesktopimgIllustrationBotanicalGrowth13 = `${DesktopassetPathPrefix}/4aa48.svg`

type DesktopHabitreeButtonProps = {
  className?: string
  context?: "Core"
  label?: string
  variant?: "Kind Signup · Viewport Desktop" | "Kind Login · Viewport Desktop" | "Kind Secondary · Viewport Desktop" | "Kind Primary · Viewport Desktop" | "Kind Completed · Viewport Desktop" | "Kind Log habit · Viewport Desktop" | "Kind Add habit · Viewport Desktop" | "Kind Footer link · Viewport Desktop"
}

function DesktopHabitreeButton({
  className,
  context = "Core",
  label = "ثبت‌نام",
  variant = "Kind Signup · Viewport Desktop",
}: DesktopHabitreeButtonProps) {
  const isCoreAndKindAddHabitViewportDesktop =
    context === "Core" && variant === "Kind Add habit · Viewport Desktop"
  const isCoreAndKindCompletedViewportDesktop =
    context === "Core" && variant === "Kind Completed · Viewport Desktop"
  const isCoreAndKindFooterLinkViewportDesktop =
    context === "Core" && variant === "Kind Footer link · Viewport Desktop"
  const isCoreAndKindLogHabitViewportDesktop =
    context === "Core" && variant === "Kind Log habit · Viewport Desktop"
  const isCoreAndKindLoginViewportDesktop =
    context === "Core" && variant === "Kind Login · Viewport Desktop"
  const isCoreAndKindPrimaryViewportDesktop =
    context === "Core" && variant === "Kind Primary · Viewport Desktop"
  const isCoreAndKindSecondaryViewportDesktop =
    context === "Core" && variant === "Kind Secondary · Viewport Desktop"
  return (
    <div
      className={
        className ||
        `content-stretch flex items-center overflow-clip relative ${
          isCoreAndKindFooterLinkViewportDesktop
            ? "h-[48px] justify-end min-h-[44px] w-[1440px]"
            : isCoreAndKindAddHabitViewportDesktop
              ? "bg-[var(--surface-soft)] gap-[8px] h-[48px] justify-center min-h-[48px] rounded-[12px] w-[1440px]"
              : isCoreAndKindLogHabitViewportDesktop
                ? "bg-[var(--background)] border border-[var(--surface-soft)] border-solid justify-center rounded-[14px] size-[44px]"
                : isCoreAndKindCompletedViewportDesktop
                  ? "bg-[var(--brand)] border border-[var(--brand)] border-solid justify-center rounded-[14px] size-[44px]"
                  : isCoreAndKindPrimaryViewportDesktop
                    ? "bg-[var(--brand)] gap-[8px] justify-center min-h-[48px] px-[24px] py-[8px] rounded-[12px]"
                    : isCoreAndKindSecondaryViewportDesktop
                      ? "bg-[var(--background)] border border-[var(--surface-soft)] border-solid justify-center min-h-[48px] px-[24px] py-[8px] rounded-[12px]"
                      : isCoreAndKindLoginViewportDesktop
                        ? "min-h-[48px] px-[8px]"
                        : "bg-[var(--brand)] min-h-[48px] px-[24px] rounded-[12px]"
        }`
      }
      id={
        isCoreAndKindFooterLinkViewportDesktop
          ? "node-44_14966"
          : isCoreAndKindAddHabitViewportDesktop
            ? "node-44_14955"
            : isCoreAndKindLogHabitViewportDesktop
              ? "node-44_14944"
              : isCoreAndKindCompletedViewportDesktop
                ? "node-44_14934"
                : isCoreAndKindPrimaryViewportDesktop
                  ? "node-44_14926"
                  : isCoreAndKindSecondaryViewportDesktop
                    ? "node-44_14919"
                    : isCoreAndKindLoginViewportDesktop
                      ? "node-44_14914"
                      : "node-44_14909"
      }
    >
      {context === "Core" && variant === "Kind Signup · Viewport Desktop" && (
        <p
          className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[14px] text-right text-white whitespace-nowrap"
          dir="auto"
        >
          {label}
        </p>
      )}
      {isCoreAndKindLoginViewportDesktop && (
        <p
          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[14px] text-right whitespace-nowrap"
          dir="auto"
        >
          {label}
        </p>
      )}
      {isCoreAndKindSecondaryViewportDesktop && (
        <p
          className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[15px] text-right whitespace-nowrap"
          dir="auto"
        >
          {label}
        </p>
      )}
      {isCoreAndKindPrimaryViewportDesktop && (
        <>
          <div
            className="relative shrink-0 size-[18px]"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={DesktopimgArrowLeft}
            />
          </div>
          <p
            className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[15px] text-right text-white whitespace-nowrap"
            dir="auto"
          >
            {label}
          </p>
        </>
      )}
      {isCoreAndKindCompletedViewportDesktop && (
        <div
          className="relative shrink-0 size-[18px]"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={DesktopimgCheck}
          />
        </div>
      )}
      {isCoreAndKindLogHabitViewportDesktop && (
        <div
          className="relative shrink-0 size-[18px]"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={DesktopimgPlus}
          />
        </div>
      )}
      {isCoreAndKindAddHabitViewportDesktop && (
        <>
          <p
            className="[word-break:break-word] font-sans font-semibold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[14px] text-right whitespace-nowrap"
            dir="auto"
          >
            {label}
          </p>
          <div
            className="relative shrink-0 size-[18px]"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={DesktopimgPlus}
            />
          </div>
        </>
      )}
      {isCoreAndKindFooterLinkViewportDesktop && (
        <p
          className="[word-break:break-word] flex-[1_0_0] font-sans font-normal leading-[1.9] min-w-px relative text-[var(--muted)] text-[14px] text-right"
          dir="auto"
        >
          {label}
        </p>
      )}
    </div>
  )
}

type DesktopHabitreeFooterMenuProps = {
  className?: string
  layout?: "Mobile 3"
  menuHeading1?: string
}

function DesktopHabitreeFooterMenu({
  className,
  layout = "Mobile 3",
  menuHeading1 = "همراهت هستیم",
}: DesktopHabitreeFooterMenuProps) {
  return (
    <div
      className={
        className ||
        "content-stretch flex flex-col gap-[8px] h-[184px] items-end overflow-clip relative w-[328px]"
      }
    >
      <p
        className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[15px] text-right w-full"
        dir="auto"
      >
        {menuHeading1}
      </p>
      <DesktopHabitreeButton
        className="content-stretch flex h-[44px] items-center justify-end min-h-[44px] overflow-clip relative shrink-0 w-full"
        label="ارتباط با ما"
        variant="Kind Footer link · Viewport Desktop"
      />
      <DesktopHabitreeButton
        className="content-stretch flex h-[44px] items-center justify-end min-h-[44px] overflow-clip relative shrink-0 w-full"
        label="حریم خصوصی"
        variant="Kind Footer link · Viewport Desktop"
      />
      <DesktopHabitreeButton
        className="content-stretch flex h-[44px] items-center justify-end min-h-[44px] overflow-clip relative shrink-0 w-full"
        label="شرایط استفاده"
        variant="Kind Footer link · Viewport Desktop"
      />
    </div>
  )
}

type DesktopHabitreeCardBrandPhilosophyProps = {
  className?: string
  philosophy1?: string
}

function DesktopHabitreeCardBrandPhilosophy({
  className,
  philosophy1 = "«لازم نیست سریع رشد کنی؛ کافی‌ست ادامه بدهی.»",
}: DesktopHabitreeCardBrandPhilosophyProps) {
  return (
    <div
      className={
        className ||
        "bg-[var(--background)] content-stretch flex flex-col gap-[16px] h-[356px] items-center overflow-clip p-[32px] relative rounded-[32px] w-[440px]"
      }
    >
      <div
        className="relative shrink-0 size-[184px]"
      >
        <img
          alt=""
          className="absolute block inset-0 max-w-none size-full"
          src={DesktopimgIllustrationBotanicalGrowth}
        />
      </div>
      <p
        className="[word-break:break-word] font-sans font-bold leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[24px] text-center w-[min-content]"
        dir="auto"
      >
        {philosophy1}
      </p>
    </div>
  )
}

type DesktopHabitreeBadgeProps = {
  className?: string
  kind?: "Daily care" | "Streak celebration" | "Small beginnings" | "Step" | "Demo"
  text1?: string
  text2?: string
  viewport?: "Desktop"
}

function DesktopHabitreeBadge({
  className,
  kind = "Daily care",
  text1 = "با هر روز تو، سبزتر",
  text2 = "رشدهای کوچک هم دیده می‌شوند.",
  viewport = "Desktop",
}: DesktopHabitreeBadgeProps) {
  const isDemoAndDesktop = kind === "Demo" && viewport === "Desktop"
  const isSmallBeginningsAndDesktop =
    kind === "Small beginnings" && viewport === "Desktop"
  const isStepAndDesktop = kind === "Step" && viewport === "Desktop"
  const isStreakCelebrationAndDesktop =
    kind === "Streak celebration" && viewport === "Desktop"
  return (
    <div
      className={
        className ||
        `content-stretch flex overflow-clip relative ${
          isDemoAndDesktop
            ? "bg-[var(--surface-soft)] items-start px-[12px] py-[8px] rounded-[999px]"
            : isStepAndDesktop
              ? "bg-[var(--surface-soft)] items-center justify-center rounded-[16px] size-[48px]"
              : isSmallBeginningsAndDesktop
                ? "bg-[var(--surface-soft)] gap-[8px] items-center px-[16px] py-[8px] rounded-[999px]"
                : isStreakCelebrationAndDesktop
                  ? "bg-white gap-[12px] items-center p-[16px] rounded-[16px] shadow-[0px_16px_40px_0px_var(--surface-soft)]"
                  : "bg-white border border-[var(--surface-soft)] border-solid gap-[8px] items-center px-[16px] py-[8px] rounded-[999px]"
        }`
      }
      id={
        isDemoAndDesktop
          ? "node-44_15192"
          : isStepAndDesktop
            ? "node-44_15181"
            : isSmallBeginningsAndDesktop
              ? "node-44_15174"
              : isStreakCelebrationAndDesktop
                ? "node-44_15162"
                : "node-44_15150"
      }
    >
      {viewport === "Desktop" && ["Daily care", "Demo"].includes(kind) && (
        <p
          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[12px] text-right whitespace-nowrap"
          dir="auto"
        >
          {text1}
        </p>
      )}
      {kind === "Daily care" && viewport === "Desktop" && (
        <div
          className="relative shrink-0 size-[16px]"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={DesktopimgHeart}
          />
        </div>
      )}
      {isStreakCelebrationAndDesktop && (
        <>
          <div
            className="[word-break:break-word] content-stretch flex flex-col items-start leading-[1.9] overflow-clip relative shrink-0 text-right whitespace-nowrap"
          >
            <p
              className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[15px]"
              dir="auto"
            >
              {text1}
            </p>
            <p
              className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[12px]"
              dir="auto"
            >
              {text2}
            </p>
          </div>
          <div
            className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[14px] shrink-0 size-[40px]"
          >
            <div
              className="relative shrink-0 size-[22px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={DesktopimgSparkles}
              />
            </div>
          </div>
        </>
      )}
      {isSmallBeginningsAndDesktop && (
        <>
          <p
            className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[13px] text-right whitespace-nowrap"
            dir="auto"
          >
            {text1}
          </p>
          <div
            className="relative shrink-0 size-[16px]"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={DesktopimgSprout}
            />
          </div>
        </>
      )}
      {isStepAndDesktop && (
        <p
          className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[16px] text-right whitespace-nowrap"
          dir="auto"
        >
          {text1}
        </p>
      )}
    </div>
  )
}

type DesktopHabitreeCardProps = {
  className?: string
  kind?: "باغچه مجازی تو" | "استمرار، نه کمال" | "پیگیری عادت‌ها" | "چالش گروهی" | "گزارش‌های روشن"
  text1?: string
  text2?: string
  text3?: string
  viewport?: "Desktop"
}

function DesktopHabitreeCard({
  className,
  kind = "باغچه مجازی تو",
  text1 = "باغچه مجازی تو",
  text2 = "برای هر عادت یک گیاه پرورش بده؛ باغچه‌ات داستان رشد تو را می‌گوید.",
  text3 = "هر عادت، یک گیاه تازه",
  viewport = "Desktop",
}: DesktopHabitreeCardProps) {
  const isAndDesktop = kind === "استمرار، نه کمال" && viewport === "Desktop"
  const isAndDesktop1 = kind === "پیگیری عادت‌ها" && viewport === "Desktop"
  const isAndDesktop2 = kind === "چالش گروهی" && viewport === "Desktop"
  const isAndDesktop3 = kind === "گزارش‌های روشن" && viewport === "Desktop"
  return (
    <div
      className={
        className ||
        "bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-col gap-[16px] h-[267px] items-end overflow-clip p-[24px] relative rounded-[24px] shadow-[0px_8px_24px_0px_var(--surface-soft)] w-[1055.2px]"
      }
      id={
        isAndDesktop3
          ? "node-44_15388"
          : isAndDesktop2
            ? "node-44_15367"
            : isAndDesktop1
              ? "node-44_15346"
              : isAndDesktop
                ? "node-44_15325"
                : "node-44_15304"
      }
    >
      <div
        className="content-stretch flex gap-[16px] items-center justify-end overflow-clip relative shrink-0 w-full"
        id={
          isAndDesktop3
            ? "node-44_15379"
            : isAndDesktop2
              ? "node-44_15358"
              : isAndDesktop1
                ? "node-44_15337"
                : isAndDesktop
                  ? "node-44_15316"
                  : "node-44_15295"
        }
      >
        <p
          className="[word-break:break-word] flex-[1_0_0] font-sans font-bold leading-[1.9] min-w-px relative text-[var(--brand-dark)] text-[20px] text-right"
          dir="auto"
        >
          {text1}
        </p>
        <div
          className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[16px] shrink-0 size-[48px]"
          id={
            isAndDesktop3
              ? "node-44_15381"
              : isAndDesktop2
                ? "node-44_15360"
                : isAndDesktop1
                  ? "node-44_15339"
                  : isAndDesktop
                    ? "node-44_15318"
                    : "node-44_15297"
          }
        >
          {kind === "باغچه مجازی تو" && viewport === "Desktop" && (
            <div
              className="relative shrink-0 size-[24px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={DesktopimgSprout1}
              />
            </div>
          )}
          {isAndDesktop && (
            <div
              className="relative shrink-0 size-[24px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={DesktopimgFlame}
              />
            </div>
          )}
          {isAndDesktop1 && (
            <div
              className="relative shrink-0 size-[24px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={DesktopimgCircleCheck}
              />
            </div>
          )}
          {isAndDesktop2 && (
            <div
              className="relative shrink-0 size-[24px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={DesktopimgUsers}
              />
            </div>
          )}
          {isAndDesktop3 && (
            <div
              className="relative shrink-0 size-[24px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={DesktopimgChartNoAxesColumnIncreasing}
              />
            </div>
          )}
        </div>
      </div>
      <p
        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[15px] text-right w-full"
        dir="auto"
      >
        {text2}
      </p>
      <div
        className="content-stretch flex gap-[8px] items-center justify-end overflow-clip pt-[8px] relative shrink-0 w-full"
        id={
          isAndDesktop3
            ? "node-44_15385"
            : isAndDesktop2
              ? "node-44_15364"
              : isAndDesktop1
                ? "node-44_15343"
                : isAndDesktop
                  ? "node-44_15322"
                  : "node-44_15301"
        }
      >
        <p
          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--brand)] text-[13px] text-right whitespace-nowrap"
          dir="auto"
        >
          {text3}
        </p>
        <div
          className="bg-[var(--surface-soft)] h-[3px] relative rounded-[4px] shrink-0 w-[16px]"
          id={
            isAndDesktop3
              ? "node-44_15387"
              : isAndDesktop2
                ? "node-44_15366"
                : isAndDesktop1
                  ? "node-44_15345"
                  : isAndDesktop
                    ? "node-44_15324"
                    : "node-44_15303"
          }
        />
      </div>
    </div>
  )
}

type DesktopHabitreeNavbarProps = {
  className?: string
  kind?: "Responsive"
  viewport?: "Desktop"
}

function DesktopHabitreeNavbar({
  className,
  kind = "Responsive",
  viewport = "Desktop",
}: DesktopHabitreeNavbarProps) {
  return (
    <div
      className={
        className ||
        "content-stretch flex flex-col gap-[16px] h-[134.667px] items-start overflow-clip px-[96px] py-[24px] relative w-[1438px]"
      }
    >
      <div
        className="content-stretch flex flex-row-reverse h-[48px] items-center justify-between overflow-clip relative shrink-0 w-full"
      >
        <div
          className="content-stretch flex flex-row-reverse gap-[16px] items-center overflow-clip relative shrink-0"
        >
          <DesktopHabitreeButton className="bg-[var(--brand)] content-stretch flex items-center min-h-[48px] overflow-clip px-[24px] relative rounded-[12px] shrink-0" />
          <DesktopHabitreeButton
            className="content-stretch flex items-center min-h-[48px] overflow-clip px-[8px] relative shrink-0"
            label="ورود"
            variant="Kind Login · Viewport Desktop"
          />
        </div>
        <div
          className="[word-break:break-word] content-stretch flex font-sans font-medium gap-[32px] items-center leading-[1.9] overflow-clip relative shrink-0 text-[var(--muted)] text-[14px] text-right whitespace-nowrap"
        >
          <p className="relative shrink-0" dir="auto">
            درباره ما
          </p>
          <p className="relative shrink-0" dir="auto">
            باغچه من
          </p>
          <p className="relative shrink-0" dir="auto">
            چطور کار می‌کند؟
          </p>
          <p className="relative shrink-0" dir="auto">
            امکانات
          </p>
        </div>
        <div
          className="content-stretch flex flex-row-reverse gap-[8px] items-center overflow-clip relative shrink-0"
        >
          <p
            className="[word-break:break-word] font-sans font-extrabold leading-[normal] relative shrink-0 text-[var(--brand)] text-[26px] whitespace-nowrap"
          >
            habitree
          </p>
          <div
            className="bg-[var(--brand)] content-stretch flex items-center justify-center overflow-clip relative rounded-[14px] shrink-0 size-[42px]"
          >
            <div
              className="relative shrink-0 size-[26px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={DesktopimgSprout2} 
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-[var(--surface-soft)] h-px relative shrink-0 w-full"
      />
    </div>
  )
}

function DesktopHabitreePage({ className }: { className?: string }) {
  return (
    <div
      className={
        className ||
        "bg-[var(--background)] content-stretch flex flex-col items-start relative w-full"
      }
    
      dir="rtl">
      <div
        className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      >
        <DesktopHabitreeNavbar className="content-stretch flex flex-col gap-[16px] h-[134.667px] items-start overflow-clip px-[96px] py-[24px] relative shrink-0 w-full" />
        <div
          className="content-stretch flex flex-row-reverse gap-[88px] items-center overflow-clip pb-[72px] pt-[48px] px-[96px] relative shrink-0 w-full"
        >
          <div
            className="h-[472px] relative shrink-0 w-[552px]"
          >
            <div
              className="absolute h-[400px] left-[40px] top-[32px] w-[472px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={DesktopimgGardenBackdrop}
              />
            </div>
            <div
              className="absolute h-[432px] left-[24px] top-[16px] w-[504px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={DesktopimgOrbit}
              />
            </div>
            <div
              className="absolute h-[400px] left-[56px] overflow-clip top-[32px] w-[448px]"
            >
              <div
                className="absolute left-0 overflow-clip size-[216px] top-[125px]"
              >
                <div
                  className="absolute left-0 size-[216px] top-0"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={DesktopimgIllustrationBotanicalGrowth1}
                  />
                </div>
              </div>
              <div
                className="absolute left-[116px] overflow-clip size-[328px] top-0"
              >
                <div
                  className="absolute left-0 size-[328px] top-0"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={DesktopimgIllustrationBotanicalGrowth2}
                  />
                </div>
              </div>
              <div
                className="absolute left-[254px] overflow-clip size-[160px] top-[219px]"
              >
                <div
                  className="absolute left-0 size-[160px] top-0"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={DesktopimgIllustrationBotanicalGrowth3}
                  />
                </div>
              </div>
            </div>
            <div
              className="absolute left-[520px] size-[7px] top-[260px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={DesktopimgFloatingSeed}
              />
            </div>
            <div
              className="absolute left-[20px] size-[9px] top-[128px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={DesktopimgFloatingSeed1}
              />
            </div>
            <DesktopHabitreeBadge className="absolute bg-white border border-[var(--surface-soft)] border-solid content-stretch flex gap-[8px] items-center left-[366px] overflow-clip px-[16px] py-[8px] rounded-[999px] top-[64px]" />
            <DesktopHabitreeBadge
              className="absolute bg-white content-stretch flex gap-[12px] items-center left-[8px] overflow-clip p-[16px] rounded-[16px] shadow-[0px_16px_40px_0px_var(--surface-soft)] top-[322px]"
              kind="Streak celebration"
              text1="۷ روز استمرار، یک برگ تازه!"
            />
          </div>
          <div
            className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-end min-w-px overflow-clip relative"
          >
          <div dir="rtl" className="w-full flex justify-start">
            <DesktopHabitreeBadge
              className="bg-[var(--surface-soft)] flex flex-row-reverse gap-[8px] items-center justify-start px-[16px] py-[8px] relative rounded-[999px] shrink-0 text-right"
              kind="Small beginnings"
              text1="هر روز، یک برگ تازه"
            />
          </div>
            <div
              className="[word-break:break-word] font-sans font-extrabold leading-[0] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[56px] text-right w-[min-content]"
            >
              <p className="leading-[1.55] mb-0" dir="auto">
                عادت‌های کوچک،
              </p>
              <p className="leading-[1.55]" dir="auto">
                زندگی بزرگ‌تر
              </p>
            </div>
            <p
              className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[18px] text-right w-[min-content]"
              dir="auto"
            >
              با Habitree عادت‌های خوبت را بساز و هر روز به آن‌ها رسیدگی کن. هر
              بار که ادامه می‌دهی، گیاهی در باغچه‌ات جان می‌گیرد.
            </p>
            <div
              className="content-stretch flex flex-row-reverse gap-[16px] items-start justify-end overflow-clip relative shrink-0 w-full"
            >
              <DesktopHabitreeButton
                className="bg-[var(--background)] border border-[var(--surface-soft)] border-solid content-stretch flex items-center justify-center min-h-[48px] overflow-clip px-[24px] py-[8px] relative rounded-[12px] shrink-0"
                label="ببین چطور کار می‌کند"
                variant="Kind Secondary · Viewport Desktop"
              />
              <DesktopHabitreeButton
                className="bg-[var(--brand)] content-stretch flex gap-[8px] items-center justify-center min-h-[48px] overflow-clip px-[24px] py-[8px] relative rounded-[12px] shrink-0"
                label="رایگان شروع کن"
                variant="Kind Primary · Viewport Desktop"
              />
            </div>
            <div
              className="content-stretch flex flex-row-reverse gap-[8px] items-center justify-end overflow-clip relative shrink-0 w-full"
            >
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[13px] text-right whitespace-nowrap"
                dir="auto"
              >
                شروع رایگان · بدون نیاز به کارت بانکی
              </p>
              <div
                className="relative shrink-0 size-[16px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={DesktopimgCheck1}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-[var(--surface-warm)] content-stretch flex items-center justify-center overflow-clip px-[96px] py-[24px] relative shrink-0 w-full"
        >
          <p
            className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[15px] text-center whitespace-nowrap"
            dir="auto"
          >
            قرار نیست یک‌شبه تغییر کنی؛ فقط امروز، یک قدم کوچک بردار.
          </p>
        </div>
      </div>
      <div
        className="content-stretch flex flex-col gap-[40px] items-start overflow-clip px-[96px] py-[80px] relative shrink-0 w-full"
      >
        <div
          className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-center overflow-clip relative shrink-0 text-center w-full"
        >
          <p
            className="font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[13px] w-full"
            dir="auto"
          >
            ابزارهای ساده برای روزهای بهتر
          </p>
          <p
            className="font-sans font-extrabold leading-[1.6] relative shrink-0 text-[var(--brand-dark)] text-[36px] w-full"
            dir="auto"
          >
            همه‌چیز برای ادامه دادن
          </p>
          <p
            className="font-sans font-normal leading-[1.9] max-w-[640px] relative shrink-0 text-[var(--muted)] text-[16px] w-full"
            dir="auto"
          >
            کمتر درگیر برنامه‌ریزی شو، بیشتر روی رشد خودت تمرکز کن.
          </p>
        </div>
        <div
          className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full"
        >
          <div
            className="content-stretch flex flex-row-reverse gap-[24px] items-start relative shrink-0 w-full"
          >
            <DesktopHabitreeCard className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip p-[24px] relative rounded-[24px] self-stretch shadow-[0px_8px_24px_0px_var(--surface-soft)]" />
            <DesktopHabitreeCard
              className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip p-[24px] relative rounded-[24px] self-stretch shadow-[0px_8px_24px_0px_var(--surface-soft)]"
              kind="استمرار، نه کمال"
              text1="استمرار، نه کمال"
              text2="زنجیره روزهای پیوسته‌ات را ببین و برای قدم بعدی انگیزه بگیر."
              text3="Streak · هر روز یک قدم"
            />
            <DesktopHabitreeCard
              className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip p-[24px] relative rounded-[24px] self-stretch shadow-[0px_8px_24px_0px_var(--surface-soft)]"
              kind="پیگیری عادت‌ها"
              text1="پیگیری عادت‌ها"
              text2="عادتت را با هدفی شدنی بساز؛ از یک لیوان آب بیشتر تا چند صفحه کتاب."
              text3="هدف‌های کوچک، تیک‌های بزرگ"
            />
          </div>
          <div
            className="content-stretch flex flex-row-reverse gap-[24px] items-start relative shrink-0 w-full"
          >
            <DesktopHabitreeCard
              className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip p-[24px] relative rounded-[24px] self-stretch shadow-[0px_8px_24px_0px_var(--surface-soft)]"
              kind="چالش گروهی"
              text1="چالش گروهی"
              text2="کنار دوستانت یک چالش بساز؛ به هم دلگرمی بدهید و با هم ادامه دهید."
              text3="با هم ریشه می‌گیریم"
            />
            <DesktopHabitreeCard
              className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip p-[24px] relative rounded-[24px] self-stretch shadow-[0px_8px_24px_0px_var(--surface-soft)]"
              kind="گزارش‌های روشن"
              text1="گزارش‌های روشن"
              text2="با مرور پیشرفت هفتگی و ماهانه، ریتم مناسب خودت را پیدا کن."
              text3="پیشرفتت را بهتر بشناس"
            />
          </div>
        </div>
      </div>
      <div
        className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
      >
        <div
          className="content-stretch flex flex-col gap-[40px] items-start overflow-clip pb-[80px] pt-[24px] px-[96px] relative shrink-0 w-full"
        >
          <div
            className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-center overflow-clip relative shrink-0 text-center w-full"
          >
            <p
              className="font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[13px] w-full"
              dir="auto"
            >
              از تصمیم تا ریشه
            </p>
            <p
              className="font-sans font-extrabold leading-[1.6] relative shrink-0 text-[var(--brand-dark)] text-[36px] w-full"
              dir="auto"
            >
              چطور کار می‌کند؟
            </p>
            <p
              className="font-sans font-normal leading-[1.9] max-w-[640px] relative shrink-0 text-[var(--muted)] text-[16px] w-full"
              dir="auto"
            >
              چهار قدم ساده؛ نه برای بی‌نقص بودن، برای هر روز کمی بهتر شدن.
            </p>
          </div>
          <div
            className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
          >
            <div
              dir="ltr"
            className="content-stretch flex gap-[32px] items-start overflow-clip relative shrink-0 w-full"
            >
              <div
                className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip relative self-stretch"
              >
                <div
                  className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full"
                >
                  <div
                    className="bg-[var(--surface-soft)] flex-[1_0_0] h-px min-w-px relative"
                  />
                  <DesktopHabitreeBadge
                    className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[16px] shrink-0 size-[48px]"
                    kind="Step"
                    text1="۰۴"
                  />
                </div>
                <p
                  className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[21px] text-right w-full"
                  dir="auto"
                >
                  رشد گیاه
                </p>
                <p
                  className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[14px] text-right w-full"
                  dir="auto"
                >
                  با هر ثبت، جان گرفتن گیاهت را تماشا کن.
                </p>
              </div>
              <div
                className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip relative self-stretch"
              >
                <div
                  className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full"
                >
                  <div
                    className="bg-[var(--surface-soft)] flex-[1_0_0] h-px min-w-px relative"
                  />
                  <DesktopHabitreeBadge
                    className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[16px] shrink-0 size-[48px]"
                    kind="Step"
                    text1="۰۳"
                  />
                </div>
                <p
                  className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[21px] text-right w-full"
                  dir="auto"
                >
                  حفظ استمرار
                </p>
                <p
                  className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[14px] text-right w-full"
                  dir="auto"
                >
                  روزهای پیوسته را بساز؛ با ریتم خودت جلو برو.
                </p>
              </div>
              <div
                className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip relative self-stretch"
              >
                <div
                  className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full"
                >
                  <div
                    className="bg-[var(--surface-soft)] flex-[1_0_0] h-px min-w-px relative"
                  />
                  <DesktopHabitreeBadge
                    className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[16px] shrink-0 size-[48px]"
                    kind="Step"
                    text1="۰۲"
                  />
                </div>
                <p
                  className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[21px] text-right w-full"
                  dir="auto"
                >
                  ثبت روزانه
                </p>
                <p
                  className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[14px] text-right w-full"
                  dir="auto"
                >
                  هر بار انجامش دادی، با یک تیک ثبتش کن.
                </p>
              </div>
              <div
                className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip relative self-stretch"
              >
                <div
                  className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full"
                >
                  <div
                    className="bg-[var(--surface-soft)] flex-[1_0_0] h-px min-w-px relative"
                  />
                  <DesktopHabitreeBadge
                    className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[16px] shrink-0 size-[48px]"
                    kind="Step"
                    text1="۰۱"
                  />
                </div>
                <p
                  className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[21px] text-right w-full"
                  dir="auto"
                >
                  ساخت عادت
                </p>
                <p
                  className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[14px] text-right w-full"
                  dir="auto"
                >
                  یک هدف کوچک و یک گیاه برایش انتخاب کن.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-[var(--surface-soft)] content-stretch flex flex-col gap-[40px] items-start overflow-clip px-[96px] py-[64px] relative shrink-0 w-full"
        >
          <div
            className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-center overflow-clip relative shrink-0 text-center w-full"
          >
            <p
              className="font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[13px] w-full"
              dir="auto"
            >
              رشد تو، دیدنی می‌شود
            </p>
            <p
              className="font-sans font-extrabold leading-[1.6] relative shrink-0 text-[var(--brand-dark)] text-[36px] w-full"
              dir="auto"
            >
              از یک دانه تا یک حالِ خوب
            </p>
            <p
              className="font-sans font-normal leading-[1.9] max-w-[640px] relative shrink-0 text-[var(--muted)] text-[16px] w-full"
              dir="auto"
            >
              هر ثبت کوچک، فرصتی برای رشد است. گیاهت پا‌به‌پای تو قد می‌کشد.
            </p>
          </div>
          <div
            dir="ltr"
            className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full"
          >
            <div
              className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
            >
              <div
                className="relative shrink-0 size-[176px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={DesktopimgIllustrationBotanicalGrowth4}
                />
              </div>
              <p
                className="[word-break:break-word] font-sans font-bold leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[19px] text-center w-[min-content]"
                dir="auto"
              >
                گیاه شکوفا
              </p>
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[13px] text-center w-[min-content]"
                dir="auto"
              >
                ۲۱ ثبت
              </p>
            </div>
            <div
              className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
            >
              <div
                className="relative shrink-0 size-[176px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={DesktopimgIllustrationBotanicalGrowth5}
                />
              </div>
              <p
                className="[word-break:break-word] font-sans font-bold leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[19px] text-center w-[min-content]"
                dir="auto"
              >
                گیاه بالنده
              </p>
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[13px] text-center w-[min-content]"
                dir="auto"
              >
                ۱۴ ثبت
              </p>
            </div>
            <div
              className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
            >
              <div
                className="relative shrink-0 size-[176px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={DesktopimgIllustrationBotanicalGrowth6}
                />
              </div>
              <p
                className="[word-break:break-word] font-sans font-bold leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[19px] text-center w-[min-content]"
                dir="auto"
              >
                برگ‌های تازه
              </p>
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[13px] text-center w-[min-content]"
                dir="auto"
              >
                ۷ ثبت
              </p>
            </div>
            <div
              className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
            >
              <div
                className="relative shrink-0 size-[176px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={DesktopimgIllustrationBotanicalGrowth7}
                />
              </div>
              <p
                className="[word-break:break-word] font-sans font-bold leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[19px] text-center w-[min-content]"
                dir="auto"
              >
                جوانه کوچک
              </p>
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[13px] text-center w-[min-content]"
                dir="auto"
              >
                ۳ ثبت
              </p>
            </div>
            <div
              className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
            >
              <div
                className="relative shrink-0 size-[176px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={DesktopimgIllustrationBotanicalGrowth8}
                />
              </div>
              <p
                className="[word-break:break-word] font-sans font-bold leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[19px] text-center w-[min-content]"
                dir="auto"
              >
                دانه امید
              </p>
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[13px] text-center w-[min-content]"
                dir="auto"
              >
                اولین ثبت
              </p>
            </div>
          </div>
          <p
            className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[12px] text-center w-full"
            dir="auto"
          >
            نمایش نمادین رشد گیاه؛ این مراحل نشان‌دهنده تعداد ثبت‌ها هستند، نه
            زمان قطعی ساخت یک عادت.
          </p>
        </div>
      </div>
      <div
        className="content-stretch flex flex-col gap-[40px] items-start px-[96px] py-[80px] relative shrink-0 w-full"
      >
        <div
          className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-center overflow-clip relative shrink-0 text-center w-full"
        >
          <p
            className="font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[13px] w-full"
            dir="auto"
          >
            یک نگاه به Habitree
          </p>
          <p
            className="font-sans font-extrabold leading-[1.6] relative shrink-0 text-[var(--brand-dark)] text-[36px] w-full"
            dir="auto"
          >
            جایی برای دیدن رشدت
          </p>
          <p
            className="font-sans font-normal leading-[1.9] max-w-[640px] relative shrink-0 text-[var(--muted)] text-[16px] w-full"
            dir="auto"
          >
            عادت‌ها، استمرار و باغچه‌ات؛ همه در یک فضای آرام و روشن، کنار هم.
          </p>
        </div>
        <div
          className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[32px] shadow-[0px_16px_40px_0px_var(--surface-soft)] shrink-0 w-full"
        >
          <div
            className="border-[var(--surface-soft)] border-b border-solid content-stretch flex flex-row-reverse items-center justify-between overflow-clip p-[24px] relative shrink-0 w-full"
          >
            <DesktopHabitreeBadge
              className="bg-[var(--surface-soft)] content-stretch flex items-start overflow-clip px-[12px] py-[8px] relative rounded-[999px] shrink-0"
              kind="Demo"
              text1="پیش‌نمایش مفهومی"
            />
            <div
              className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0"
            >
              <p
                className="[word-break:break-word] font-sans font-extrabold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[18px] text-right whitespace-nowrap"
                dir="auto"
              >
                باغچه سارا
              </p>
              <div
                className="relative shrink-0 size-[22px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={DesktopimgSprout3}
                />
              </div>
            </div>
          </div>
          <div
            className="content-stretch flex flex-row-reverse gap-[24px] items-start overflow-clip p-[24px] relative shrink-0 w-full"
          >
            <div
              className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px overflow-clip relative"
            >
              <div
                className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[1.9] overflow-clip relative shrink-0 text-right w-full"
              >
                <p
                  className="font-sans font-extrabold relative shrink-0 text-[var(--brand-dark)] text-[28px] w-full"
                  dir="auto"
                >
                  سلام سارا، وقت رشد کردنه!
                </p>
                <p
                  className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[13px] w-full"
                  dir="auto"
                >
                  جمعه، ۱۸ آبان · امروز هم یک قدم برای خودت
                </p>
              </div>
              <div
                className="[word-break:break-word] content-stretch flex gap-[16px] items-start leading-[1.9] overflow-clip relative shrink-0 w-full"
              >
                <div
                  className="bg-[var(--background)] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-w-px overflow-clip px-[8px] py-[16px] relative rounded-[16px]"
                >
                  <p
                    className="font-sans font-extrabold relative shrink-0 text-[var(--brand-dark)] text-[25px] text-right whitespace-nowrap"
                  >
                    ۴
                  </p>
                  <p
                    className="font-sans font-normal min-w-full relative shrink-0 text-[var(--muted)] text-[12px] text-center w-[min-content]"
                    dir="auto"
                  >
                    عادت فعال
                  </p>
                </div>
                <div
                  className="bg-[var(--background)] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-w-px overflow-clip px-[8px] py-[16px] relative rounded-[16px]"
                >
                  <p
                    className="font-sans font-extrabold relative shrink-0 text-[var(--brand-dark)] text-[25px] text-right whitespace-nowrap"
                    dir="auto"
                  >
                    ۲۱ روز
                  </p>
                  <p
                    className="font-sans font-normal min-w-full relative shrink-0 text-[var(--muted)] text-[12px] text-center w-[min-content]"
                    dir="auto"
                  >
                    بیشترین استمرار
                  </p>
                </div>
                <div
                  className="bg-[var(--background)] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-w-px overflow-clip px-[8px] py-[16px] relative rounded-[16px]"
                >
                  <p
                    className="font-sans font-extrabold relative shrink-0 text-[var(--brand-dark)] text-[25px] text-right whitespace-nowrap"
                  >
                    ۵۰٪
                  </p>
                  <p
                    className="font-sans font-normal min-w-full relative shrink-0 text-[var(--muted)] text-[12px] text-center w-[min-content]"
                    dir="auto"
                  >
                    پیشرفت امروز
                  </p>
                </div>
              </div>
              <div
                className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full"
              >
                <div
                  className="content-stretch flex flex-col gap-[24px] items-start overflow-clip relative shrink-0 w-[288px]"
                >
                  <div
                    className="bg-[var(--accent)] content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-[24px] shrink-0 w-full"
                  >
                    <p
                      className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[17px] text-right w-full"
                      dir="auto"
                    >
                      باغچه کوچک سارا
                    </p>
                    <div
                      className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-full"
                    >
                      <div
                        className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full"
                      >
                        <div
                          className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-w-px overflow-clip relative"
                        >
                          <div
                            className="relative shrink-0 size-[96px]"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={DesktopimgIllustrationBotanicalGrowth9}
                            />
                          </div>
                          <p
                            className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[12px] text-center w-[min-content]"
                            dir="auto"
                          >
                            نوشیدن آب
                          </p>
                        </div>
                        <div
                          className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-w-px overflow-clip relative"
                        >
                          <div
                            className="relative shrink-0 size-[96px]"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={DesktopimgIllustrationBotanicalGrowth10}
                            />
                          </div>
                          <p
                            className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[12px] text-center w-[min-content]"
                            dir="auto"
                          >
                            مطالعه روزانه
                          </p>
                        </div>
                      </div>
                      <div
                        className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full"
                      >
                        <div
                          className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-w-px overflow-clip relative"
                        >
                          <div
                            className="relative shrink-0 size-[96px]"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={DesktopimgIllustrationBotanicalGrowth11}
                            />
                          </div>
                          <p
                            className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[12px] text-center w-[min-content]"
                            dir="auto"
                          >
                            آرامش ذهن
                          </p>
                        </div>
                        <div
                          className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-w-px overflow-clip relative"
                        >
                          <div
                            className="relative shrink-0 size-[96px]"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={DesktopimgIllustrationBotanicalGrowth12}
                            />
                          </div>
                          <p
                            className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[12px] text-center w-[min-content]"
                            dir="auto"
                          >
                            پیاده‌روی
                          </p>
                        </div>
                      </div>
                    </div>
                    <p
                      className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[12px] text-center w-full"
                      dir="auto"
                    >
                      هر کدام، نشانه یک قدم از تو.
                    </p>
                  </div>
                  <div
                    className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-[24px] shrink-0 w-full"
                  >
                    <p
                      className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[17px] text-right w-full"
                      dir="auto"
                    >
                      ریتم این هفته
                    </p>
                    <div
                      className="content-stretch flex gap-[12px] h-[112px] items-end relative shrink-0 w-full"
                    >
                      <div
                        className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
                      >
                        <p
                          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                        >
                          ۲
                        </p>
                        <div
                          className="bg-[var(--brand)] h-[30px] max-w-[28px] relative rounded-[5px] shrink-0 w-full"
                        />
                        <p
                          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                          dir="auto"
                        >
                          ج
                        </p>
                      </div>
                      <div
                        className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
                      >
                        <p
                          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                        >
                          ۴
                        </p>
                        <div
                          className="bg-[var(--surface-soft)] h-[60px] max-w-[28px] relative rounded-[5px] shrink-0 w-full"
                        />
                        <p
                          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                          dir="auto"
                        >
                          پ
                        </p>
                      </div>
                      <div
                        className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
                      >
                        <p
                          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                        >
                          ۳
                        </p>
                        <div
                          className="bg-[var(--surface-soft)] h-[45px] max-w-[28px] relative rounded-[5px] shrink-0 w-full"
                        />
                        <p
                          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                          dir="auto"
                        >
                          چ
                        </p>
                      </div>
                      <div
                        className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
                      >
                        <p
                          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                        >
                          ۳
                        </p>
                        <div
                          className="bg-[var(--surface-soft)] h-[45px] max-w-[28px] relative rounded-[5px] shrink-0 w-full"
                        />
                        <p
                          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                          dir="auto"
                        >
                          س
                        </p>
                      </div>
                      <div
                        className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
                      >
                        <p
                          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                        >
                          ۲
                        </p>
                        <div
                          className="bg-[var(--surface-soft)] h-[30px] max-w-[28px] relative rounded-[5px] shrink-0 w-full"
                        />
                        <p
                          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                          dir="auto"
                        >
                          د
                        </p>
                      </div>
                      <div
                        className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
                      >
                        <p
                          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                        >
                          ۲
                        </p>
                        <div
                          className="bg-[var(--surface-soft)] h-[30px] max-w-[28px] relative rounded-[5px] shrink-0 w-full"
                        />
                        <p
                          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                          dir="auto"
                        >
                          ی
                        </p>
                      </div>
                      <div
                        className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
                      >
                        <p
                          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                        >
                          ۲
                        </p>
                        <div
                          className="bg-[var(--surface-soft)] h-[30px] max-w-[28px] relative rounded-[5px] shrink-0 w-full"
                        />
                        <p
                          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                          dir="auto"
                        >
                          ش
                        </p>
                      </div>
                    </div>
                    <p
                      className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[12px] text-right w-full"
                      dir="auto"
                    >
                      ۱۸ از ۲۸ ثبت هفتگی · ۶۴٪ پیشرفت
                    </p>
                  </div>
                </div>
                <div
                  className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip p-[24px] relative rounded-[24px]"
                >
                  <div
                    className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.9] overflow-clip relative shrink-0 text-right w-full whitespace-nowrap"
                  >
                    <p
                      className="font-sans font-normal relative shrink-0 text-[var(--brand)] text-[12px]"
                      dir="auto"
                    >
                      ۲ از ۴ انجام شده
                    </p>
                    <p
                      className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[18px]"
                      dir="auto"
                    >
                      عادت‌های امروز
                    </p>
                  </div>
                  <div
                    className="bg-[var(--surface-soft)] content-stretch flex h-[6px] items-start justify-end overflow-clip relative rounded-[4px] shrink-0 w-full"
                  >
                    <div
                      className="bg-[var(--surface-soft)] flex-[1_0_0] h-[6px] min-w-px relative rounded-[4px]"
                    />
                    <div
                      className="bg-[var(--brand)] flex-[1_0_0] h-[6px] min-w-px relative rounded-[4px]"
                    />
                  </div>
                  <div
                    className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
                  >
                    <div
                      className="border-[var(--surface-soft)] border-b border-solid content-stretch flex flex-col gap-[8px] items-start overflow-clip py-[16px] relative shrink-0 w-full"
                    >
                      <div
                        className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full"
                      >
                        <DesktopHabitreeButton
                          className="bg-[var(--brand)] border border-[var(--brand)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[14px] shrink-0 size-[44px]"
                          variant="Kind Completed · Viewport Desktop"
                        />
                        <div
                          className="[word-break:break-word] content-stretch flex flex-col items-end leading-[1.9] overflow-clip relative shrink-0 text-right w-[72px] whitespace-nowrap"
                        >
                          <p
                            className="font-sans font-bold relative shrink-0 text-[var(--brand)] text-[14px]"
                            dir="auto"
                          >
                            ۲۱ روز
                          </p>
                          <p
                            className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[11px]"
                            dir="auto"
                          >
                            استمرار
                          </p>
                        </div>
                        <div
                          className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start leading-[1.9] min-w-px overflow-clip relative text-right"
                        >
                          <p
                            className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[16px] w-full"
                            dir="auto"
                          >
                            مطالعه روزانه
                          </p>
                          <p
                            className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[12px] w-full"
                            dir="auto"
                          >
                            ۱۰ صفحه از یک کتاب
                          </p>
                        </div>
                        <div
                          className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[40px]"
                        >
                          <div
                            className="relative shrink-0 size-[20px]"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={DesktopimgBookOpen}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="[word-break:break-word] content-stretch flex font-sans font-normal items-start justify-between leading-[1.9] overflow-clip relative shrink-0 text-[12px] text-right w-full whitespace-nowrap"
                      >
                        <p
                          className="relative shrink-0 text-[var(--brand)]"
                          dir="auto"
                        >
                          ۱۰ از ۱۰ صفحه
                        </p>
                        <p
                          className="relative shrink-0 text-[var(--muted)]"
                          dir="auto"
                        >
                          امروز به گیاهت رسیدگی کردی
                        </p>
                      </div>
                    </div>
                    <div
                      className="border-[var(--surface-soft)] border-b border-solid content-stretch flex flex-col gap-[8px] items-start overflow-clip py-[16px] relative shrink-0 w-full"
                    >
                      <div
                        className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full"
                      >
                        <DesktopHabitreeButton
                          className="bg-[var(--brand)] border border-[var(--brand)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[14px] shrink-0 size-[44px]"
                          variant="Kind Completed · Viewport Desktop"
                        />
                        <div
                          className="[word-break:break-word] content-stretch flex flex-col items-end leading-[1.9] overflow-clip relative shrink-0 text-right w-[72px] whitespace-nowrap"
                        >
                          <p
                            className="font-sans font-bold relative shrink-0 text-[var(--brand)] text-[14px]"
                            dir="auto"
                          >
                            ۳ روز
                          </p>
                          <p
                            className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[11px]"
                            dir="auto"
                          >
                            استمرار
                          </p>
                        </div>
                        <div
                          className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start leading-[1.9] min-w-px overflow-clip relative text-right"
                        >
                          <p
                            className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[16px] w-full"
                            dir="auto"
                          >
                            نوشیدن آب
                          </p>
                          <p
                            className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[12px] w-full"
                            dir="auto"
                          >
                            ۸ لیوان در روز
                          </p>
                        </div>
                        <div
                          className="bg-[var(--accent)] content-stretch flex items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[40px]"
                        >
                          <div
                            className="relative shrink-0 size-[20px]"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={DesktopimgDroplets}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="[word-break:break-word] content-stretch flex font-sans font-normal items-start justify-between leading-[1.9] overflow-clip relative shrink-0 text-[12px] text-right w-full whitespace-nowrap"
                      >
                        <p
                          className="relative shrink-0 text-[var(--brand)]"
                          dir="auto"
                        >
                          ۸ از ۸ لیوان
                        </p>
                        <p
                          className="relative shrink-0 text-[var(--muted)]"
                          dir="auto"
                        >
                          امروز به گیاهت رسیدگی کردی
                        </p>
                      </div>
                    </div>
                    <div
                      className="border-[var(--surface-soft)] border-b border-solid content-stretch flex flex-col gap-[8px] items-start overflow-clip py-[16px] relative shrink-0 w-full"
                    >
                      <div
                        className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full"
                      >
                        <DesktopHabitreeButton
                          className="bg-[var(--background)] border border-[var(--surface-soft)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[14px] shrink-0 size-[44px]"
                          variant="Kind Log habit · Viewport Desktop"
                        />
                        <div
                          className="[word-break:break-word] content-stretch flex flex-col items-end leading-[1.9] overflow-clip relative shrink-0 text-right w-[72px] whitespace-nowrap"
                        >
                          <p
                            className="font-sans font-bold relative shrink-0 text-[var(--brand)] text-[14px]"
                            dir="auto"
                          >
                            ۷ روز
                          </p>
                          <p
                            className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[11px]"
                            dir="auto"
                          >
                            استمرار
                          </p>
                        </div>
                        <div
                          className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start leading-[1.9] min-w-px overflow-clip relative text-right"
                        >
                          <p
                            className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[16px] w-full"
                            dir="auto"
                          >
                            پیاده‌روی
                          </p>
                          <p
                            className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[12px] w-full"
                            dir="auto"
                          >
                            ۲۰ دقیقه در روز
                          </p>
                        </div>
                        <div
                          className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[40px]"
                        >
                          <div
                            className="relative shrink-0 size-[20px]"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={DesktopimgFootprints}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="[word-break:break-word] content-stretch flex font-sans font-normal items-start justify-between leading-[1.9] overflow-clip relative shrink-0 text-[var(--muted)] text-[12px] text-right w-full whitespace-nowrap"
                      >
                        <p
                          className="relative shrink-0"
                          dir="auto"
                        >
                          ۰ از ۲۰ دقیقه
                        </p>
                        <p
                          className="relative shrink-0"
                          dir="auto"
                        >
                          یک قدم کوچک باقی مانده
                        </p>
                      </div>
                    </div>
                    <div
                      className="border-[var(--surface-soft)] border-b border-solid content-stretch flex flex-col gap-[8px] items-start overflow-clip py-[16px] relative shrink-0 w-full"
                    >
                      <div
                        className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full"
                      >
                        <DesktopHabitreeButton
                          className="bg-[var(--background)] border border-[var(--surface-soft)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[14px] shrink-0 size-[44px]"
                          variant="Kind Log habit · Viewport Desktop"
                        />
                        <div
                          className="[word-break:break-word] content-stretch flex flex-col items-end leading-[1.9] overflow-clip relative shrink-0 text-right w-[72px] whitespace-nowrap"
                        >
                          <p
                            className="font-sans font-bold relative shrink-0 text-[var(--brand)] text-[14px]"
                            dir="auto"
                          >
                            ۱ روز
                          </p>
                          <p
                            className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[11px]"
                            dir="auto"
                          >
                            استمرار
                          </p>
                        </div>
                        <div
                          className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start leading-[1.9] min-w-px overflow-clip relative text-right"
                        >
                          <p
                            className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[16px] w-full"
                            dir="auto"
                          >
                            آرامش ذهن
                          </p>
                          <p
                            className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[12px] w-full"
                            dir="auto"
                          >
                            ۱۰ دقیقه مراقبه
                          </p>
                        </div>
                        <div
                          className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[40px]"
                        >
                          <div
                            className="relative shrink-0 size-[20px]"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={DesktopimgSun}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="[word-break:break-word] content-stretch flex font-sans font-normal items-start justify-between leading-[1.9] overflow-clip relative shrink-0 text-[var(--muted)] text-[12px] text-right w-full whitespace-nowrap"
                      >
                        <p
                          className="relative shrink-0"
                          dir="auto"
                        >
                          ۰ از ۱۰ دقیقه
                        </p>
                        <p
                          className="relative shrink-0"
                          dir="auto"
                        >
                          یک قدم کوچک باقی مانده
                        </p>
                      </div>
                    </div>
                  </div>
                  <DesktopHabitreeButton
                    className="bg-[var(--surface-soft)] content-stretch flex gap-[8px] h-[48px] items-center justify-center min-h-[48px] overflow-clip relative rounded-[12px] shrink-0 w-full"
                    label="ساخت عادت تازه"
                    variant="Kind Add habit · Viewport Desktop"
                  />
                </div>
              </div>
            </div>
            <div
              className="content-stretch flex flex-col gap-[16px] items-start overflow-clip py-[16px] relative self-stretch shrink-0 w-[160px]"
            >
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[12px] text-right w-full"
                dir="auto"
              >
                فضای شخصی سارا
              </p>
              <div
                className="bg-[var(--surface-soft)] content-stretch flex gap-[8px] items-center justify-end min-h-[48px] overflow-clip px-[16px] relative rounded-[12px] shrink-0 w-full"
              >
                <p
                  className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[14px] text-right whitespace-nowrap"
                  dir="auto"
                >
                  امروز
                </p>
                <div
                  className="relative shrink-0 size-[18px]"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={DesktopimgLayoutDashboard}
                  />
                </div>
              </div>
              <div
                className="bg-white content-stretch flex gap-[8px] items-center justify-end min-h-[48px] overflow-clip px-[16px] relative rounded-[12px] shrink-0 w-full"
              >
                <p
                  className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[14px] text-right whitespace-nowrap"
                  dir="auto"
                >
                  باغچه من
                </p>
                <div
                  className="relative shrink-0 size-[18px]"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={DesktopimgSprout4}
                  />
                </div>
              </div>
              <div
                className="bg-white content-stretch flex gap-[8px] items-center justify-end min-h-[48px] overflow-clip px-[16px] relative rounded-[12px] shrink-0 w-full"
              >
                <p
                  className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[14px] text-right whitespace-nowrap"
                  dir="auto"
                >
                  گزارش‌ها
                </p>
                <div
                  className="relative shrink-0 size-[18px]"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={DesktopimgChartNoAxesColumnIncreasing1}
                  />
                </div>
              </div>
              <div
                className="bg-white content-stretch flex gap-[8px] items-center justify-end min-h-[48px] overflow-clip px-[16px] relative rounded-[12px] shrink-0 w-full"
              >
                <p
                  className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[14px] text-right whitespace-nowrap"
                  dir="auto"
                >
                  چالش‌ها
                </p>
                <div
                  className="relative shrink-0 size-[18px]"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={DesktopimgUsers1}
                  />
                </div>
              </div>
              <div
                className="bg-[var(--background)] content-stretch flex flex-col gap-[8px] items-start overflow-clip p-[16px] relative rounded-[16px] shrink-0 w-full"
              >
                <div
                  className="relative shrink-0 size-[20px]"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={DesktopimgHeart1}
                  />
                </div>
                <p
                  className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[12px] text-right w-[min-content]"
                  dir="auto"
                >
                  روزهای سخت هم بخشی از مسیرند. مهربانانه ادامه بده.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p
          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[12px] text-center w-full"
          dir="auto"
        >
          این یک نمونه نمایشی از تجربه Habitree است؛ اطلاعات سارا و عادت‌ها واقعی
          یا زنده نیستند.
        </p>
      </div>
      <div
        className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
      >
        <div
          className="content-stretch flex flex-row-reverse gap-[104px] items-center overflow-clip pb-[80px] pt-[24px] px-[96px] relative shrink-0 w-full"
        >
          <DesktopHabitreeCardBrandPhilosophy className="bg-[var(--background)] content-stretch flex flex-col gap-[16px] h-[356px] items-center overflow-clip p-[32px] relative rounded-[32px] shrink-0 w-[440px]" />
          <div
            className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip relative"
          >
            <p
              className="[word-break:break-word] font-sans font-bold leading-[1.9] min-w-full relative shrink-0 text-[var(--brand)] text-[13px] text-right w-[min-content]"
              dir="auto"
            >
              درباره Habitree
            </p>
            <p
              className="[word-break:break-word] font-sans font-extrabold leading-[1.6] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[36px] text-right w-[min-content]"
              dir="auto"
            >
              برای رشد، به خودت فرصت بده.
            </p>
            <p
              className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[16px] text-right w-[min-content]"
              dir="auto"
            >
              ما باور داریم تغییرهای ماندگار از کارهای کوچک شروع می‌شوند؛ نه از
              برنامه‌های سنگین و انتظارهای بزرگ.
            </p>
            <p
              className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[15px] text-right w-[min-content]"
              dir="auto"
            >
              Habitree همراهی آرام برای ساختن عادت‌هاست. اینجا هر تیک فقط یک کار
              انجام‌شده نیست؛ نشانه زمانی است که برای خودت گذاشته‌ای. باغچه‌ات
              یادآوری می‌کند که تلاش‌های کوچک، ارزش دیده شدن دارند.
            </p>
            <div
              className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0"
            >
              <p
                className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[14px] text-right whitespace-nowrap"
                dir="auto"
              >
                با ریتم خودت، بدون مقایسه
              </p>
              <div
                className="relative shrink-0 size-[18px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={DesktopimgHeart2}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="content-stretch flex flex-col items-start overflow-clip pb-[64px] px-[96px] relative shrink-0 w-full"
        >
          <div
            className="bg-[var(--brand-dark)] content-stretch flex flex-row-reverse gap-[80px] items-center overflow-clip p-[48px] relative rounded-[32px] shrink-0 w-full"
          >
            <div
              className="bg-[var(--background)] content-stretch flex flex-col h-[240px] items-center justify-center overflow-clip relative rounded-[32px] shrink-0 w-[256px]"
            >
              <div
                className="relative shrink-0 size-[216px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={DesktopimgIllustrationBotanicalGrowth13}
                />
              </div>
            </div>
            <div
              className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip relative"
            >
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--surface-soft)] text-[13px] text-right w-[min-content]"
                dir="auto"
              >
                اولین برگ، منتظر توست
              </p>
              <p
                className="[word-break:break-word] font-sans font-extrabold leading-[1.6] min-w-full relative shrink-0 text-[var(--background)] text-[36px] text-right w-[min-content]"
                dir="auto"
              >
                امروز، بذر فردای بهترت را بکار.
              </p>
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--surface-soft)] text-[15px] text-right w-[min-content]"
                dir="auto"
              >
                یک عادت کوچک انتخاب کن. بقیه مسیر را قدم‌به‌قدم، کنار هم رشد
                می‌دهیم.
              </p>
              <DesktopHabitreeButton
                className="bg-[var(--brand)] content-stretch flex gap-[8px] items-center justify-center min-h-[48px] overflow-clip px-[24px] py-[8px] relative rounded-[12px] shrink-0"
                label="رایگان ثبت‌نام کن"
                variant="Kind Primary · Viewport Desktop"
              />
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--surface-soft)] text-[12px] text-right w-[min-content]"
                dir="auto"
              >
                شروع رایگان · بدون نیاز به کارت بانکی
              </p>
            </div>
          </div>
        </div>
        <div
          className="bg-[var(--background)] content-stretch flex flex-col gap-[32px] items-start overflow-clip pb-[32px] pt-[48px] px-[96px] relative shrink-0 w-full"
        >
          <div
            className="content-stretch flex flex-row-reverse gap-[96px] items-start overflow-clip relative shrink-0 w-full"
          >
            <DesktopHabitreeFooterMenu className="content-stretch flex flex-col gap-[8px] h-[184px] items-end overflow-clip relative shrink-0 w-[328px]" />
            <div
              className="content-stretch flex flex-col gap-[8px] h-[184px] items-end overflow-clip relative shrink-0 w-[328px]"
            >
              <p
                className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[15px] text-right w-full"
                dir="auto"
              >
                کشف Habitree
              </p>
              <div
                className="content-stretch flex h-[44px] items-center justify-end min-h-[44px] overflow-clip relative shrink-0 w-full"
              >
                <p
                  className="[word-break:break-word] flex-[1_0_0] font-sans font-normal leading-[1.9] min-w-px relative text-[var(--muted)] text-[14px] text-right"
                  dir="auto"
                >
                  امکانات
                </p>
              </div>
              <div
                className="content-stretch flex h-[44px] items-center justify-end min-h-[44px] overflow-clip relative shrink-0 w-full"
              >
                <p
                  className="[word-break:break-word] flex-[1_0_0] font-sans font-normal leading-[1.9] min-w-px relative text-[var(--muted)] text-[14px] text-right"
                  dir="auto"
                >
                  چطور کار می‌کند؟
                </p>
              </div>
              <div
                className="content-stretch flex h-[44px] items-center justify-end min-h-[44px] overflow-clip relative shrink-0 w-full"
              >
                <p
                  className="[word-break:break-word] flex-[1_0_0] font-sans font-normal leading-[1.9] min-w-px relative text-[var(--muted)] text-[14px] text-right"
                  dir="auto"
                >
                  درباره ما
                </p>
              </div>
            </div>
            <div
              className="content-stretch flex flex-col gap-[16px] items-end overflow-clip relative shrink-0 w-[400px]"
            >
              <div
                className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0"
              >
                <p
                  className="[word-break:break-word] font-sans font-extrabold leading-[normal] relative shrink-0 text-[var(--brand)] text-[26px] whitespace-nowrap"
                >
                  habitree
                </p>
                <div
                  className="bg-[var(--brand)] content-stretch flex items-center justify-center overflow-clip relative rounded-[14px] shrink-0 size-[42px]"
                >
                  <div
                    className="relative shrink-0 size-[26px]"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={DesktopimgSprout2}
                    />
                  </div>
                </div>
              </div>
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[14px] text-right w-[min-content]"
                dir="auto"
              >
                همراه کوچک تو برای عادت‌های ماندگار و روزهای سبزتر.
              </p>
            </div>
          </div>
          <div
            className="bg-[var(--surface-soft)] h-px relative shrink-0 w-full"
          />
          <div
            className="[word-break:break-word] content-stretch flex font-sans font-normal gap-[16px] items-center justify-end leading-[1.9] overflow-clip relative shrink-0 text-[var(--muted)] text-[12px] text-right w-full"
          >
            <p
              className="relative shrink-0 whitespace-nowrap"
              dir="auto"
            >
              همراه همیشگیت
            </p>
            <p
              className="flex-[1_0_0] min-w-px relative"
              dir="auto"
            >
              © Habitree · با حوصله، برای رشد تو
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}



/* ==================== Tablet layout ==================== */

const TabletassetPathPrefix = "/assets/tablet"
const TabletimgArrowLeft = `${TabletassetPathPrefix}/4ca6d.svg`
const TabletimgCheck = `${TabletassetPathPrefix}/c27b0.svg`
const TabletimgPlus = `${TabletassetPathPrefix}/bede8.svg`
const TabletimgIllustrationBotanicalGrowth = `${TabletassetPathPrefix}/92921.svg`
const TabletimgHeart = `${TabletassetPathPrefix}/a0ee1.svg`
const TabletimgSparkles = `${TabletassetPathPrefix}/e3e30.svg`
const TabletimgSprout = `${TabletassetPathPrefix}/4f884.svg`
const TabletimgSprout1 = `${TabletassetPathPrefix}/66ddf.svg`
const TabletimgFlame = `${TabletassetPathPrefix}/7887f.svg`
const TabletimgCircleCheck = `${TabletassetPathPrefix}/7d63a.svg`
const TabletimgUsers = `${TabletassetPathPrefix}/4476a.svg`
const TabletimgChartNoAxesColumnIncreasing = `${TabletassetPathPrefix}/6624a.svg`
const TabletimgSprout2 = `${TabletassetPathPrefix}/73806.svg`
const TabletimgCheck1 = `${TabletassetPathPrefix}/0b857.svg`
const TabletimgGardenBackdrop = `${TabletassetPathPrefix}/93b49.svg`
const TabletimgOrbit = `${TabletassetPathPrefix}/c9576.svg`
const TabletimgIllustrationBotanicalGrowth1 = `${TabletassetPathPrefix}/46545.svg`
const TabletimgIllustrationBotanicalGrowth2 = `${TabletassetPathPrefix}/942a3.svg`
const TabletimgIllustrationBotanicalGrowth3 = `${TabletassetPathPrefix}/4babf.svg`
const TabletimgFloatingSeed = `${TabletassetPathPrefix}/0f0f3.svg`
const TabletimgFloatingSeed1 = `${TabletassetPathPrefix}/323c0.svg`
const TabletimgIllustrationBotanicalGrowth4 = `${TabletassetPathPrefix}/03c00.svg`
const TabletimgIllustrationBotanicalGrowth5 = `${TabletassetPathPrefix}/b13af.svg`
const TabletimgIllustrationBotanicalGrowth6 = `${TabletassetPathPrefix}/830ca.svg`
const TabletimgIllustrationBotanicalGrowth7 = `${TabletassetPathPrefix}/c7c9e.svg`
const TabletimgIllustrationBotanicalGrowth8 = `${TabletassetPathPrefix}/833eb.svg`
const TabletimgSprout3 = `${TabletassetPathPrefix}/4a8e7.svg`
const TabletimgBookOpen = `${TabletassetPathPrefix}/76704.svg`
const TabletimgDroplets = `${TabletassetPathPrefix}/8c4d1.svg`
const TabletimgFootprints = `${TabletassetPathPrefix}/17a33.svg`
const TabletimgSun = `${TabletassetPathPrefix}/981e7.svg`
const TabletimgIllustrationBotanicalGrowth9 = `${TabletassetPathPrefix}/9c0ae.svg`
const TabletimgIllustrationBotanicalGrowth10 = `${TabletassetPathPrefix}/73717.svg`
const TabletimgIllustrationBotanicalGrowth11 = `${TabletassetPathPrefix}/a8e5f.svg`
const TabletimgIllustrationBotanicalGrowth12 = `${TabletassetPathPrefix}/bf79d.svg`
const TabletimgHeart1 = `${TabletassetPathPrefix}/e6329.svg`
const TabletimgIllustrationBotanicalGrowth13 = `${TabletassetPathPrefix}/9b168.svg`
const TabletimgBrandMark = `${TabletassetPathPrefix}/091f8.svg`

type TabletHabitreeButtonProps = {
  className?: string
  context?: "Core"
  label?: string
  variant?: "Kind Signup · Viewport Desktop" | "Kind Login · Viewport Desktop" | "Kind Secondary · Viewport Desktop" | "Kind Primary · Viewport Desktop" | "Kind Completed · Viewport Desktop" | "Kind Log habit · Viewport Desktop" | "Kind Add habit · Viewport Desktop" | "Kind Footer link · Viewport Desktop" | "Kind Section link · Viewport Tablet"
}

function TabletHabitreeButton({
  className,
  context = "Core",
  label = "ثبت‌نام",
  variant = "Kind Signup · Viewport Desktop",
}: TabletHabitreeButtonProps) {
  const isCoreAndKindAddHabitViewportDesktop =
    context === "Core" && variant === "Kind Add habit · Viewport Desktop"
  const isCoreAndKindCompletedViewportDesktop =
    context === "Core" && variant === "Kind Completed · Viewport Desktop"
  const isCoreAndKindFooterLinkViewportDesktop =
    context === "Core" && variant === "Kind Footer link · Viewport Desktop"
  const isCoreAndKindLogHabitViewportDesktop =
    context === "Core" && variant === "Kind Log habit · Viewport Desktop"
  const isCoreAndKindLoginViewportDesktop =
    context === "Core" && variant === "Kind Login · Viewport Desktop"
  const isCoreAndKindPrimaryViewportDesktop =
    context === "Core" && variant === "Kind Primary · Viewport Desktop"
  const isCoreAndKindSecondaryViewportDesktop =
    context === "Core" && variant === "Kind Secondary · Viewport Desktop"
  const isCoreAndKindSectionLinkViewportTablet =
    context === "Core" && variant === "Kind Section link · Viewport Tablet"
  return (
    <div
      className={
        className ||
        `content-stretch flex items-center overflow-clip relative ${
          isCoreAndKindSectionLinkViewportTablet
            ? "min-h-[44px]"
            : isCoreAndKindFooterLinkViewportDesktop
              ? "h-[48px] justify-end min-h-[44px] w-[1440px]"
              : isCoreAndKindAddHabitViewportDesktop
                ? "bg-[var(--surface-soft)] gap-[8px] h-[48px] justify-center min-h-[48px] rounded-[12px] w-[1440px]"
                : isCoreAndKindLogHabitViewportDesktop
                  ? "bg-[var(--background)] border border-[var(--surface-soft)] border-solid justify-center rounded-[14px] size-[44px]"
                  : isCoreAndKindCompletedViewportDesktop
                    ? "bg-[var(--brand)] border border-[var(--brand)] border-solid justify-center rounded-[14px] size-[44px]"
                    : isCoreAndKindPrimaryViewportDesktop
                      ? "bg-[var(--brand)] gap-[8px] justify-center min-h-[48px] px-[24px] py-[8px] rounded-[12px]"
                      : isCoreAndKindSecondaryViewportDesktop
                        ? "bg-[var(--background)] border border-[var(--surface-soft)] border-solid justify-center min-h-[48px] px-[24px] py-[8px] rounded-[12px]"
                        : isCoreAndKindLoginViewportDesktop
                          ? "min-h-[48px] px-[8px]"
                          : "bg-[var(--brand)] min-h-[48px] px-[24px] rounded-[12px]"
        }`
      }
      id={
        isCoreAndKindSectionLinkViewportTablet
          ? "node-44_14991"
          : isCoreAndKindFooterLinkViewportDesktop
            ? "node-44_14966"
            : isCoreAndKindAddHabitViewportDesktop
              ? "node-44_14955"
              : isCoreAndKindLogHabitViewportDesktop
                ? "node-44_14944"
                : isCoreAndKindCompletedViewportDesktop
                  ? "node-44_14934"
                  : isCoreAndKindPrimaryViewportDesktop
                    ? "node-44_14926"
                    : isCoreAndKindSecondaryViewportDesktop
                      ? "node-44_14919"
                      : isCoreAndKindLoginViewportDesktop
                        ? "node-44_14914"
                        : "node-44_14909"
      }
    >
      {context === "Core" && variant === "Kind Signup · Viewport Desktop" && (
        <p
          className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[14px] text-right text-white whitespace-nowrap"
          dir="auto"
        >
          {label}
        </p>
      )}
      {isCoreAndKindLoginViewportDesktop && (
        <p
          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[14px] text-right whitespace-nowrap"
          dir="auto"
        >
          {label}
        </p>
      )}
      {isCoreAndKindSecondaryViewportDesktop && (
        <p
          className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[15px] text-right whitespace-nowrap"
          dir="auto"
        >
          {label}
        </p>
      )}
      {isCoreAndKindPrimaryViewportDesktop && (
        <>
          <div
            className="relative shrink-0 size-[18px]"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={TabletimgArrowLeft}
            />
          </div>
          <p
            className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[15px] text-right text-white whitespace-nowrap"
            dir="auto"
          >
            {label}
          </p>
        </>
      )}
      {isCoreAndKindCompletedViewportDesktop && (
        <div
          className="relative shrink-0 size-[18px]"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={TabletimgCheck}
          />
        </div>
      )}
      {isCoreAndKindLogHabitViewportDesktop && (
        <div
          className="relative shrink-0 size-[18px]"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={TabletimgPlus}
          />
        </div>
      )}
      {isCoreAndKindAddHabitViewportDesktop && (
        <>
          <p
            className="[word-break:break-word] font-sans font-semibold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[14px] text-right whitespace-nowrap"
            dir="auto"
          >
            {label}
          </p>
          <div
            className="relative shrink-0 size-[18px]"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={TabletimgPlus}
            />
          </div>
        </>
      )}
      {isCoreAndKindFooterLinkViewportDesktop && (
        <p
          className="[word-break:break-word] flex-[1_0_0] font-sans font-normal leading-[1.9] min-w-px relative text-[var(--muted)] text-[14px] text-right"
          dir="auto"
        >
          {label}
        </p>
      )}
      {isCoreAndKindSectionLinkViewportTablet && (
        <p
          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[13px] text-right whitespace-nowrap"
          dir="auto"
        >
          {label}
        </p>
      )}
    </div>
  )
}

type TabletHabitreeFooterMenuProps = {
  className?: string
  layout?: "Mobile 2"
  menuHeading1?: string
}

function TabletHabitreeFooterMenu({
  className,
  layout = "Mobile 2",
  menuHeading1 = "همراهت هستیم",
}: TabletHabitreeFooterMenuProps) {
  return (
    <div
      className={
        className ||
        "content-stretch flex flex-col gap-[8px] items-end overflow-clip relative size-[184px]"
      }
    >
      <p
        className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[15px] text-right w-full"
        dir="auto"
      >
        {menuHeading1}
      </p>
      <TabletHabitreeButton
        className="content-stretch flex h-[44px] items-center justify-end min-h-[44px] overflow-clip relative shrink-0 w-full"
        label="ارتباط با ما"
        variant="Kind Footer link · Viewport Desktop"
      />
      <TabletHabitreeButton
        className="content-stretch flex h-[44px] items-center justify-end min-h-[44px] overflow-clip relative shrink-0 w-full"
        label="حریم خصوصی"
        variant="Kind Footer link · Viewport Desktop"
      />
      <TabletHabitreeButton
        className="content-stretch flex h-[44px] items-center justify-end min-h-[44px] overflow-clip relative shrink-0 w-full"
        label="شرایط استفاده"
        variant="Kind Footer link · Viewport Desktop"
      />
    </div>
  )
}

type TabletHabitreeCardBrandPhilosophyProps = {
  className?: string
  philosophy1?: string
}

function TabletHabitreeCardBrandPhilosophy({
  className,
  philosophy1 = "«لازم نیست سریع رشد کنی؛ کافی‌ست ادامه بدهی.»",
}: TabletHabitreeCardBrandPhilosophyProps) {
  return (
    <div
      className={
        className ||
        "bg-[var(--background)] content-stretch flex flex-col gap-[16px] h-[356px] items-center overflow-clip p-[32px] relative rounded-[32px] w-[440px]"
      }
    >
      <div
        className="relative shrink-0 size-[184px]"
      >
        <img
          alt=""
          className="absolute block inset-0 max-w-none size-full"
          src={TabletimgIllustrationBotanicalGrowth}
        />
      </div>
      <p
        className="[word-break:break-word] font-sans font-bold leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[24px] text-center w-[min-content]"
        dir="auto"
      >
        {philosophy1}
      </p>
    </div>
  )
}

type TabletHabitreeBadgeProps = {
  className?: string
  kind?: "Daily care" | "Streak celebration" | "Small beginnings" | "Step" | "Demo"
  text1?: string
  text2?: string
  viewport?: "Desktop"
}

function TabletHabitreeBadge({
  className,
  kind = "Daily care",
  text1 = "با هر روز تو، سبزتر",
  text2 = "رشدهای کوچک هم دیده می‌شوند.",
  viewport = "Desktop",
}: TabletHabitreeBadgeProps) {
  const isDemoAndDesktop = kind === "Demo" && viewport === "Desktop"
  const isSmallBeginningsAndDesktop =
    kind === "Small beginnings" && viewport === "Desktop"
  const isStepAndDesktop = kind === "Step" && viewport === "Desktop"
  const isStreakCelebrationAndDesktop =
    kind === "Streak celebration" && viewport === "Desktop"
  return (
    <div
      className={
        className ||
        `content-stretch flex overflow-clip relative ${
          isDemoAndDesktop
            ? "bg-[var(--surface-soft)] items-start px-[12px] py-[8px] rounded-[999px]"
            : isStepAndDesktop
              ? "bg-[var(--surface-soft)] items-center justify-center rounded-[16px] size-[48px]"
              : isSmallBeginningsAndDesktop
                ? "bg-[var(--surface-soft)] gap-[8px] items-center px-[16px] py-[8px] rounded-[999px]"
                : isStreakCelebrationAndDesktop
                  ? "bg-white gap-[12px] items-center p-[16px] rounded-[16px] shadow-[0px_16px_40px_0px_var(--surface-soft)]"
                  : "bg-white border border-[var(--surface-soft)] border-solid gap-[8px] items-center px-[16px] py-[8px] rounded-[999px]"
        }`
      }
      id={
        isDemoAndDesktop
          ? "node-44_15192"
          : isStepAndDesktop
            ? "node-44_15181"
            : isSmallBeginningsAndDesktop
              ? "node-44_15174"
              : isStreakCelebrationAndDesktop
                ? "node-44_15162"
                : "node-44_15150"
      }
    >
      {viewport === "Desktop" && ["Daily care", "Demo"].includes(kind) && (
        <p
          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[12px] text-right whitespace-nowrap"
          dir="auto"
        >
          {text1}
        </p>
      )}
      {kind === "Daily care" && viewport === "Desktop" && (
        <div
          className="relative shrink-0 size-[16px]"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={TabletimgHeart}
          />
        </div>
      )}
      {isStreakCelebrationAndDesktop && (
        <>
          <div
            className="[word-break:break-word] content-stretch flex flex-col items-start leading-[1.9] overflow-clip relative shrink-0 text-right whitespace-nowrap"
          >
            <p
              className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[15px]"
              dir="auto"
            >
              {text1}
            </p>
            <p
              className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[12px]"
              dir="auto"
            >
              {text2}
            </p>
          </div>
          <div
            className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[14px] shrink-0 size-[40px]"
          >
            <div
              className="relative shrink-0 size-[22px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={TabletimgSparkles}
              />
            </div>
          </div>
        </>
      )}
      {isSmallBeginningsAndDesktop && (
        <>
          <p
            className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[13px] text-right whitespace-nowrap"
            dir="auto"
          >
            {text1}
          </p>
          <div
            className="relative shrink-0 size-[16px]"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={TabletimgSprout}
            />
          </div>
        </>
      )}
      {isStepAndDesktop && (
        <p
          className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[16px] text-right whitespace-nowrap"
          dir="auto"
        >
          {text1}
        </p>
      )}
    </div>
  )
}


type TabletHabitreeCardProps = {
  className?: string
  kind?: "باغچه مجازی تو" | "استمرار، نه کمال" | "پیگیری عادت‌ها" | "چالش گروهی" | "گزارش‌های روشن"
  text1?: string
  text2?: string
  text3?: string
  viewport?: "Desktop"
}

function TabletHabitreeCard({
  className,
  kind = "باغچه مجازی تو",
  text1 = "باغچه مجازی تو",
  text2 = "برای هر عادت یک گیاه پرورش بده؛ باغچه‌ات داستان رشد تو را می‌گوید.",
  text3 = "هر عادت، یک گیاه تازه",
  viewport = "Desktop",
}: TabletHabitreeCardProps) {
  const isAndDesktop = kind === "استمرار، نه کمال" && viewport === "Desktop"
  const isAndDesktop1 = kind === "پیگیری عادت‌ها" && viewport === "Desktop"
  const isAndDesktop2 = kind === "چالش گروهی" && viewport === "Desktop"
  const isAndDesktop3 = kind === "گزارش‌های روشن" && viewport === "Desktop"

  return (
    <div
      dir="rtl"
      className={
        className ||
        "bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-col gap-[16px] h-[267px] items-end overflow-clip p-[24px] relative rounded-[24px] shadow-[0px_8px_24px_0px_var(--surface-soft)] w-[1055.2px]"
      }
      id={
        isAndDesktop3
          ? "node-44_15388"
          : isAndDesktop2
            ? "node-44_15367"
            : isAndDesktop1
              ? "node-44_15346"
              : isAndDesktop
                ? "node-44_15325"
                : "node-44_15304"
      }
    >
      {/* عنوان و آیکون */}
      <div
        dir="rtl"
        className="content-stretch flex flex-row gap-[8px] items-center justify-start overflow-clip relative shrink-0 w-full"
        id={
          isAndDesktop3
            ? "node-44_15379"
            : isAndDesktop2
              ? "node-44_15358"
              : isAndDesktop1
                ? "node-44_15337"
                : isAndDesktop
                  ? "node-44_15316"
                  : "node-44_15295"
        }
      >
        {/* آیکون در سمت راست */}
        <div
          className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[16px] shrink-0 size-[48px]"
          id={
            isAndDesktop3
              ? "node-44_15381"
              : isAndDesktop2
                ? "node-44_15360"
                : isAndDesktop1
                  ? "node-44_15339"
                  : isAndDesktop
                    ? "node-44_15318"
                    : "node-44_15297"
          }
        >
          {kind === "باغچه مجازی تو" && viewport === "Desktop" && (
            <div className="relative shrink-0 size-[24px]">
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={TabletimgSprout1}
              />
            </div>
          )}

          {isAndDesktop && (
            <div className="relative shrink-0 size-[24px]">
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={TabletimgFlame}
              />
            </div>
          )}

          {isAndDesktop1 && (
            <div className="relative shrink-0 size-[24px]">
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={TabletimgCircleCheck}
              />
            </div>
          )}

          {isAndDesktop2 && (
            <div className="relative shrink-0 size-[24px]">
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={TabletimgUsers}
              />
            </div>
          )}

          {isAndDesktop3 && (
            <div className="relative shrink-0 size-[24px]">
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={TabletimgChartNoAxesColumnIncreasing}
              />
            </div>
          )}
        </div>

        {/* عنوان در سمت چپ آیکون */}
        <p
          className="[word-break:break-word] flex-[1_0_0] font-sans font-bold leading-[1.9] min-w-px relative text-[var(--brand-dark)] text-[20px] text-right"
          dir="rtl"
        >
          {text1}
        </p>
      </div>

      {/* توضیحات کارت */}
      <p
        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[15px] text-right w-full"
        dir="rtl"
      >
        {text2}
      </p>

      {/* جمله پایین و خط کوتاه در سمت راست */}
      <div
        dir="rtl"
        className="content-stretch flex flex-row gap-[8px] items-center justify-start overflow-clip pt-[8px] relative shrink-0 w-full"
        id={
          isAndDesktop3
            ? "node-44_15385"
            : isAndDesktop2
              ? "node-44_15364"
              : isAndDesktop1
                ? "node-44_15343"
                : isAndDesktop
                  ? "node-44_15322"
                  : "node-44_15301"
        }
      >
        <p
          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--brand)] text-[13px] text-right whitespace-nowrap"
          dir="rtl"
        >
          {text3}
        </p>

        <div
          className="bg-[var(--surface-soft)] h-[3px] relative rounded-[4px] shrink-0 w-[16px]"
          id={
            isAndDesktop3
              ? "node-44_15387"
              : isAndDesktop2
                ? "node-44_15366"
                : isAndDesktop1
                  ? "node-44_15345"
                  : isAndDesktop
                    ? "node-44_15324"
                    : "node-44_15303"
          }
        />
      </div>
    </div>
  )
}


type TabletHabitreeNavbarProps = {
  className?: string
  kind?: "Responsive"
  viewport?: "Tablet"
}

function TabletHabitreeNavbar({
  className,
  kind = "Responsive",
  viewport = "Tablet",
}: TabletHabitreeNavbarProps) {
  return (
    <div
      className={
        className ||
        "content-stretch flex flex-col gap-[16px] items-start overflow-clip pb-[16px] pt-[24px] px-[40px] relative w-[1440px]"
      }
    >
      <div
        className="content-stretch flex flex-row-reverse items-center justify-between overflow-clip relative shrink-0 w-full"
      >
        <div
          className="content-stretch flex flex-row-reverse gap-[16px] items-center overflow-clip relative shrink-0"
        >
          <TabletHabitreeButton className="bg-[var(--brand)] content-stretch flex items-center min-h-[48px] overflow-clip px-[24px] relative rounded-[12px] shrink-0" />
          <TabletHabitreeButton
            className="content-stretch flex items-center min-h-[48px] overflow-clip px-[8px] relative shrink-0"
            label="ورود"
            variant="Kind Login · Viewport Desktop"
          />
        </div>
        <div
          className="content-stretch flex flex-row-reverse gap-[8px] items-center overflow-clip relative shrink-0"
        >
          <p
            className="[word-break:break-word] font-sans font-extrabold leading-[normal] relative shrink-0 text-[var(--brand)] text-[26px] whitespace-nowrap"
            dir="auto"
          >
            habitree
          </p>
          <div
            className="bg-[var(--brand)] content-stretch flex items-center justify-center overflow-clip relative rounded-[14px] shrink-0 size-[42px]"
          >
            <div
              className="relative shrink-0 size-[26px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={TabletimgSprout2}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full"
      >
        <TabletHabitreeButton
          className="content-stretch flex items-center min-h-[44px] overflow-clip relative shrink-0"
          label="درباره ما"
          variant="Kind Section link · Viewport Tablet"
        />
        <TabletHabitreeButton
          className="content-stretch flex items-center min-h-[44px] overflow-clip relative shrink-0"
          label="باغچه من"
          variant="Kind Section link · Viewport Tablet"
        />
        <TabletHabitreeButton
          className="content-stretch flex items-center min-h-[44px] overflow-clip relative shrink-0"
          label="روش کار"
          variant="Kind Section link · Viewport Tablet"
        />
        <TabletHabitreeButton
          className="content-stretch flex items-center min-h-[44px] overflow-clip relative shrink-0"
          label="امکانات"
          variant="Kind Section link · Viewport Tablet"
        />
      </div>
      <div
        className="bg-[var(--surface-soft)] h-px relative shrink-0 w-full"
      />
    </div>
  )
}

function TabletHabitreePage() {
  return (
    <div
      className="bg-[var(--background)] content-stretch flex flex-col items-start relative min-h-[100dvh] w-full"
    
      dir="rtl">
      <div
        className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      >
        <TabletHabitreeNavbar className="content-stretch flex flex-col gap-[16px] items-start overflow-clip pb-[16px] pt-[24px] px-[40px] relative shrink-0 w-full" />
        <div
          className="content-stretch flex flex-col gap-[32px] items-center pb-[48px] pt-[32px] px-[40px] relative shrink-0 w-full"
        >
          <div
            className="content-stretch flex flex-col gap-[24px] items-end overflow-clip relative shrink-0 w-full"
          >
            <TabletHabitreeBadge
              className="bg-[var(--surface-soft)] content-stretch flex flex-row-reverse gap-[8px] items-center overflow-clip px-[16px] py-[8px] relative rounded-[999px] shrink-0"
              kind="Small beginnings"
              text1="هر روز، یک برگ تازه"
            />
            <div
              className="[word-break:break-word] font-sans font-extrabold leading-[0] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[48px] text-right w-[min-content]"
            >
              <p className="leading-[1.55] mb-0" dir="auto">
                عادت‌های کوچک،
              </p>
              <p className="leading-[1.55]" dir="auto">
                زندگی بزرگ‌تر
              </p>
            </div>
            <p
              className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[18px] text-right w-[min-content]"
              dir="auto"
            >
              با Habitree عادت‌های خوبت را بساز و هر روز به آن‌ها رسیدگی کن. هر
              بار که ادامه می‌دهی، گیاهی در باغچه‌ات جان می‌گیرد.
            </p>
            <div
              className="content-stretch flex flex-row-reverse gap-[16px] items-start justify-end overflow-clip relative shrink-0 w-full"
            >
              <TabletHabitreeButton
                className="bg-[var(--background)] border border-[var(--surface-soft)] border-solid content-stretch flex items-center justify-center min-h-[48px] overflow-clip px-[24px] py-[8px] relative rounded-[12px] shrink-0"
                label="ببین چطور کار می‌کند"
                variant="Kind Secondary · Viewport Desktop"
              />
              <TabletHabitreeButton
                className="bg-[var(--brand)] content-stretch flex gap-[8px] items-center justify-center min-h-[48px] overflow-clip px-[24px] py-[8px] relative rounded-[12px] shrink-0"
                label="رایگان شروع کن"
                variant="Kind Primary · Viewport Desktop"
              />
            </div>
            <div
              className="content-stretch flex flex-row-reverse gap-[8px] items-center justify-end overflow-clip relative shrink-0 w-full"
            >
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[13px] text-right whitespace-nowrap"
                dir="auto"
              >
                شروع رایگان · بدون نیاز به کارت بانکی
              </p>
              <div
                className="relative shrink-0 size-[16px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={TabletimgCheck1}
                />
              </div>
            </div>
          </div>
          <div
            className="h-[472px] relative shrink-0 w-[552px]"
          >
            <div
              className="absolute h-[400px] left-[40px] top-[32px] w-[472px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={TabletimgGardenBackdrop}
              />
            </div>
            <div
              className="absolute h-[432px] left-[24px] top-[16px] w-[504px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={TabletimgOrbit}
              />
            </div>
            <div
              className="absolute h-[400px] left-[56px] overflow-clip top-[32px] w-[448px]"
            >
              <div
                className="absolute left-0 overflow-clip size-[216px] top-[125px]"
              >
                <div
                  className="absolute left-0 size-[216px] top-0"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={TabletimgIllustrationBotanicalGrowth1}
                  />
                </div>
              </div>
              <div
                className="absolute left-[116px] overflow-clip size-[328px] top-0"
              >
                <div
                  className="absolute left-0 size-[328px] top-0"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={TabletimgIllustrationBotanicalGrowth2}
                  />
                </div>
              </div>
              <div
                className="absolute left-[254px] overflow-clip size-[160px] top-[219px]"
              >
                <div
                  className="absolute left-0 size-[160px] top-0"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={TabletimgIllustrationBotanicalGrowth3}
                  />
                </div>
              </div>
            </div>
            <div
              className="absolute left-[520px] size-[7px] top-[260px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={TabletimgFloatingSeed}
              />
            </div>
            <div
              className="absolute left-[20px] size-[9px] top-[128px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={TabletimgFloatingSeed1}
              />
            </div>
            <TabletHabitreeBadge className="absolute bg-white border border-[var(--surface-soft)] border-solid content-stretch flex gap-[8px] items-center left-[366px] overflow-clip px-[16px] py-[8px] rounded-[999px] top-[64px]" />
            <TabletHabitreeBadge
              className="absolute bg-white content-stretch flex gap-[12px] items-center left-[8px] overflow-clip p-[16px] rounded-[16px] shadow-[0px_16px_40px_0px_var(--surface-soft)] top-[322px]"
              kind="Streak celebration"
              text1="۷ روز استمرار، یک برگ تازه!"
            />
          </div>
        </div>
        <div className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip px-[24px] py-[24px] relative shrink-0 w-full">
          <p
            className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[15px] text-center whitespace-nowrap"
            dir="auto"
          >
            قرار نیست یک‌شبه تغییر کنی؛ فقط امروز، یک قدم کوچک بردار.
          </p>
        </div>
      </div>
      <div
        className="content-stretch flex flex-col gap-[40px] items-start overflow-clip px-[40px] py-[80px] relative shrink-0 w-full"
      >
        <div
          className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-center overflow-clip relative shrink-0 text-center w-full"
        >
          <p
            className="font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[13px] w-full"
            dir="auto"
          >
            ابزارهای ساده برای روزهای بهتر
          </p>
          <p
            className="font-sans font-extrabold leading-[1.6] relative shrink-0 text-[var(--brand-dark)] text-[36px] w-full"
            dir="auto"
          >
            همه‌چیز برای ادامه دادن
          </p>
          <p
            className="font-sans font-normal leading-[1.9] max-w-[640px] relative shrink-0 text-[var(--muted)] text-[16px] w-full"
            dir="auto"
          >
            کمتر درگیر برنامه‌ریزی شو، بیشتر روی رشد خودت تمرکز کن.
          </p>
        </div>
        <div
          className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full"
        >
          <div
            className="content-stretch flex flex-row-reverse gap-[24px] items-start relative shrink-0 w-full"
          >
            <TabletHabitreeCard
              className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip p-[24px] relative rounded-[24px] self-stretch shadow-[0px_8px_24px_0px_var(--surface-soft)]"
              kind="استمرار، نه کمال"
              text1="استمرار، نه کمال"
              text2="زنجیره روزهای پیوسته‌ات را ببین و برای قدم بعدی انگیزه بگیر."
              text3="Streak · هر روز یک قدم"
            />
            <TabletHabitreeCard
              className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip p-[24px] relative rounded-[24px] self-stretch shadow-[0px_8px_24px_0px_var(--surface-soft)]"
              kind="پیگیری عادت‌ها"
              text1="پیگیری عادت‌ها"
              text2="عادتت را با هدفی شدنی بساز؛ از یک لیوان آب بیشتر تا چند صفحه کتاب."
              text3="هدف‌های کوچک، تیک‌های بزرگ"
            />
          </div>
          <div
            className="content-stretch flex flex-row-reverse gap-[24px] items-start relative shrink-0 w-full"
          >
            <TabletHabitreeCard
              className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip p-[24px] relative rounded-[24px] self-stretch shadow-[0px_8px_24px_0px_var(--surface-soft)]"
              kind="گزارش‌های روشن"
              text1="گزارش‌های روشن"
              text2="با مرور پیشرفت هفتگی و ماهانه، ریتم مناسب خودت را پیدا کن."
              text3="پیشرفتت را بهتر بشناس"
            />
            <TabletHabitreeCard className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip p-[24px] relative rounded-[24px] self-stretch shadow-[0px_8px_24px_0px_var(--surface-soft)]" />
          </div>
          <div
            className="content-stretch flex items-start relative shrink-0 w-full"
          >
            <TabletHabitreeCard
              className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip p-[24px] relative rounded-[24px] self-stretch shadow-[0px_8px_24px_0px_var(--surface-soft)]"
              kind="چالش گروهی"
              text1="چالش گروهی"
              text2="کنار دوستانت یک چالش بساز؛ به هم دلگرمی بدهید و با هم ادامه دهید."
              text3="با هم ریشه می‌گیریم"
            />
          </div>
        </div>
      </div>
      <div
        className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
      >
        <div
          className="content-stretch flex flex-col gap-[40px] items-start overflow-clip pb-[80px] pt-[24px] px-[40px] relative shrink-0 w-full"
        >
          <div
            className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-center overflow-clip relative shrink-0 text-center w-full"
          >
            <p
              className="font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[13px] w-full"
              dir="auto"
            >
              از تصمیم تا ریشه
            </p>
            <p
              className="font-sans font-extrabold leading-[1.6] relative shrink-0 text-[var(--brand-dark)] text-[36px] w-full"
              dir="auto"
            >
              چطور کار می‌کند؟
            </p>
            <p
              className="font-sans font-normal leading-[1.9] max-w-[640px] relative shrink-0 text-[var(--muted)] text-[16px] w-full"
              dir="auto"
            >
              چهار قدم ساده؛ نه برای بی‌نقص بودن، برای هر روز کمی بهتر شدن.
            </p>
          </div>
          <div
            className="content-stretch flex flex-col gap-[32px] items-start overflow-clip relative shrink-0 w-full"
          >
            <div
              dir="ltr"
            className="content-stretch flex gap-[32px] items-start overflow-clip relative shrink-0 w-full"
            >
              <div
                className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip relative self-stretch"
              >
                <div
                  className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full"
                >
                  <div
                    className="bg-[var(--surface-soft)] flex-[1_0_0] h-px min-w-px relative"
                  />
                  <TabletHabitreeBadge
                    className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[16px] shrink-0 size-[48px]"
                    kind="Step"
                    text1="۰۲"
                  />
                </div>
                <p
                  className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[21px] text-right w-full"
                  dir="auto"
                >
                  ثبت روزانه
                </p>
                <p
                  className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[14px] text-right w-full"
                  dir="auto"
                >
                  هر بار انجامش دادی، با یک تیک ثبتش کن.
                </p>
              </div>
              <div
                className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip relative self-stretch"
              >
                <div
                  className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full"
                >
                  <div
                    className="bg-[var(--surface-soft)] flex-[1_0_0] h-px min-w-px relative"
                  />
                  <TabletHabitreeBadge
                    className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[16px] shrink-0 size-[48px]"
                    kind="Step"
                    text1="۰۱"
                  />
                </div>
                <p
                  className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[21px] text-right w-full"
                  dir="auto"
                >
                  ساخت عادت
                </p>
                <p
                  className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[14px] text-right w-full"
                  dir="auto"
                >
                  یک هدف کوچک و یک گیاه برایش انتخاب کن.
                </p>
              </div>
            </div>
            <div
              dir="ltr"
              className="content-stretch flex gap-[32px] items-start overflow-clip relative shrink-0 w-full"
            >
              <div
                className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip relative self-stretch"
              >
                <div
                  className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full"
                >
                  <div
                    className="bg-[var(--surface-soft)] flex-[1_0_0] h-px min-w-px relative"
                  />
                  <TabletHabitreeBadge
                    className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[16px] shrink-0 size-[48px]"
                    kind="Step"
                    text1="۰۴"
                  />
                </div>
                <p
                  className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[21px] text-right w-full"
                  dir="auto"
                >
                  رشد گیاه
                </p>
                <p
                  className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[14px] text-right w-full"
                  dir="auto"
                >
                  با هر ثبت، جان گرفتن گیاهت را تماشا کن.
                </p>
              </div>
              <div
                className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip relative self-stretch"
              >
                <div
                  className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full"
                >
                  <div
                    className="bg-[var(--surface-soft)] flex-[1_0_0] h-px min-w-px relative"
                  />
                  <TabletHabitreeBadge
                    className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[16px] shrink-0 size-[48px]"
                    kind="Step"
                    text1="۰۳"
                  />
                </div>
                <p
                  className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[21px] text-right w-full"
                  dir="auto"
                >
                  حفظ استمرار
                </p>
                <p
                  className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[14px] text-right w-full"
                  dir="auto"
                >
                  روزهای پیوسته را بساز؛ با ریتم خودت جلو برو.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-[var(--surface-soft)] content-stretch flex flex-col gap-[40px] items-start overflow-clip px-[40px] py-[64px] relative shrink-0 w-full"
        >
          <div
            className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-center overflow-clip relative shrink-0 text-center w-full"
          >
            <p
              className="font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[13px] w-full"
              dir="auto"
            >
              رشد تو، دیدنی می‌شود
            </p>
            <p
              className="font-sans font-extrabold leading-[1.6] relative shrink-0 text-[var(--brand-dark)] text-[36px] w-full"
              dir="auto"
            >
              از یک دانه تا یک حالِ خوب
            </p>
            <p
              className="font-sans font-normal leading-[1.9] max-w-[640px] relative shrink-0 text-[var(--muted)] text-[16px] w-full"
              dir="auto"
            >
              هر ثبت کوچک، فرصتی برای رشد است. گیاهت پا‌به‌پای تو قد می‌کشد.
            </p>
          </div>
          <div
            dir="ltr"
            className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full"
          >
            <div
              className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
            >
              <div
                className="relative shrink-0 size-[112px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={TabletimgIllustrationBotanicalGrowth4}
                />
              </div>
              <p
                className="[word-break:break-word] font-sans font-bold leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[15px] text-center w-[min-content]"
                dir="auto"
              >
                گیاه شکوفا
              </p>
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[13px] text-center w-[min-content]"
                dir="auto"
              >
                ۲۱ ثبت
              </p>
            </div>
            <div
              className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
            >
              <div
                className="relative shrink-0 size-[112px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={TabletimgIllustrationBotanicalGrowth5}
                />
              </div>
              <p
                className="[word-break:break-word] font-sans font-bold leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[15px] text-center w-[min-content]"
                dir="auto"
              >
                گیاه بالنده
              </p>
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[13px] text-center w-[min-content]"
                dir="auto"
              >
                ۱۴ ثبت
              </p>
            </div>
            <div
              className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
            >
              <div
                className="relative shrink-0 size-[112px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={TabletimgIllustrationBotanicalGrowth6}
                />
              </div>
              <p
                className="[word-break:break-word] font-sans font-bold leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[15px] text-center w-[min-content]"
                dir="auto"
              >
                برگ‌های تازه
              </p>
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[13px] text-center w-[min-content]"
                dir="auto"
              >
                ۷ ثبت
              </p>
            </div>
            <div
              className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
            >
              <div
                className="relative shrink-0 size-[112px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={TabletimgIllustrationBotanicalGrowth7}
                />
              </div>
              <p
                className="[word-break:break-word] font-sans font-bold leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[15px] text-center w-[min-content]"
                dir="auto"
              >
                جوانه کوچک
              </p>
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[13px] text-center w-[min-content]"
                dir="auto"
              >
                ۳ ثبت
              </p>
            </div>
            <div
              className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
            >
              <div
                className="relative shrink-0 size-[112px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={TabletimgIllustrationBotanicalGrowth8}
                />
              </div>
              <p
                className="[word-break:break-word] font-sans font-bold leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[15px] text-center w-[min-content]"
                dir="auto"
              >
                دانه امید
              </p>
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[13px] text-center w-[min-content]"
                dir="auto"
              >
                اولین ثبت
              </p>
            </div>
          </div>
          <p
            className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[12px] text-center w-full"
            dir="auto"
          >
            نمایش نمادین رشد گیاه؛ این مراحل نشان‌دهنده تعداد ثبت‌ها هستند، نه
            زمان قطعی ساخت یک عادت.
          </p>
        </div>
      </div>
      <div
        className="content-stretch flex flex-col gap-[40px] items-start px-[40px] py-[80px] relative shrink-0 w-full"
      >
        <div
          className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-center overflow-clip relative shrink-0 text-center w-full"
        >
          <p
            className="font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[13px] w-full"
            dir="auto"
          >
            یک نگاه به Habitree
          </p>
          <p
            className="font-sans font-extrabold leading-[1.6] relative shrink-0 text-[var(--brand-dark)] text-[36px] w-full"
            dir="auto"
          >
            جایی برای دیدن رشدت
          </p>
          <p
            className="font-sans font-normal leading-[1.9] max-w-[640px] relative shrink-0 text-[var(--muted)] text-[16px] w-full"
            dir="auto"
          >
            عادت‌ها، استمرار و باغچه‌ات؛ همه در یک فضای آرام و روشن، کنار هم.
          </p>
        </div>
        <div
          className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[32px] shadow-[0px_16px_40px_0px_var(--surface-soft)] shrink-0 w-full"
        >
          <div
            className="border-[var(--surface-soft)] border-b border-solid content-stretch flex flex-row-reverse items-center justify-between overflow-clip p-[24px] relative shrink-0 w-full"
          >
            <TabletHabitreeBadge
              className="bg-[var(--surface-soft)] content-stretch flex items-start overflow-clip px-[12px] py-[8px] relative rounded-[999px] shrink-0"
              kind="Demo"
              text1="پیش‌نمایش مفهومی"
            />
            <div
              className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0"
            >
              <p
                className="[word-break:break-word] font-sans font-extrabold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[18px] text-right whitespace-nowrap"
                dir="auto"
              >
                باغچه سارا
              </p>
              <div
                className="relative shrink-0 size-[22px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={TabletimgSprout3}
                />
              </div>
            </div>
          </div>
          <div
            className="content-stretch flex flex-row-reverse items-start justify-between overflow-clip px-[24px] py-[8px] relative shrink-0 w-full"
          >
            <div
              className="content-stretch flex items-center min-h-[44px] overflow-clip relative shrink-0"
            >
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[12px] text-right whitespace-nowrap"
                dir="auto"
              >
                چالش‌ها
              </p>
            </div>
            <div
              className="content-stretch flex items-center min-h-[44px] overflow-clip relative shrink-0"
            >
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[12px] text-right whitespace-nowrap"
                dir="auto"
              >
                گزارش‌ها
              </p>
            </div>
            <div
              className="content-stretch flex items-center min-h-[44px] overflow-clip relative shrink-0"
            >
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[12px] text-right whitespace-nowrap"
                dir="auto"
              >
                باغچه
              </p>
            </div>
            <div
              className="content-stretch flex items-center min-h-[44px] overflow-clip relative shrink-0"
            >
              <p
                className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[12px] text-right whitespace-nowrap"
                dir="auto"
              >
                امروز
              </p>
            </div>
          </div>
          <div
            className="content-stretch flex items-start overflow-clip p-[24px] relative shrink-0 w-full"
          >
            <div
              className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px overflow-clip relative"
            >
              <div
                className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[1.9] overflow-clip relative shrink-0 text-right w-full"
              >
                <p
                  className="font-sans font-extrabold relative shrink-0 text-[var(--brand-dark)] text-[28px] w-full"
                  dir="auto"
                >
                  سلام سارا، وقت رشد کردنه!
                </p>
                <p
                  className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[13px] w-full"
                  dir="auto"
                >
                  جمعه، ۱۸ آبان · امروز هم یک قدم برای خودت
                </p>
              </div>
              <div
                className="[word-break:break-word] content-stretch flex gap-[16px] items-start leading-[1.9] overflow-clip relative shrink-0 w-full"
              >
                <div
                  className="bg-[var(--background)] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-w-px overflow-clip px-[8px] py-[16px] relative rounded-[16px]"
                >
                  <p
                    className="font-sans font-extrabold relative shrink-0 text-[var(--brand-dark)] text-[25px] text-right whitespace-nowrap"
                  >
                    ۴
                  </p>
                  <p
                    className="font-sans font-normal min-w-full relative shrink-0 text-[var(--muted)] text-[12px] text-center w-[min-content]"
                    dir="auto"
                  >
                    عادت فعال
                  </p>
                </div>
                <div
                  className="bg-[var(--background)] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-w-px overflow-clip px-[8px] py-[16px] relative rounded-[16px]"
                >
                  <p
                    className="font-sans font-extrabold relative shrink-0 text-[var(--brand-dark)] text-[25px] text-right whitespace-nowrap"
                    dir="auto"
                  >
                    ۲۱ روز
                  </p>
                  <p
                    className="font-sans font-normal min-w-full relative shrink-0 text-[var(--muted)] text-[12px] text-center w-[min-content]"
                    dir="auto"
                  >
                    بیشترین استمرار
                  </p>
                </div>
                <div
                  className="bg-[var(--background)] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-w-px overflow-clip px-[8px] py-[16px] relative rounded-[16px]"
                >
                  <p
                    className="font-sans font-extrabold relative shrink-0 text-[var(--brand-dark)] text-[25px] text-right whitespace-nowrap"
                  >
                    ۵۰٪
                  </p>
                  <p
                    className="font-sans font-normal min-w-full relative shrink-0 text-[var(--muted)] text-[12px] text-center w-[min-content]"
                    dir="auto"
                  >
                    پیشرفت امروز
                  </p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col gap-[24px] items-start overflow-clip relative shrink-0 w-full"
              >
                <div
                  className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-[24px] shrink-0 w-full"
                >
                  <div
                    className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.9] overflow-clip relative shrink-0 text-right w-full whitespace-nowrap"
                  >
                    <p
                      className="font-sans font-normal relative shrink-0 text-[var(--brand)] text-[12px]"
                      dir="auto"
                    >
                      ۲ از ۴ انجام شده
                    </p>
                    <p
                      className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[18px]"
                      dir="auto"
                    >
                      عادت‌های امروز
                    </p>
                  </div>
                  <div
                    className="bg-[var(--surface-soft)] content-stretch flex h-[6px] items-start justify-end overflow-clip relative rounded-[4px] shrink-0 w-full"
                  >
                    <div
                      className="bg-[var(--surface-soft)] flex-[1_0_0] h-[6px] min-w-px relative rounded-[4px]"
                    />
                    <div
                      className="bg-[var(--brand)] flex-[1_0_0] h-[6px] min-w-px relative rounded-[4px]"
                    />
                  </div>
                  <div
                    className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
                  >
                    <div
                      className="border-[var(--surface-soft)] border-b border-solid content-stretch flex flex-col gap-[8px] items-start overflow-clip py-[16px] relative shrink-0 w-full"
                    >
                      <div
                        className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full"
                      >
                        <TabletHabitreeButton
                          className="bg-[var(--brand)] border border-[var(--brand)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[14px] shrink-0 size-[44px]"
                          variant="Kind Completed · Viewport Desktop"
                        />
                        <div
                          className="[word-break:break-word] content-stretch flex flex-col items-end leading-[1.9] overflow-clip relative shrink-0 text-right w-[72px] whitespace-nowrap"
                        >
                          <p
                            className="font-sans font-bold relative shrink-0 text-[var(--brand)] text-[14px]"
                            dir="auto"
                          >
                            ۲۱ روز
                          </p>
                          <p
                            className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[11px]"
                            dir="auto"
                          >
                            استمرار
                          </p>
                        </div>
                        <div
                          className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start leading-[1.9] min-w-px overflow-clip relative text-right"
                        >
                          <p
                            className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[16px] w-full"
                            dir="auto"
                          >
                            مطالعه روزانه
                          </p>
                          <p
                            className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[12px] w-full"
                            dir="auto"
                          >
                            ۱۰ صفحه از یک کتاب
                          </p>
                        </div>
                        <div
                          className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[40px]"
                        >
                          <div
                            className="relative shrink-0 size-[20px]"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={TabletimgBookOpen}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="[word-break:break-word] content-stretch flex font-sans font-normal items-start justify-between leading-[1.9] overflow-clip relative shrink-0 text-[12px] text-right w-full whitespace-nowrap"
                      >
                        <p
                          className="relative shrink-0 text-[var(--brand)]"
                          dir="auto"
                        >
                          ۱۰ از ۱۰ صفحه
                        </p>
                        <p
                          className="relative shrink-0 text-[var(--muted)]"
                          dir="auto"
                        >
                          امروز به گیاهت رسیدگی کردی
                        </p>
                      </div>
                    </div>
                    <div
                      className="border-[var(--surface-soft)] border-b border-solid content-stretch flex flex-col gap-[8px] items-start overflow-clip py-[16px] relative shrink-0 w-full"
                    >
                      <div
                        className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full"
                      >
                        <TabletHabitreeButton
                          className="bg-[var(--brand)] border border-[var(--brand)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[14px] shrink-0 size-[44px]"
                          variant="Kind Completed · Viewport Desktop"
                        />
                        <div
                          className="[word-break:break-word] content-stretch flex flex-col items-end leading-[1.9] overflow-clip relative shrink-0 text-right w-[72px] whitespace-nowrap"
                        >
                          <p
                            className="font-sans font-bold relative shrink-0 text-[var(--brand)] text-[14px]"
                            dir="auto"
                          >
                            ۳ روز
                          </p>
                          <p
                            className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[11px]"
                            dir="auto"
                          >
                            استمرار
                          </p>
                        </div>
                        <div
                          className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start leading-[1.9] min-w-px overflow-clip relative text-right"
                        >
                          <p
                            className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[16px] w-full"
                            dir="auto"
                          >
                            نوشیدن آب
                          </p>
                          <p
                            className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[12px] w-full"
                            dir="auto"
                          >
                            ۸ لیوان در روز
                          </p>
                        </div>
                        <div
                          className="bg-[var(--accent)] content-stretch flex items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[40px]"
                        >
                          <div
                            className="relative shrink-0 size-[20px]"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={TabletimgDroplets}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="[word-break:break-word] content-stretch flex font-sans font-normal items-start justify-between leading-[1.9] overflow-clip relative shrink-0 text-[12px] text-right w-full whitespace-nowrap"
                      >
                        <p
                          className="relative shrink-0 text-[var(--brand)]"
                          dir="auto"
                        >
                          ۸ از ۸ لیوان
                        </p>
                        <p
                          className="relative shrink-0 text-[var(--muted)]"
                          dir="auto"
                        >
                          امروز به گیاهت رسیدگی کردی
                        </p>
                      </div>
                    </div>
                    <div
                      className="border-[var(--surface-soft)] border-b border-solid content-stretch flex flex-col gap-[8px] items-start overflow-clip py-[16px] relative shrink-0 w-full"
                    >
                      <div
                        className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full"
                      >
                        <TabletHabitreeButton
                          className="bg-[var(--background)] border border-[var(--surface-soft)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[14px] shrink-0 size-[44px]"
                          variant="Kind Log habit · Viewport Desktop"
                        />
                        <div
                          className="[word-break:break-word] content-stretch flex flex-col items-end leading-[1.9] overflow-clip relative shrink-0 text-right w-[72px] whitespace-nowrap"
                        >
                          <p
                            className="font-sans font-bold relative shrink-0 text-[var(--brand)] text-[14px]"
                            dir="auto"
                          >
                            ۷ روز
                          </p>
                          <p
                            className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[11px]"
                            dir="auto"
                          >
                            استمرار
                          </p>
                        </div>
                        <div
                          className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start leading-[1.9] min-w-px overflow-clip relative text-right"
                        >
                          <p
                            className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[16px] w-full"
                            dir="auto"
                          >
                            پیاده‌روی
                          </p>
                          <p
                            className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[12px] w-full"
                            dir="auto"
                          >
                            ۲۰ دقیقه در روز
                          </p>
                        </div>
                        <div
                          className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[40px]"
                        >
                          <div
                            className="relative shrink-0 size-[20px]"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={TabletimgFootprints}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="[word-break:break-word] content-stretch flex font-sans font-normal items-start justify-between leading-[1.9] overflow-clip relative shrink-0 text-[var(--muted)] text-[12px] text-right w-full whitespace-nowrap"
                      >
                        <p
                          className="relative shrink-0"
                          dir="auto"
                        >
                          ۰ از ۲۰ دقیقه
                        </p>
                        <p
                          className="relative shrink-0"
                          dir="auto"
                        >
                          یک قدم کوچک باقی مانده
                        </p>
                      </div>
                    </div>
                    <div
                      className="border-[var(--surface-soft)] border-b border-solid content-stretch flex flex-col gap-[8px] items-start overflow-clip py-[16px] relative shrink-0 w-full"
                    >
                      <div
                        className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full"
                      >
                        <TabletHabitreeButton
                          className="bg-[var(--background)] border border-[var(--surface-soft)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[14px] shrink-0 size-[44px]"
                          variant="Kind Log habit · Viewport Desktop"
                        />
                        <div
                          className="[word-break:break-word] content-stretch flex flex-col items-end leading-[1.9] overflow-clip relative shrink-0 text-right w-[72px] whitespace-nowrap"
                        >
                          <p
                            className="font-sans font-bold relative shrink-0 text-[var(--brand)] text-[14px]"
                            dir="auto"
                          >
                            ۱ روز
                          </p>
                          <p
                            className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[11px]"
                            dir="auto"
                          >
                            استمرار
                          </p>
                        </div>
                        <div
                          className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start leading-[1.9] min-w-px overflow-clip relative text-right"
                        >
                          <p
                            className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[16px] w-full"
                            dir="auto"
                          >
                            آرامش ذهن
                          </p>
                          <p
                            className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[12px] w-full"
                            dir="auto"
                          >
                            ۱۰ دقیقه مراقبه
                          </p>
                        </div>
                        <div
                          className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[40px]"
                        >
                          <div
                            className="relative shrink-0 size-[20px]"
                          >
                            <img
                              alt=""
                              className="absolute block inset-0 max-w-none size-full"
                              src={TabletimgSun}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="[word-break:break-word] content-stretch flex font-sans font-normal items-start justify-between leading-[1.9] overflow-clip relative shrink-0 text-[var(--muted)] text-[12px] text-right w-full whitespace-nowrap"
                      >
                        <p
                          className="relative shrink-0"
                          dir="auto"
                        >
                          ۰ از ۱۰ دقیقه
                        </p>
                        <p
                          className="relative shrink-0"
                          dir="auto"
                        >
                          یک قدم کوچک باقی مانده
                        </p>
                      </div>
                    </div>
                  </div>
                  <TabletHabitreeButton
                    className="bg-[var(--surface-soft)] content-stretch flex gap-[8px] h-[48px] items-center justify-center min-h-[48px] overflow-clip relative rounded-[12px] shrink-0 w-full"
                    label="ساخت عادت تازه"
                    variant="Kind Add habit · Viewport Desktop"
                  />
                </div>
                <div
                  className="bg-[var(--accent)] content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-[24px] shrink-0 w-full"
                >
                  <p
                    className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[17px] text-right w-full"
                    dir="auto"
                  >
                    باغچه کوچک سارا
                  </p>
                  <div
                    className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
                  >
                    <div
                      className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full"
                    >
                      <div
                        className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-w-px overflow-clip relative"
                      >
                        <div
                          className="relative shrink-0 size-[96px]"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={TabletimgIllustrationBotanicalGrowth9}
                          />
                        </div>
                        <p
                          className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[12px] text-center w-[min-content]"
                          dir="auto"
                        >
                          آرامش ذهن
                        </p>
                      </div>
                      <div
                        className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-w-px overflow-clip relative"
                      >
                        <div
                          className="relative shrink-0 size-[96px]"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={TabletimgIllustrationBotanicalGrowth10}
                          />
                        </div>
                        <p
                          className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[12px] text-center w-[min-content]"
                          dir="auto"
                        >
                          پیاده‌روی
                        </p>
                      </div>
                      <div
                        className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-w-px overflow-clip relative"
                      >
                        <div
                          className="relative shrink-0 size-[96px]"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={TabletimgIllustrationBotanicalGrowth11}
                          />
                        </div>
                        <p
                          className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[12px] text-center w-[min-content]"
                          dir="auto"
                        >
                          نوشیدن آب
                        </p>
                      </div>
                      <div
                        className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-w-px overflow-clip relative"
                      >
                        <div
                          className="relative shrink-0 size-[96px]"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={TabletimgIllustrationBotanicalGrowth12}
                          />
                        </div>
                        <p
                          className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[12px] text-center w-[min-content]"
                          dir="auto"
                        >
                          مطالعه روزانه
                        </p>
                      </div>
                    </div>
                  </div>
                  <p
                    className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[12px] text-center w-full"
                    dir="auto"
                  >
                    هر کدام، نشانه یک قدم از تو.
                  </p>
                </div>
                <div
                  className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-[24px] shrink-0 w-full"
                >
                  <p
                    className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[17px] text-right w-full"
                    dir="auto"
                  >
                    ریتم این هفته
                  </p>
                  <div
                    className="content-stretch flex gap-[12px] h-[112px] items-end relative shrink-0 w-full"
                  >
                    <div
                      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
                    >
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                      >
                        ۲
                      </p>
                      <div
                        className="bg-[var(--brand)] h-[30px] max-w-[28px] relative rounded-[5px] shrink-0 w-full"
                      />
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                        dir="auto"
                      >
                        ج
                      </p>
                    </div>
                    <div
                      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
                    >
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                      >
                        ۴
                      </p>
                      <div
                        className="bg-[var(--surface-soft)] h-[60px] max-w-[28px] relative rounded-[5px] shrink-0 w-full"
                      />
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                        dir="auto"
                      >
                        پ
                      </p>
                    </div>
                    <div
                      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
                    >
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                      >
                        ۳
                      </p>
                      <div
                        className="bg-[var(--surface-soft)] h-[45px] max-w-[28px] relative rounded-[5px] shrink-0 w-full"
                      />
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                        dir="auto"
                      >
                        چ
                      </p>
                    </div>
                    <div
                      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
                    >
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                      >
                        ۳
                      </p>
                      <div
                        className="bg-[var(--surface-soft)] h-[45px] max-w-[28px] relative rounded-[5px] shrink-0 w-full"
                      />
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                        dir="auto"
                      >
                        س
                      </p>
                    </div>
                    <div
                      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
                    >
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                      >
                        ۲
                      </p>
                      <div
                        className="bg-[var(--surface-soft)] h-[30px] max-w-[28px] relative rounded-[5px] shrink-0 w-full"
                      />
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                        dir="auto"
                      >
                        د
                      </p>
                    </div>
                    <div
                      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
                    >
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                      >
                        ۲
                      </p>
                      <div
                        className="bg-[var(--surface-soft)] h-[30px] max-w-[28px] relative rounded-[5px] shrink-0 w-full"
                      />
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                        dir="auto"
                      >
                        ی
                      </p>
                    </div>
                    <div
                      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
                    >
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                      >
                        ۲
                      </p>
                      <div
                        className="bg-[var(--surface-soft)] h-[30px] max-w-[28px] relative rounded-[5px] shrink-0 w-full"
                      />
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                        dir="auto"
                      >
                        ش
                      </p>
                    </div>
                  </div>
                  <p
                    className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[12px] text-right w-full"
                    dir="auto"
                  >
                    ۱۸ از ۲۸ ثبت هفتگی · ۶۴٪ پیشرفت
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p
          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[12px] text-center w-full"
          dir="auto"
        >
          این یک نمونه نمایشی از تجربه Habitree است؛ اطلاعات سارا و عادت‌ها واقعی
          یا زنده نیستند.
        </p>
      </div>
      <div
        className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
      >
        <div
          className="content-stretch flex flex-col gap-[32px] items-center overflow-clip pb-[64px] pt-[24px] px-[40px] relative shrink-0 w-full"
        >
          <div
            className="content-stretch flex flex-col gap-[16px] items-end overflow-clip relative shrink-0 w-full"
          >
            <p
              className="[word-break:break-word] font-sans font-bold leading-[1.9] min-w-full relative shrink-0 text-[var(--brand)] text-[13px] text-right w-[min-content]"
              dir="auto"
            >
              درباره Habitree
            </p>
            <p
              className="[word-break:break-word] font-sans font-extrabold leading-[1.6] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[36px] text-right w-[min-content]"
              dir="auto"
            >
              برای رشد، به خودت فرصت بده.
            </p>
            <p
              className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[16px] text-right w-[min-content]"
              dir="auto"
            >
              ما باور داریم تغییرهای ماندگار از کارهای کوچک شروع می‌شوند؛ نه از
              برنامه‌های سنگین و انتظارهای بزرگ.
            </p>
            <p
              className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[15px] text-right w-[min-content]"
              dir="auto"
            >
              Habitree همراهی آرام برای ساختن عادت‌هاست. اینجا هر تیک فقط یک کار
              انجام‌شده نیست؛ نشانه زمانی است که برای خودت گذاشته‌ای. باغچه‌ات
              یادآوری می‌کند که تلاش‌های کوچک، ارزش دیده شدن دارند.
            </p>
            <div
              className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0"
            >
              <p
                className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[14px] text-right whitespace-nowrap"
                dir="auto"
              >
                با ریتم خودت، بدون مقایسه
              </p>
              <div
                className="relative shrink-0 size-[18px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={TabletimgHeart1}
                />
              </div>
            </div>
          </div>
          <TabletHabitreeCardBrandPhilosophy className="bg-[var(--background)] content-stretch flex flex-col gap-[16px] h-[356px] items-center overflow-clip p-[32px] relative rounded-[32px] shrink-0 w-[440px]" />
        </div>
        <div
          className="content-stretch flex flex-col items-start overflow-clip pb-[64px] px-[40px] relative shrink-0 w-full"
        >
          <div
            className="bg-[var(--brand-dark)] content-stretch flex flex-row-reverse gap-[24px] items-center overflow-clip p-[48px] relative rounded-[32px] shrink-0 w-full"
          >
            <div
              className="bg-[var(--background)] content-stretch flex flex-col h-[184px] items-center justify-center overflow-clip relative rounded-[32px] shrink-0 w-[152px]"
            >
              <div
                className="relative shrink-0 size-[144px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={TabletimgIllustrationBotanicalGrowth13}
                />
              </div>
            </div>
            <div
              className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip relative"
            >
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--surface-soft)] text-[13px] text-right w-[min-content]"
                dir="auto"
              >
                اولین برگ، منتظر توست
              </p>
              <p
                className="[word-break:break-word] font-sans font-extrabold leading-[1.6] min-w-full relative shrink-0 text-[var(--background)] text-[28px] text-right w-[min-content]"
                dir="auto"
              >
                امروز، بذر فردای بهترت را بکار.
              </p>
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--surface-soft)] text-[15px] text-right w-[min-content]"
                dir="auto"
              >
                یک عادت کوچک انتخاب کن. بقیه مسیر را قدم‌به‌قدم، کنار هم رشد
                می‌دهیم.
              </p>
              <TabletHabitreeButton
                className="bg-[var(--brand)] content-stretch flex gap-[8px] items-center justify-center min-h-[48px] overflow-clip px-[24px] py-[8px] relative rounded-[12px] shrink-0"
                label="رایگان ثبت‌نام کن"
                variant="Kind Primary · Viewport Desktop"
              />
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--surface-soft)] text-[12px] text-right w-[min-content]"
                dir="auto"
              >
                شروع رایگان · بدون نیاز به کارت بانکی
              </p>
            </div>
          </div>
        </div>
        <div
          className="bg-[var(--background)] content-stretch flex flex-col gap-[32px] items-start overflow-clip pb-[32px] pt-[48px] px-[40px] relative shrink-0 w-full"
        >
          <div
            className="content-stretch flex gap-[40px] items-start overflow-clip relative shrink-0 w-full"
          >
            <TabletHabitreeFooterMenu className="content-stretch flex flex-col gap-[8px] items-end overflow-clip relative shrink-0 size-[184px]" />
            <div
              className="content-stretch flex flex-col gap-[8px] items-end overflow-clip relative shrink-0 size-[184px]"
            >
              <p
                className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[15px] text-right w-full"
                dir="auto"
              >
                کشف Habitree
              </p>
              <div
                className="content-stretch flex h-[44px] items-center justify-end min-h-[44px] overflow-clip relative shrink-0 w-full"
              >
                <p
                  className="[word-break:break-word] flex-[1_0_0] font-sans font-normal leading-[1.9] min-w-px relative text-[var(--muted)] text-[14px] text-right"
                  dir="auto"
                >
                  امکانات
                </p>
              </div>
              <div
                className="content-stretch flex h-[44px] items-center justify-end min-h-[44px] overflow-clip relative shrink-0 w-full"
              >
                <p
                  className="[word-break:break-word] flex-[1_0_0] font-sans font-normal leading-[1.9] min-w-px relative text-[var(--muted)] text-[14px] text-right"
                  dir="auto"
                >
                  چطور کار می‌کند؟
                </p>
              </div>
              <div
                className="content-stretch flex h-[44px] items-center justify-end min-h-[44px] overflow-clip relative shrink-0 w-full"
              >
                <p
                  className="[word-break:break-word] flex-[1_0_0] font-sans font-normal leading-[1.9] min-w-px relative text-[var(--muted)] text-[14px] text-right"
                  dir="auto"
                >
                  درباره ما
                </p>
              </div>
            </div>
            <div
              className="content-stretch flex flex-col gap-[16px] items-end overflow-clip relative shrink-0 w-[240px]"
            >
              <div
                className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0"
              >
                <p
                  className="[word-break:break-word] font-sans font-extrabold leading-[normal] relative shrink-0 text-[var(--brand)] text-[26px] whitespace-nowrap"
                >
                  habitree
                </p>
                <div
                  className="relative shrink-0 size-[40px]"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={TabletimgBrandMark}
                  />
                </div>
              </div>
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[14px] text-right w-[min-content]"
                dir="auto"
              >
                همراه کوچک تو برای عادت‌های ماندگار و روزهای سبزتر.
              </p>
            </div>
          </div>
          <div
            className="bg-[var(--surface-soft)] h-px relative shrink-0 w-full"
          />
          <div
            className="[word-break:break-word] content-stretch flex font-sans font-normal gap-[16px] items-center justify-end leading-[1.9] overflow-clip relative shrink-0 text-[var(--muted)] text-[12px] text-right w-full"
          >
            <p
              className="relative shrink-0 whitespace-nowrap"
              dir="auto"
            >{`همراه همیشگیت `}</p>
            <p
              className="flex-[1_0_0] min-w-px relative"
              dir="auto"
            >
              © Habitree · با حوصله، برای رشد تو
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}



/* ==================== Mobile layout ==================== */

const MobileassetPathPrefix = "/assets/mobile"
const MobileimgCheck = `${MobileassetPathPrefix}/c27b0.svg`
const MobileimgPlus = `${MobileassetPathPrefix}/bede8.svg`
const MobileimgArrowLeft = `${MobileassetPathPrefix}/4ca6d.svg`
const MobileimgHeart = `${MobileassetPathPrefix}/a0ee1.svg`
const MobileimgSprout = `${MobileassetPathPrefix}/4f884.svg`
const MobileimgSparkles = `${MobileassetPathPrefix}/e3e30.svg`
const MobileimgSprout1 = `${MobileassetPathPrefix}/66ddf.svg`
const MobileimgFlame = `${MobileassetPathPrefix}/7887f.svg`
const MobileimgCircleCheck = `${MobileassetPathPrefix}/7d63a.svg`
const MobileimgUsers = `${MobileassetPathPrefix}/4476a.svg`
const MobileimgChartNoAxesColumnIncreasing = `${MobileassetPathPrefix}/6624a.svg`
const MobileimgSprout2 = `${MobileassetPathPrefix}/73806.svg`
const MobileimgCheck1 = `${MobileassetPathPrefix}/0b857.svg`
const MobileimgGardenBackdrop = `${MobileassetPathPrefix}/9c90f.svg`
const MobileimgOrbit = `${MobileassetPathPrefix}/6ce3c.svg`
const MobileimgIllustrationBotanicalGrowth = `${MobileassetPathPrefix}/da7e0.svg`
const MobileimgIllustrationBotanicalGrowth1 = `${MobileassetPathPrefix}/e3989.svg`
const MobileimgIllustrationBotanicalGrowth2 = `${MobileassetPathPrefix}/19d1b.svg`
const MobileimgFloatingSeed = `${MobileassetPathPrefix}/0f0f3.svg`
const MobileimgFloatingSeed1 = `${MobileassetPathPrefix}/323c0.svg`
const MobileimgIllustrationBotanicalGrowth3 = `${MobileassetPathPrefix}/833eb.svg`
const MobileimgIllustrationBotanicalGrowth4 = `${MobileassetPathPrefix}/c7c9e.svg`
const MobileimgIllustrationBotanicalGrowth5 = `${MobileassetPathPrefix}/830ca.svg`
const MobileimgIllustrationBotanicalGrowth6 = `${MobileassetPathPrefix}/b13af.svg`
const MobileimgIllustrationBotanicalGrowth7 = `${MobileassetPathPrefix}/03c00.svg`
const MobileimgSprout3 = `${MobileassetPathPrefix}/4a8e7.svg`
const MobileimgIllustrationBotanicalGrowth8 = `${MobileassetPathPrefix}/99518.svg`
const MobileimgIllustrationBotanicalGrowth9 = `${MobileassetPathPrefix}/df593.svg`
const MobileimgIllustrationBotanicalGrowth10 = `${MobileassetPathPrefix}/47e44.svg`
const MobileimgIllustrationBotanicalGrowth11 = `${MobileassetPathPrefix}/99877.svg`
const MobileimgHeart1 = `${MobileassetPathPrefix}/e6329.svg`
const MobileimgIllustrationBotanicalGrowth12 = `${MobileassetPathPrefix}/e7967.svg`
const MobileimgBrandMark = `${MobileassetPathPrefix}/091f8.svg`

type MobileHabitreeButtonProps = {
  className?: string
  context?: "Core"
  label?: string
  variant?: "Kind Login · Viewport Desktop" | "Kind Completed · Viewport Desktop" | "Kind Log habit · Viewport Desktop" | "Kind Add habit · Viewport Desktop" | "Kind Footer link · Viewport Desktop" | "Kind Section link · Viewport Tablet" | "Kind Signup · Viewport Mobile" | "Kind Primary · Viewport Mobile" | "Kind Secondary · Viewport Mobile"
}

function MobileHabitreeButton({
  className,
  context = "Core",
  label = "ثبت‌نام",
  variant = "Kind Login · Viewport Desktop",
}: MobileHabitreeButtonProps) {
  const isCoreAndKindAddHabitViewportDesktop =
    context === "Core" && variant === "Kind Add habit · Viewport Desktop"
  const isCoreAndKindCompletedViewportDesktop =
    context === "Core" && variant === "Kind Completed · Viewport Desktop"
  const isCoreAndKindFooterLinkViewportDesktop =
    context === "Core" && variant === "Kind Footer link · Viewport Desktop"
  const isCoreAndKindLogHabitViewportDesktop =
    context === "Core" && variant === "Kind Log habit · Viewport Desktop"
  const isCoreAndKindPrimaryViewportMobile =
    context === "Core" && variant === "Kind Primary · Viewport Mobile"
  const isCoreAndKindSecondaryViewportMobile =
    context === "Core" && variant === "Kind Secondary · Viewport Mobile"
  const isCoreAndKindSectionLinkViewportTablet =
    context === "Core" && variant === "Kind Section link · Viewport Tablet"
  const isCoreAndKindSignupViewportMobile =
    context === "Core" && variant === "Kind Signup · Viewport Mobile"
  return (
    <div
      className={
        className ||
        `content-stretch flex items-center overflow-clip relative ${
          isCoreAndKindSecondaryViewportMobile
            ? "bg-[var(--background)] border border-[var(--surface-soft)] border-solid h-[48px] justify-center min-h-[48px] px-[24px] py-[8px] rounded-[12px] w-[1440px]"
            : isCoreAndKindPrimaryViewportMobile
              ? "bg-[var(--brand)] gap-[8px] h-[48px] justify-center min-h-[48px] px-[24px] py-[8px] rounded-[12px] w-[1440px]"
              : isCoreAndKindSignupViewportMobile
                ? "bg-[var(--brand)] min-h-[48px] px-[16px] rounded-[12px]"
                : isCoreAndKindSectionLinkViewportTablet
                  ? "min-h-[44px]"
                  : isCoreAndKindFooterLinkViewportDesktop
                    ? "h-[48px] justify-end min-h-[44px] w-[1440px]"
                    : isCoreAndKindAddHabitViewportDesktop
                      ? "bg-[var(--surface-soft)] gap-[8px] h-[48px] justify-center min-h-[48px] rounded-[12px] w-[1440px]"
                      : isCoreAndKindLogHabitViewportDesktop
                        ? "bg-[var(--background)] border border-[var(--surface-soft)] border-solid justify-center rounded-[14px] size-[44px]"
                        : isCoreAndKindCompletedViewportDesktop
                          ? "bg-[var(--brand)] border border-[var(--brand)] border-solid justify-center rounded-[14px] size-[44px]"
                          : "min-h-[48px] px-[8px]"
        }`
      }
      id={
        isCoreAndKindSecondaryViewportMobile
          ? "node-44_15094"
          : isCoreAndKindPrimaryViewportMobile
            ? "node-44_15087"
            : isCoreAndKindSignupViewportMobile
              ? "node-44_15064"
              : isCoreAndKindSectionLinkViewportTablet
                ? "node-44_14991"
                : isCoreAndKindFooterLinkViewportDesktop
                  ? "node-44_14966"
                  : isCoreAndKindAddHabitViewportDesktop
                    ? "node-44_14955"
                    : isCoreAndKindLogHabitViewportDesktop
                      ? "node-44_14944"
                      : isCoreAndKindCompletedViewportDesktop
                        ? "node-44_14934"
                        : "node-44_14914"
      }
    >
      {context === "Core" && variant === "Kind Login · Viewport Desktop" && (
        <p
          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[14px] text-right whitespace-nowrap"
          dir="auto"
        >
          {label}
        </p>
      )}
      {isCoreAndKindCompletedViewportDesktop && (
        <div
          className="relative shrink-0 size-[18px]"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={MobileimgCheck}
          />
        </div>
      )}
      {isCoreAndKindLogHabitViewportDesktop && (
        <div
          className="relative shrink-0 size-[18px]"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={MobileimgPlus}
          />
        </div>
      )}
      {isCoreAndKindAddHabitViewportDesktop && (
        <>
          <p
            className="[word-break:break-word] font-sans font-semibold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[14px] text-right whitespace-nowrap"
            dir="auto"
          >
            {label}
          </p>
          <div
            className="relative shrink-0 size-[18px]"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={MobileimgPlus}
            />
          </div>
        </>
      )}
      {isCoreAndKindFooterLinkViewportDesktop && (
        <p
          className="[word-break:break-word] flex-[1_0_0] font-sans font-normal leading-[1.9] min-w-px relative text-[var(--muted)] text-[14px] text-right"
          dir="auto"
        >
          {label}
        </p>
      )}
      {isCoreAndKindSectionLinkViewportTablet && (
        <p
          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[13px] text-right whitespace-nowrap"
          dir="auto"
        >
          {label}
        </p>
      )}
      {isCoreAndKindSignupViewportMobile && (
        <p
          className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[14px] text-right text-white whitespace-nowrap"
          dir="auto"
        >
          {label}
        </p>
      )}
      {isCoreAndKindPrimaryViewportMobile && (
        <>
          <div
            className="relative shrink-0 size-[18px]"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={MobileimgArrowLeft}
            />
          </div>
          <p
            className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[15px] text-right text-white whitespace-nowrap"
            dir="auto"
          >
            {label}
          </p>
        </>
      )}
      {isCoreAndKindSecondaryViewportMobile && (
        <p
          className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[15px] text-right whitespace-nowrap"
          dir="auto"
        >
          {label}
        </p>
      )}
    </div>
  )
}

type MobileHabitreeFooterMenuProps = {
  className?: string
  layout?: "Mobile 1"
  menuHeading1?: string
}

function MobileHabitreeFooterMenu({
  className,
  layout = "Mobile 1",
  menuHeading1 = "همراهت هستیم",
}: MobileHabitreeFooterMenuProps) {
  return (
    <div
      className={
        className ||
        "content-stretch flex flex-col gap-[8px] h-[184px] items-end overflow-clip relative w-[159px]"
      }
    >
      <p
        className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[15px] text-right w-full"
        dir="auto"
      >
        {menuHeading1}
      </p>
      <MobileHabitreeButton
        className="content-stretch flex h-[44px] items-center justify-end min-h-[44px] overflow-clip relative shrink-0 w-full"
        label="ارتباط با ما"
        variant="Kind Footer link · Viewport Desktop"
      />
      <MobileHabitreeButton
        className="content-stretch flex h-[44px] items-center justify-end min-h-[44px] overflow-clip relative shrink-0 w-full"
        label="حریم خصوصی"
        variant="Kind Footer link · Viewport Desktop"
      />
      <MobileHabitreeButton
        className="content-stretch flex h-[44px] items-center justify-end min-h-[44px] overflow-clip relative shrink-0 w-full"
        label="شرایط استفاده"
        variant="Kind Footer link · Viewport Desktop"
      />
    </div>
  )
}

type MobileHabitreeBadgeProps = {
  className?: string
  kind?: "Daily care" | "Streak celebration" | "Small beginnings" | "Step" | "Demo"
  text1?: string
  text2?: string
  viewport?: "Desktop" | "Mobile"
}

function MobileHabitreeBadge({
  className,
  kind = "Daily care",
  text1 = "با هر روز تو، سبزتر",
  text2 = "رشدهای کوچک هم دیده می‌شوند.",
  viewport = "Desktop",
}: MobileHabitreeBadgeProps) {
  const isDemoAndDesktop = kind === "Demo" && viewport === "Desktop"
  const isSmallBeginningsAndDesktop =
    kind === "Small beginnings" && viewport === "Desktop"
  const isStepAndDesktop = kind === "Step" && viewport === "Desktop"
  const isStreakCelebrationAndMobile =
    kind === "Streak celebration" && viewport === "Mobile"
  return (
    <div
      className={
        className ||
        `content-stretch flex overflow-clip relative ${
          isStreakCelebrationAndMobile
            ? "bg-white gap-[12px] items-center p-[16px] rounded-[16px] shadow-[0px_16px_40px_0px_var(--surface-soft)]"
            : isDemoAndDesktop
              ? "bg-[var(--surface-soft)] items-start px-[12px] py-[8px] rounded-[999px]"
              : isStepAndDesktop
                ? "bg-[var(--surface-soft)] items-center justify-center rounded-[16px] size-[48px]"
                : isSmallBeginningsAndDesktop
                  ? "bg-[var(--surface-soft)] gap-[8px] items-center px-[16px] py-[8px] rounded-[999px]"
                  : "bg-white border border-[var(--surface-soft)] border-solid gap-[8px] items-center px-[16px] py-[8px] rounded-[999px]"
        }`
      }
      id={
        isStreakCelebrationAndMobile
          ? "node-44_15269"
          : isDemoAndDesktop
            ? "node-44_15192"
            : isStepAndDesktop
              ? "node-44_15181"
              : isSmallBeginningsAndDesktop
                ? "node-44_15174"
                : "node-44_15150"
      }
    >
      {viewport === "Desktop" && ["Daily care", "Demo"].includes(kind) && (
        <p
          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[12px] text-right whitespace-nowrap"
          dir="auto"
        >
          {text1}
        </p>
      )}
      {kind === "Daily care" && viewport === "Desktop" && (
        <div
          className="relative shrink-0 size-[16px]"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={MobileimgHeart}
          />
        </div>
      )}
      {isSmallBeginningsAndDesktop && (
        <>
          <p
            className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[13px] text-right whitespace-nowrap"
            dir="auto"
          >
            {text1}
          </p>
          <div
            className="relative shrink-0 size-[16px]"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={MobileimgSprout}
            />
          </div>
        </>
      )}
      {isStepAndDesktop && (
        <p
          className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[16px] text-right whitespace-nowrap"
          dir="auto"
        >
          {text1}
        </p>
      )}
      {isStreakCelebrationAndMobile && (
        <>
          <div
            className="[word-break:break-word] content-stretch flex flex-col items-start leading-[1.9] overflow-clip relative shrink-0 text-right whitespace-nowrap"
          >
            <p
              className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[13px]"
              dir="auto"
            >
              {text1}
            </p>
            <p
              className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[12px]"
              dir="auto"
            >
              {text2}
            </p>
          </div>
          <div
            className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[14px] shrink-0 size-[40px]"
          >
            <div
              className="relative shrink-0 size-[22px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={MobileimgSparkles}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

type MobileHabitreeCardProps = {
  className?: string
  kind?: "باغچه مجازی تو" | "استمرار، نه کمال" | "پیگیری عادت‌ها" | "چالش گروهی" | "گزارش‌های روشن"
  text1?: string
  text2?: string
  text3?: string
  viewport?: "Desktop"
}

function MobileHabitreeCard({
  className,
  kind = "باغچه مجازی تو",
  text1 = "باغچه مجازی تو",
  text2 = "برای هر عادت یک گیاه پرورش بده؛ باغچه‌ات داستان رشد تو را می‌گوید.",
  text3 = "هر عادت، یک گیاه تازه",
  viewport = "Desktop",
}: MobileHabitreeCardProps) {
  const isAndDesktop = kind === "استمرار، نه کمال" && viewport === "Desktop"
  const isAndDesktop1 = kind === "پیگیری عادت‌ها" && viewport === "Desktop"
  const isAndDesktop2 = kind === "چالش گروهی" && viewport === "Desktop"
  const isAndDesktop3 = kind === "گزارش‌های روشن" && viewport === "Desktop"
  return (
    <div
      className={
        className ||
        "bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-col gap-[16px] h-[267px] items-end overflow-clip p-[24px] relative rounded-[24px] shadow-[0px_8px_24px_0px_var(--surface-soft)] w-[1055.2px]"
      }
      id={
        isAndDesktop3
          ? "node-44_15388"
          : isAndDesktop2
            ? "node-44_15367"
            : isAndDesktop1
              ? "node-44_15346"
              : isAndDesktop
                ? "node-44_15325"
                : "node-44_15304"
      }
    >
      <div
        className="content-stretch flex gap-[16px] items-center justify-end overflow-clip relative shrink-0 w-full"
        id={
          isAndDesktop3
            ? "node-44_15379"
            : isAndDesktop2
              ? "node-44_15358"
              : isAndDesktop1
                ? "node-44_15337"
                : isAndDesktop
                  ? "node-44_15316"
                  : "node-44_15295"
        }
      >
        <p
          className="[word-break:break-word] flex-[1_0_0] font-sans font-bold leading-[1.9] min-w-px relative text-[var(--brand-dark)] text-[20px] text-right"
          dir="auto"
        >
          {text1}
        </p>
        <div
          className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[16px] shrink-0 size-[48px]"
          id={
            isAndDesktop3
              ? "node-44_15381"
              : isAndDesktop2
                ? "node-44_15360"
                : isAndDesktop1
                  ? "node-44_15339"
                  : isAndDesktop
                    ? "node-44_15318"
                    : "node-44_15297"
          }
        >
          {kind === "باغچه مجازی تو" && viewport === "Desktop" && (
            <div
              className="relative shrink-0 size-[24px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={MobileimgSprout1}
              />
            </div>
          )}
          {isAndDesktop && (
            <div
              className="relative shrink-0 size-[24px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={MobileimgFlame}
              />
            </div>
          )}
          {isAndDesktop1 && (
            <div
              className="relative shrink-0 size-[24px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={MobileimgCircleCheck}
              />
            </div>
          )}
          {isAndDesktop2 && (
            <div
              className="relative shrink-0 size-[24px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={MobileimgUsers}
              />
            </div>
          )}
          {isAndDesktop3 && (
            <div
              className="relative shrink-0 size-[24px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={MobileimgChartNoAxesColumnIncreasing}
              />
            </div>
          )}
        </div>
      </div>
      <p
        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[15px] text-right w-full"
        dir="auto"
      >
        {text2}
      </p>
      <div
        className="content-stretch flex gap-[8px] items-center justify-end overflow-clip pt-[8px] relative shrink-0 w-full"
        id={
          isAndDesktop3
            ? "node-44_15385"
            : isAndDesktop2
              ? "node-44_15364"
              : isAndDesktop1
                ? "node-44_15343"
                : isAndDesktop
                  ? "node-44_15322"
                  : "node-44_15301"
        }
      >
        <p
          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--brand)] text-[13px] text-right whitespace-nowrap"
          dir="auto"
        >
          {text3}
        </p>
        <div
          className="bg-[var(--surface-soft)] h-[3px] relative rounded-[4px] shrink-0 w-[16px]"
          id={
            isAndDesktop3
              ? "node-44_15387"
              : isAndDesktop2
                ? "node-44_15366"
                : isAndDesktop1
                  ? "node-44_15345"
                  : isAndDesktop
                    ? "node-44_15324"
                    : "node-44_15303"
          }
        />
      </div>
    </div>
  )
}

type MobileHabitreeNavbarProps = {
  className?: string
  kind?: "Responsive"
  viewport?: "Mobile"
}

function MobileHabitreeNavbar({
  className,
  kind = "Responsive",
  viewport = "Mobile",
}: MobileHabitreeNavbarProps) {
  return (
    <div
      className={
        className ||
        "content-stretch flex flex-col gap-[16px] items-start overflow-clip pb-[16px] pt-[24px] px-[24px] relative w-[1440px]"
      }
    >
      <div
        className="content-stretch flex flex-row-reverse items-center justify-between overflow-clip relative shrink-0 w-full"
      >
        <div
          className="content-stretch flex flex-row-reverse gap-[8px] items-center overflow-clip relative shrink-0"
        >
          <MobileHabitreeButton
            className="bg-[var(--brand)] content-stretch flex items-center min-h-[48px] overflow-clip px-[16px] relative rounded-[12px] shrink-0"
            variant="Kind Signup · Viewport Mobile"
          />
          <MobileHabitreeButton
            className="content-stretch flex items-center min-h-[48px] overflow-clip px-[8px] relative shrink-0"
            label="ورود"
          />
        </div>
        <div
          className="content-stretch flex flex-row-reverse gap-[8px] items-center overflow-clip relative shrink-0"
        >
          <p
            className="[word-break:break-word] font-sans font-extrabold leading-[normal] relative shrink-0 text-[var(--brand)] text-[22px] whitespace-nowrap"
            dir="auto"
          >
            habitree
          </p>
          <div
            className="bg-[var(--brand)] content-stretch flex items-center justify-center overflow-clip relative rounded-[14px] shrink-0 size-[42px]"
          >
            <div
              className="relative shrink-0 size-[26px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={MobileimgSprout2}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full"
      >
        <MobileHabitreeButton
          className="content-stretch flex items-center min-h-[44px] overflow-clip relative shrink-0"
          label="درباره ما"
          variant="Kind Section link · Viewport Tablet"
        />
        <MobileHabitreeButton
          className="content-stretch flex items-center min-h-[44px] overflow-clip relative shrink-0"
          label="باغچه من"
          variant="Kind Section link · Viewport Tablet"
        />
        <MobileHabitreeButton
          className="content-stretch flex items-center min-h-[44px] overflow-clip relative shrink-0"
          label="روش کار"
          variant="Kind Section link · Viewport Tablet"
        />
        <MobileHabitreeButton
          className="content-stretch flex items-center min-h-[44px] overflow-clip relative shrink-0"
          label="امکانات"
          variant="Kind Section link · Viewport Tablet"
        />
      </div>
      <div
        className="bg-[var(--surface-soft)] h-px relative shrink-0 w-full"
      />
    </div>
  )
}

function MobileHabitreePage() {
  return (
    <div
      className="bg-[var(--background)] content-stretch flex flex-col items-start relative min-h-[100dvh] w-full"
    
      dir="rtl">
      <div
        className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      >
        <MobileHabitreeNavbar className="content-stretch flex flex-col gap-[16px] items-start overflow-clip pb-[16px] pt-[24px] px-[24px] relative shrink-0 w-full" />
        <div
          className="content-stretch flex flex-col gap-[32px] items-center pb-[48px] pt-[32px] px-[24px] relative shrink-0 w-full"
        >
          <div
            className="content-stretch flex flex-col gap-[24px] items-end overflow-clip relative shrink-0 w-full"
          >
            <MobileHabitreeBadge
              className="bg-[var(--surface-soft)] content-stretch flex flex-row-reverse gap-[8px] items-center overflow-clip px-[16px] py-[8px] relative rounded-[999px] shrink-0"
              kind="Small beginnings"
              text1="هر روز، یک برگ تازه"
            />
            <div
              className="[word-break:break-word] font-sans font-extrabold leading-[0] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[36px] text-right w-[min-content]"
            >
              <p className="leading-[1.55] mb-0" dir="auto">
                عادت‌های کوچک،
              </p>
              <p className="leading-[1.55]" dir="auto">
                زندگی بزرگ‌تر
              </p>
            </div>
            <p
              className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[16px] text-right w-[min-content]"
              dir="auto"
            >
              با Habitree عادت‌های خوبت را بساز و هر روز به آن‌ها رسیدگی کن. هر
              بار که ادامه می‌دهی، گیاهی در باغچه‌ات جان می‌گیرد.
            </p>
            <div
              className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-full"
            >
              <MobileHabitreeButton
                className="bg-[var(--brand)] content-stretch flex gap-[8px] h-[48px] items-center justify-center min-h-[48px] overflow-clip px-[24px] py-[8px] relative rounded-[12px] shrink-0 w-full"
                label="رایگان شروع کن"
                variant="Kind Primary · Viewport Mobile"
              />
              <MobileHabitreeButton
                className="bg-[var(--background)] border border-[var(--surface-soft)] border-solid content-stretch flex h-[48px] items-center justify-center min-h-[48px] overflow-clip px-[24px] py-[8px] relative rounded-[12px] shrink-0 w-full"
                label="ببین چطور کار می‌کند"
                variant="Kind Secondary · Viewport Mobile"
              />
            </div>
            <div
              className="content-stretch flex flex-row-reverse gap-[8px] items-center justify-end overflow-clip relative shrink-0 w-full"
            >
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[13px] text-right whitespace-nowrap"
                dir="auto"
              >
                شروع رایگان · بدون نیاز به کارت بانکی
              </p>
              <div
                className="relative shrink-0 size-[16px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={MobileimgCheck1}
                />
              </div>
            </div>
          </div>
          <div
            className="h-[336px] relative shrink-0 w-[342px]"
          >
            <div
              className="absolute h-[280px] left-[15px] top-[32px] w-[310px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={MobileimgGardenBackdrop}
              />
            </div>
            <div
              className="absolute h-[290px] left-[20px] top-[16px] w-[302px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={MobileimgOrbit}
              />
            </div>
            <div
              className="absolute h-[276px] left-[24px] overflow-clip top-[24px] w-[312px]"
            >
              <div
                className="absolute left-0 overflow-clip size-[150px] top-[98px]"
              >
                <div
                  className="absolute left-0 size-[150px] top-0"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={MobileimgIllustrationBotanicalGrowth}
                  />
                </div>
              </div>
              <div
                className="absolute left-[80px] overflow-clip size-[224px] top-0"
              >
                <div
                  className="absolute left-0 size-[224px] top-0"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={MobileimgIllustrationBotanicalGrowth1}
                  />
                </div>
              </div>
              <div
                className="absolute left-[169px] overflow-clip size-[112px] top-[145px]"
              >
                <div
                  className="absolute left-0 size-[112px] top-0"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={MobileimgIllustrationBotanicalGrowth2}
                  />
                </div>
              </div>
            </div>
            <div
              className="absolute left-[312px] size-[7px] top-[212px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={MobileimgFloatingSeed}
              />
            </div>
            <div
              className="absolute left-[24px] size-[9px] top-[128px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={MobileimgFloatingSeed1}
              />
            </div>
            <MobileHabitreeBadge className="absolute bg-white border border-[var(--surface-soft)] border-solid content-stretch flex gap-[8px] items-center left-[208px] overflow-clip px-[16px] py-[8px] rounded-[999px] top-[36px]" />
            <MobileHabitreeBadge
              className="absolute bg-white content-stretch flex gap-[12px] items-center left-[8px] overflow-clip p-[16px] rounded-[16px] shadow-[0px_16px_40px_0px_var(--surface-soft)] top-[235px]"
              kind="Streak celebration"
              text1="۷ روز استمرار، یک برگ تازه!"
              viewport="Mobile"
            />
          </div>
        </div>
        <div
          className="bg-[var(--surface-warm)] content-stretch flex items-center justify-center overflow-clip p-[24px] relative shrink-0 w-full"
        >
          <p
            className="[word-break:break-word] flex-[1_0_0] font-sans font-normal leading-[1.9] min-w-px relative text-[var(--muted)] text-[13px] text-center"
            dir="auto"
          >
            قرار نیست یک‌شبه تغییر کنی؛ فقط امروز، یک قدم کوچک بردار.
          </p>
        </div>
      </div>
      <div
        className="content-stretch flex flex-col gap-[40px] items-start overflow-clip px-[24px] py-[56px] relative shrink-0 w-full"
      >
        <div
          className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-center overflow-clip relative shrink-0 text-center w-full"
        >
          <p
            className="font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[13px] w-full"
            dir="auto"
          >
            ابزارهای ساده برای روزهای بهتر
          </p>
          <p
            className="font-sans font-extrabold leading-[1.6] relative shrink-0 text-[var(--brand-dark)] text-[26px] w-full"
            dir="auto"
          >
            همه‌چیز برای ادامه دادن
          </p>
          <p
            className="font-sans font-normal leading-[1.9] max-w-[640px] relative shrink-0 text-[var(--muted)] text-[14px] w-full"
            dir="auto"
          >
            کمتر درگیر برنامه‌ریزی شو، بیشتر روی رشد خودت تمرکز کن.
          </p>
        </div>
        <div
          className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full"
        >
          <div
            className="content-stretch flex items-start relative shrink-0 w-full"
          >
            <MobileHabitreeCard
              className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip p-[24px] relative rounded-[24px] self-stretch shadow-[0px_8px_24px_0px_var(--surface-soft)]"
              kind="پیگیری عادت‌ها"
              text1="پیگیری عادت‌ها"
              text2="عادتت را با هدفی شدنی بساز؛ از یک لیوان آب بیشتر تا چند صفحه کتاب."
              text3="هدف‌های کوچک، تیک‌های بزرگ"
            />
          </div>
          <div
            className="content-stretch flex items-start relative shrink-0 w-full"
          >
            <MobileHabitreeCard
              className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip p-[24px] relative rounded-[24px] self-stretch shadow-[0px_8px_24px_0px_var(--surface-soft)]"
              kind="استمرار، نه کمال"
              text1="استمرار، نه کمال"
              text2="زنجیره روزهای پیوسته‌ات را ببین و برای قدم بعدی انگیزه بگیر."
              text3="Streak · هر روز یک قدم"
            />
          </div>
          <div
            className="content-stretch flex items-start relative shrink-0 w-full"
          >
            <MobileHabitreeCard className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip p-[24px] relative rounded-[24px] self-stretch shadow-[0px_8px_24px_0px_var(--surface-soft)]" />
          </div>
          <div
            className="content-stretch flex items-start relative shrink-0 w-full"
          >
            <MobileHabitreeCard
              className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip p-[24px] relative rounded-[24px] self-stretch shadow-[0px_8px_24px_0px_var(--surface-soft)]"
              kind="گزارش‌های روشن"
              text1="گزارش‌های روشن"
              text2="با مرور پیشرفت هفتگی و ماهانه، ریتم مناسب خودت را پیدا کن."
              text3="پیشرفتت را بهتر بشناس"
            />
          </div>
          <div
            className="content-stretch flex items-start relative shrink-0 w-full"
          >
            <MobileHabitreeCard
              className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip p-[24px] relative rounded-[24px] self-stretch shadow-[0px_8px_24px_0px_var(--surface-soft)]"
              kind="چالش گروهی"
              text1="چالش گروهی"
              text2="کنار دوستانت یک چالش بساز؛ به هم دلگرمی بدهید و با هم ادامه دهید."
              text3="با هم ریشه می‌گیریم"
            />
          </div>
        </div>
      </div>
      <div
        className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
      >
        <div
          className="content-stretch flex flex-col gap-[40px] items-start overflow-clip pb-[80px] pt-[24px] px-[24px] relative shrink-0 w-full"
        >
          <div
            className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-center overflow-clip relative shrink-0 text-center w-full"
          >
            <p
              className="font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[13px] w-full"
              dir="auto"
            >
              از تصمیم تا ریشه
            </p>
            <p
              className="font-sans font-extrabold leading-[1.6] relative shrink-0 text-[var(--brand-dark)] text-[26px] w-full"
              dir="auto"
            >
              چطور کار می‌کند؟
            </p>
            <p
              className="font-sans font-normal leading-[1.9] max-w-[640px] relative shrink-0 text-[var(--muted)] text-[14px] w-full"
              dir="auto"
            >
              چهار قدم ساده؛ نه برای بی‌نقص بودن، برای هر روز کمی بهتر شدن.
            </p>
          </div>
          <div
            className="content-stretch flex flex-col gap-[32px] items-start overflow-clip relative shrink-0 w-full"
          >
            <div
              className="content-stretch flex items-start overflow-clip relative shrink-0 w-full"
            >
              <div
                className="content-stretch flex flex-[1_0_0] gap-[16px] items-start min-w-px overflow-clip relative"
              >
                <div
                  className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[1.9] min-w-px overflow-clip relative text-right"
                >
                  <p
                    className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[19px] w-full"
                    dir="auto"
                  >
                    ساخت عادت
                  </p>
                  <p
                    className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[14px] w-full"
                    dir="auto"
                  >
                    یک هدف کوچک و یک گیاه برایش انتخاب کن.
                  </p>
                </div>
                <MobileHabitreeBadge
                  className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[16px] shrink-0 size-[48px]"
                  kind="Step"
                  text1="۰۱"
                />
              </div>
            </div>
            <div
              className="content-stretch flex items-start overflow-clip relative shrink-0 w-full"
            >
              <div
                className="content-stretch flex flex-[1_0_0] gap-[16px] items-start min-w-px overflow-clip relative"
              >
                <div
                  className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[1.9] min-w-px overflow-clip relative text-right"
                >
                  <p
                    className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[19px] w-full"
                    dir="auto"
                  >
                    ثبت روزانه
                  </p>
                  <p
                    className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[14px] w-full"
                    dir="auto"
                  >
                    هر بار انجامش دادی، با یک تیک ثبتش کن.
                  </p>
                </div>
                <MobileHabitreeBadge
                  className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[16px] shrink-0 size-[48px]"
                  kind="Step"
                  text1="۰۲"
                />
              </div>
            </div>
            <div
              className="content-stretch flex items-start overflow-clip relative shrink-0 w-full"
            >
              <div
                className="content-stretch flex flex-[1_0_0] gap-[16px] items-start min-w-px overflow-clip relative"
              >
                <div
                  className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[1.9] min-w-px overflow-clip relative text-right"
                >
                  <p
                    className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[19px] w-full"
                    dir="auto"
                  >
                    حفظ استمرار
                  </p>
                  <p
                    className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[14px] w-full"
                    dir="auto"
                  >
                    روزهای پیوسته را بساز؛ با ریتم خودت جلو برو.
                  </p>
                </div>
                <MobileHabitreeBadge
                  className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[16px] shrink-0 size-[48px]"
                  kind="Step"
                  text1="۰۳"
                />
              </div>
            </div>
            <div
              className="content-stretch flex items-start overflow-clip relative shrink-0 w-full"
            >
              <div
                className="content-stretch flex flex-[1_0_0] gap-[16px] items-start min-w-px overflow-clip relative"
              >
                <div
                  className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[1.9] min-w-px overflow-clip relative text-right"
                >
                  <p
                    className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[19px] w-full"
                    dir="auto"
                  >
                    رشد گیاه
                  </p>
                  <p
                    className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[14px] w-full"
                    dir="auto"
                  >
                    با هر ثبت، جان گرفتن گیاهت را تماشا کن.
                  </p>
                </div>
                <MobileHabitreeBadge
                  className="bg-[var(--surface-soft)] content-stretch flex items-center justify-center overflow-clip relative rounded-[16px] shrink-0 size-[48px]"
                  kind="Step"
                  text1="۰۴"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-[var(--surface-soft)] content-stretch flex flex-col gap-[40px] items-start overflow-clip px-[24px] py-[56px] relative shrink-0 w-full"
        >
          <div
            className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-center overflow-clip relative shrink-0 text-center w-full"
          >
            <p
              className="font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[13px] w-full"
              dir="auto"
            >
              رشد تو، دیدنی می‌شود
            </p>
            <p
              className="font-sans font-extrabold leading-[1.6] relative shrink-0 text-[var(--brand-dark)] text-[26px] w-full"
              dir="auto"
            >
              از یک دانه تا یک حالِ خوب
            </p>
            <p
              className="font-sans font-normal leading-[1.9] max-w-[640px] relative shrink-0 text-[var(--muted)] text-[14px] w-full"
              dir="auto"
            >
              هر ثبت کوچک، فرصتی برای رشد است. گیاهت پا‌به‌پای تو قد می‌کشد.
            </p>
          </div>
          <div
            className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-full"
          >
            <div
              className="bg-white content-stretch flex gap-[16px] items-center overflow-clip p-[16px] relative rounded-[24px] shrink-0 w-full"
            >
              <div
                className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[1.9] min-w-px overflow-clip relative text-right"
              >
                <p
                  className="font-sans font-normal relative shrink-0 text-[var(--brand)] text-[12px] w-full"
                  dir="auto"
                >
                  اولین ثبت
                </p>
                <p
                  className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[18px] w-full"
                  dir="auto"
                >
                  دانه امید
                </p>
                <p
                  className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[12px] w-full"
                  dir="auto"
                >
                  هر شروعی، یک امکان تازه است.
                </p>
              </div>
              <div
                className="relative shrink-0 size-[112px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={MobileimgIllustrationBotanicalGrowth3}
                />
              </div>
            </div>
            <div
              className="bg-white content-stretch flex gap-[16px] items-center overflow-clip p-[16px] relative rounded-[24px] shrink-0 w-full"
            >
              <div
                className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[1.9] min-w-px overflow-clip relative text-right"
              >
                <p
                  className="font-sans font-normal relative shrink-0 text-[var(--brand)] text-[12px] w-full"
                  dir="auto"
                >
                  ۳ ثبت
                </p>
                <p
                  className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[18px] w-full"
                  dir="auto"
                >
                  جوانه کوچک
                </p>
                <p
                  className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[12px] w-full"
                  dir="auto"
                >
                  قدم‌های کوچک دارند ریشه می‌گیرند.
                </p>
              </div>
              <div
                className="relative shrink-0 size-[112px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={MobileimgIllustrationBotanicalGrowth4}
                />
              </div>
            </div>
            <div
              className="bg-white content-stretch flex gap-[16px] items-center overflow-clip p-[16px] relative rounded-[24px] shrink-0 w-full"
            >
              <div
                className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[1.9] min-w-px overflow-clip relative text-right"
              >
                <p
                  className="font-sans font-normal relative shrink-0 text-[var(--brand)] text-[12px] w-full"
                  dir="auto"
                >
                  ۷ ثبت
                </p>
                <p
                  className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[18px] w-full"
                  dir="auto"
                >
                  برگ‌های تازه
                </p>
                <p
                  className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[12px] w-full"
                  dir="auto"
                >
                  ادامه دادن، کم‌کم دیده می‌شود.
                </p>
              </div>
              <div
                className="relative shrink-0 size-[112px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={MobileimgIllustrationBotanicalGrowth5}
                />
              </div>
            </div>
            <div
              className="bg-white content-stretch flex gap-[16px] items-center overflow-clip p-[16px] relative rounded-[24px] shrink-0 w-full"
            >
              <div
                className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[1.9] min-w-px overflow-clip relative text-right"
              >
                <p
                  className="font-sans font-normal relative shrink-0 text-[var(--brand)] text-[12px] w-full"
                  dir="auto"
                >
                  ۱۴ ثبت
                </p>
                <p
                  className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[18px] w-full"
                  dir="auto"
                >
                  گیاه بالنده
                </p>
                <p
                  className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[12px] w-full"
                  dir="auto"
                >
                  یک ریتم تازه در زندگی تو.
                </p>
              </div>
              <div
                className="relative shrink-0 size-[112px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={MobileimgIllustrationBotanicalGrowth6}
                />
              </div>
            </div>
            <div
              className="bg-white content-stretch flex gap-[16px] items-center overflow-clip p-[16px] relative rounded-[24px] shrink-0 w-full"
            >
              <div
                className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[1.9] min-w-px overflow-clip relative text-right"
              >
                <p
                  className="font-sans font-normal relative shrink-0 text-[var(--brand)] text-[12px] w-full"
                  dir="auto"
                >
                  ۲۱ ثبت
                </p>
                <p
                  className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[18px] w-full"
                  dir="auto"
                >
                  گیاه شکوفا
                </p>
                <p
                  className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[12px] w-full"
                  dir="auto"
                >
                  یک عادت، یک داستان سبز.
                </p>
              </div>
              <div
                className="relative shrink-0 size-[112px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={MobileimgIllustrationBotanicalGrowth7}
                />
              </div>
            </div>
          </div>
          <p
            className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[12px] text-center w-full"
            dir="auto"
          >
            نمایش نمادین رشد گیاه؛ این مراحل نشان‌دهنده تعداد ثبت‌ها هستند، نه
            زمان قطعی ساخت یک عادت.
          </p>
        </div>
      </div>
      <div
        className="content-stretch flex flex-col gap-[40px] items-start px-[24px] py-[56px] relative shrink-0 w-full"
      >
        <div
          className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-center overflow-clip relative shrink-0 text-center w-full"
        >
          <p
            className="font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[13px] w-full"
            dir="auto"
          >
            یک نگاه به Habitree
          </p>
          <p
            className="font-sans font-extrabold leading-[1.6] relative shrink-0 text-[var(--brand-dark)] text-[26px] w-full"
            dir="auto"
          >
            جایی برای دیدن رشدت
          </p>
          <p
            className="font-sans font-normal leading-[1.9] max-w-[640px] relative shrink-0 text-[var(--muted)] text-[14px] w-full"
            dir="auto"
          >
            عادت‌ها، استمرار و باغچه‌ات؛ همه در یک فضای آرام و روشن، کنار هم.
          </p>
        </div>
        <div
          className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[32px] shadow-[0px_16px_40px_0px_var(--surface-soft)] shrink-0 w-full"
        >
          <div
            className="border-[var(--surface-soft)] border-b border-solid content-stretch flex flex-row-reverse items-center justify-between overflow-clip p-[16px] relative shrink-0 w-full"
          >
            <MobileHabitreeBadge
              className="bg-[var(--surface-soft)] content-stretch flex items-start overflow-clip px-[12px] py-[8px] relative rounded-[999px] shrink-0"
              kind="Demo"
              text1="پیش‌نمایش مفهومی"
            />
            <div
              className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0"
            >
              <p
                className="[word-break:break-word] font-sans font-extrabold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[15px] text-right whitespace-nowrap"
                dir="auto"
              >
                باغچه سارا
              </p>
              <div
                className="relative shrink-0 size-[22px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={MobileimgSprout3}
                />
              </div>
            </div>
          </div>
          <div
            className="content-stretch flex flex-row-reverse items-start justify-between overflow-clip px-[16px] py-[8px] relative shrink-0 w-full"
          >
            <div
              className="content-stretch flex items-center min-h-[44px] overflow-clip relative shrink-0"
            >
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[12px] text-right whitespace-nowrap"
                dir="auto"
              >
                چالش‌ها
              </p>
            </div>
            <div
              className="content-stretch flex items-center min-h-[44px] overflow-clip relative shrink-0"
            >
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[12px] text-right whitespace-nowrap"
                dir="auto"
              >
                گزارش‌ها
              </p>
            </div>
            <div
              className="content-stretch flex items-center min-h-[44px] overflow-clip relative shrink-0"
            >
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[12px] text-right whitespace-nowrap"
                dir="auto"
              >
                باغچه
              </p>
            </div>
            <div
              className="content-stretch flex items-center min-h-[44px] overflow-clip relative shrink-0"
            >
              <p
                className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand)] text-[12px] text-right whitespace-nowrap"
                dir="auto"
              >
                امروز
              </p>
            </div>
          </div>
          <div
            className="content-stretch flex items-start overflow-clip p-[16px] relative shrink-0 w-full"
          >
            <div
              className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px overflow-clip relative"
            >
              <div
                className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[1.9] overflow-clip relative shrink-0 text-right w-full"
              >
                <p
                  className="font-sans font-extrabold relative shrink-0 text-[var(--brand-dark)] text-[23px] w-full"
                  dir="auto"
                >
                  سلام سارا، وقت رشد کردنه!
                </p>
                <p
                  className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[13px] w-full"
                  dir="auto"
                >
                  جمعه، ۱۸ آبان · امروز هم یک قدم برای خودت
                </p>
              </div>
              <div
                className="[word-break:break-word] content-stretch flex gap-[8px] items-start leading-[1.9] overflow-clip relative shrink-0 w-full"
              >
                <div
                  className="bg-[var(--background)] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-w-px overflow-clip px-[8px] py-[16px] relative rounded-[16px]"
                >
                  <p
                    className="font-sans font-extrabold relative shrink-0 text-[var(--brand-dark)] text-[25px] text-right whitespace-nowrap"
                  >
                    ۴
                  </p>
                  <p
                    className="font-sans font-normal min-w-full relative shrink-0 text-[var(--muted)] text-[12px] text-center w-[min-content]"
                    dir="auto"
                  >
                    عادت فعال
                  </p>
                </div>
                <div
                  className="bg-[var(--background)] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-w-px overflow-clip px-[8px] py-[16px] relative rounded-[16px]"
                >
                  <p
                    className="font-sans font-extrabold relative shrink-0 text-[var(--brand-dark)] text-[25px] text-right whitespace-nowrap"
                    dir="auto"
                  >
                    ۲۱ روز
                  </p>
                  <p
                    className="font-sans font-normal min-w-full relative shrink-0 text-[var(--muted)] text-[12px] text-center w-[min-content]"
                    dir="auto"
                  >
                    بیشترین استمرار
                  </p>
                </div>
                <div
                  className="bg-[var(--background)] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-w-px overflow-clip px-[8px] py-[16px] relative rounded-[16px]"
                >
                  <p
                    className="font-sans font-extrabold relative shrink-0 text-[var(--brand-dark)] text-[25px] text-right whitespace-nowrap"
                  >
                    ۵۰٪
                  </p>
                  <p
                    className="font-sans font-normal min-w-full relative shrink-0 text-[var(--muted)] text-[12px] text-center w-[min-content]"
                    dir="auto"
                  >
                    پیشرفت امروز
                  </p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col gap-[24px] items-start overflow-clip relative shrink-0 w-full"
              >
                <div
                  className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[16px] relative rounded-[24px] shrink-0 w-full"
                >
                  <div
                    className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.9] overflow-clip relative shrink-0 text-right w-full whitespace-nowrap"
                  >
                    <p
                      className="font-sans font-normal relative shrink-0 text-[var(--brand)] text-[12px]"
                      dir="auto"
                    >
                      ۲ از ۴ انجام شده
                    </p>
                    <p
                      className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[18px]"
                      dir="auto"
                    >
                      عادت‌های امروز
                    </p>
                  </div>
                  <div
                    className="bg-[var(--surface-soft)] content-stretch flex h-[6px] items-start justify-end overflow-clip relative rounded-[4px] shrink-0 w-full"
                  >
                    <div
                      className="bg-[var(--surface-soft)] flex-[1_0_0] h-[6px] min-w-px relative rounded-[4px]"
                    />
                    <div
                      className="bg-[var(--brand)] flex-[1_0_0] h-[6px] min-w-px relative rounded-[4px]"
                    />
                  </div>
                  <div
                    className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
                  >
                    <div
                      className="border-[var(--surface-soft)] border-b border-solid content-stretch flex flex-col gap-[8px] items-start overflow-clip py-[16px] relative shrink-0 w-full"
                    >
                      <div
                        className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full"
                      >
                        <MobileHabitreeButton
                          className="bg-[var(--brand)] border border-[var(--brand)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[14px] shrink-0 size-[44px]"
                          variant="Kind Completed · Viewport Desktop"
                        />
                        <div
                          className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start leading-[1.9] min-w-px overflow-clip relative text-right"
                        >
                          <p
                            className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[15px] w-full"
                            dir="auto"
                          >
                            مطالعه روزانه
                          </p>
                          <p
                            className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[12px] w-full"
                            dir="auto"
                          >
                            ۱۰ صفحه از یک کتاب
                          </p>
                        </div>
                      </div>
                      <div
                        className="[word-break:break-word] content-stretch flex font-sans font-normal items-start justify-between leading-[1.9] overflow-clip relative shrink-0 text-[12px] text-right w-full whitespace-nowrap"
                      >
                        <p
                          className="relative shrink-0 text-[var(--brand)]"
                          dir="auto"
                        >
                          ۱۰ از ۱۰ صفحه
                        </p>
                        <p
                          className="relative shrink-0 text-[var(--muted)]"
                          dir="auto"
                        >
                          ۲۱ روز استمرار · انجام شد
                        </p>
                      </div>
                    </div>
                    <div
                      className="border-[var(--surface-soft)] border-b border-solid content-stretch flex flex-col gap-[8px] items-start overflow-clip py-[16px] relative shrink-0 w-full"
                    >
                      <div
                        className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full"
                      >
                        <MobileHabitreeButton
                          className="bg-[var(--brand)] border border-[var(--brand)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[14px] shrink-0 size-[44px]"
                          variant="Kind Completed · Viewport Desktop"
                        />
                        <div
                          className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start leading-[1.9] min-w-px overflow-clip relative text-right"
                        >
                          <p
                            className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[15px] w-full"
                            dir="auto"
                          >
                            نوشیدن آب
                          </p>
                          <p
                            className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[12px] w-full"
                            dir="auto"
                          >
                            ۸ لیوان در روز
                          </p>
                        </div>
                      </div>
                      <div
                        className="[word-break:break-word] content-stretch flex font-sans font-normal items-start justify-between leading-[1.9] overflow-clip relative shrink-0 text-[12px] text-right w-full whitespace-nowrap"
                      >
                        <p
                          className="relative shrink-0 text-[var(--brand)]"
                          dir="auto"
                        >
                          ۸ از ۸ لیوان
                        </p>
                        <p
                          className="relative shrink-0 text-[var(--muted)]"
                          dir="auto"
                        >
                          ۳ روز استمرار · انجام شد
                        </p>
                      </div>
                    </div>
                    <div
                      className="border-[var(--surface-soft)] border-b border-solid content-stretch flex flex-col gap-[8px] items-start overflow-clip py-[16px] relative shrink-0 w-full"
                    >
                      <div
                        className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full"
                      >
                        <MobileHabitreeButton
                          className="bg-[var(--background)] border border-[var(--surface-soft)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[14px] shrink-0 size-[44px]"
                          variant="Kind Log habit · Viewport Desktop"
                        />
                        <div
                          className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start leading-[1.9] min-w-px overflow-clip relative text-right"
                        >
                          <p
                            className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[15px] w-full"
                            dir="auto"
                          >
                            پیاده‌روی
                          </p>
                          <p
                            className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[12px] w-full"
                            dir="auto"
                          >
                            ۲۰ دقیقه در روز
                          </p>
                        </div>
                      </div>
                      <div
                        className="[word-break:break-word] content-stretch flex font-sans font-normal items-start justify-between leading-[1.9] overflow-clip relative shrink-0 text-[var(--muted)] text-[12px] text-right w-full whitespace-nowrap"
                      >
                        <p
                          className="relative shrink-0"
                          dir="auto"
                        >
                          ۰ از ۲۰ دقیقه
                        </p>
                        <p
                          className="relative shrink-0"
                          dir="auto"
                        >
                          ۷ روز استمرار · در انتظار ثبت
                        </p>
                      </div>
                    </div>
                    <div
                      className="border-[var(--surface-soft)] border-b border-solid content-stretch flex flex-col gap-[8px] items-start overflow-clip py-[16px] relative shrink-0 w-full"
                    >
                      <div
                        className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full"
                      >
                        <MobileHabitreeButton
                          className="bg-[var(--background)] border border-[var(--surface-soft)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[14px] shrink-0 size-[44px]"
                          variant="Kind Log habit · Viewport Desktop"
                        />
                        <div
                          className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start leading-[1.9] min-w-px overflow-clip relative text-right"
                        >
                          <p
                            className="font-sans font-bold relative shrink-0 text-[var(--brand-dark)] text-[15px] w-full"
                            dir="auto"
                          >
                            آرامش ذهن
                          </p>
                          <p
                            className="font-sans font-normal relative shrink-0 text-[var(--muted)] text-[12px] w-full"
                            dir="auto"
                          >
                            ۱۰ دقیقه مراقبه
                          </p>
                        </div>
                      </div>
                      <div
                        className="[word-break:break-word] content-stretch flex font-sans font-normal items-start justify-between leading-[1.9] overflow-clip relative shrink-0 text-[var(--muted)] text-[12px] text-right w-full whitespace-nowrap"
                      >
                        <p
                          className="relative shrink-0"
                          dir="auto"
                        >
                          ۰ از ۱۰ دقیقه
                        </p>
                        <p
                          className="relative shrink-0"
                          dir="auto"
                        >
                          ۱ روز استمرار · در انتظار ثبت
                        </p>
                      </div>
                    </div>
                  </div>
                  <MobileHabitreeButton
                    className="bg-[var(--surface-soft)] content-stretch flex gap-[8px] h-[48px] items-center justify-center min-h-[48px] overflow-clip relative rounded-[12px] shrink-0 w-full"
                    label="ساخت عادت تازه"
                    variant="Kind Add habit · Viewport Desktop"
                  />
                </div>
                <div
                  className="bg-[var(--accent)] content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[16px] relative rounded-[24px] shrink-0 w-full"
                >
                  <p
                    className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[17px] text-right w-full"
                    dir="auto"
                  >
                    باغچه کوچک سارا
                  </p>
                  <div
                    className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-full"
                  >
                    <div
                      className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full"
                    >
                      <div
                        className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-w-px overflow-clip relative"
                      >
                        <div
                          className="relative shrink-0 size-[88px]"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={MobileimgIllustrationBotanicalGrowth8}
                          />
                        </div>
                        <p
                          className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[12px] text-center w-[min-content]"
                          dir="auto"
                        >
                          نوشیدن آب
                        </p>
                      </div>
                      <div
                        className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-w-px overflow-clip relative"
                      >
                        <div
                          className="relative shrink-0 size-[88px]"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={MobileimgIllustrationBotanicalGrowth9}
                          />
                        </div>
                        <p
                          className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[12px] text-center w-[min-content]"
                          dir="auto"
                        >
                          مطالعه روزانه
                        </p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full"
                    >
                      <div
                        className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-w-px overflow-clip relative"
                      >
                        <div
                          className="relative shrink-0 size-[88px]"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={MobileimgIllustrationBotanicalGrowth10}
                          />
                        </div>
                        <p
                          className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[12px] text-center w-[min-content]"
                          dir="auto"
                        >
                          آرامش ذهن
                        </p>
                      </div>
                      <div
                        className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center min-w-px overflow-clip relative"
                      >
                        <div
                          className="relative shrink-0 size-[88px]"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={MobileimgIllustrationBotanicalGrowth11}
                          />
                        </div>
                        <p
                          className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[12px] text-center w-[min-content]"
                          dir="auto"
                        >
                          پیاده‌روی
                        </p>
                      </div>
                    </div>
                  </div>
                  <p
                    className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[12px] text-center w-full"
                    dir="auto"
                  >
                    هر کدام، نشانه یک قدم از تو.
                  </p>
                </div>
                <div
                  className="bg-white border border-[var(--surface-soft)] border-solid content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-[24px] shrink-0 w-full"
                >
                  <p
                    className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[17px] text-right w-full"
                    dir="auto"
                  >
                    ریتم این هفته
                  </p>
                  <div
                    className="content-stretch flex gap-[12px] h-[112px] items-end relative shrink-0 w-full"
                  >
                    <div
                      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
                    >
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                      >
                        ۲
                      </p>
                      <div
                        className="bg-[var(--brand)] h-[30px] max-w-[28px] relative rounded-[5px] shrink-0 w-full"
                      />
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                        dir="auto"
                      >
                        ج
                      </p>
                    </div>
                    <div
                      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
                    >
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                      >
                        ۴
                      </p>
                      <div
                        className="bg-[var(--surface-soft)] h-[60px] max-w-[28px] relative rounded-[5px] shrink-0 w-full"
                      />
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                        dir="auto"
                      >
                        پ
                      </p>
                    </div>
                    <div
                      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
                    >
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                      >
                        ۳
                      </p>
                      <div
                        className="bg-[var(--surface-soft)] h-[45px] max-w-[28px] relative rounded-[5px] shrink-0 w-full"
                      />
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                        dir="auto"
                      >
                        چ
                      </p>
                    </div>
                    <div
                      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
                    >
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                      >
                        ۳
                      </p>
                      <div
                        className="bg-[var(--surface-soft)] h-[45px] max-w-[28px] relative rounded-[5px] shrink-0 w-full"
                      />
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                        dir="auto"
                      >
                        س
                      </p>
                    </div>
                    <div
                      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
                    >
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                      >
                        ۲
                      </p>
                      <div
                        className="bg-[var(--surface-soft)] h-[30px] max-w-[28px] relative rounded-[5px] shrink-0 w-full"
                      />
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                        dir="auto"
                      >
                        د
                      </p>
                    </div>
                    <div
                      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
                    >
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                      >
                        ۲
                      </p>
                      <div
                        className="bg-[var(--surface-soft)] h-[30px] max-w-[28px] relative rounded-[5px] shrink-0 w-full"
                      />
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                        dir="auto"
                      >
                        ی
                      </p>
                    </div>
                    <div
                      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px overflow-clip relative"
                    >
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                      >
                        ۲
                      </p>
                      <div
                        className="bg-[var(--surface-soft)] h-[30px] max-w-[28px] relative rounded-[5px] shrink-0 w-full"
                      />
                      <p
                        className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[11px] text-right whitespace-nowrap"
                        dir="auto"
                      >
                        ش
                      </p>
                    </div>
                  </div>
                  <p
                    className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[12px] text-right w-full"
                    dir="auto"
                  >
                    ۱۸ از ۲۸ ثبت هفتگی · ۶۴٪ پیشرفت
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p
          className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--muted)] text-[12px] text-center w-full"
          dir="auto"
        >
          این یک نمونه نمایشی از تجربه Habitree است؛ اطلاعات سارا و عادت‌ها واقعی
          یا زنده نیستند.
        </p>
      </div>
      <div
        className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
      >
        <div
          className="content-stretch flex flex-col gap-[32px] items-center overflow-clip pb-[64px] pt-[24px] px-[24px] relative shrink-0 w-full"
        >
          <div
            className="content-stretch flex flex-col gap-[16px] items-end overflow-clip relative shrink-0 w-full"
          >
            <p
              className="[word-break:break-word] font-sans font-bold leading-[1.9] min-w-full relative shrink-0 text-[var(--brand)] text-[13px] text-right w-[min-content]"
              dir="auto"
            >
              درباره Habitree
            </p>
            <p
              className="[word-break:break-word] font-sans font-extrabold leading-[1.6] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[28px] text-right w-[min-content]"
              dir="auto"
            >
              برای رشد، به خودت فرصت بده.
            </p>
            <p
              className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[16px] text-right w-[min-content]"
              dir="auto"
            >
              ما باور داریم تغییرهای ماندگار از کارهای کوچک شروع می‌شوند؛ نه از
              برنامه‌های سنگین و انتظارهای بزرگ.
            </p>
            <p
              className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[15px] text-right w-[min-content]"
              dir="auto"
            >
              Habitree همراهی آرام برای ساختن عادت‌هاست. اینجا هر تیک فقط یک کار
              انجام‌شده نیست؛ نشانه زمانی است که برای خودت گذاشته‌ای. باغچه‌ات
              یادآوری می‌کند که تلاش‌های کوچک، ارزش دیده شدن دارند.
            </p>
            <div
              className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0"
            >
              <p
                className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[14px] text-right whitespace-nowrap"
                dir="auto"
              >
                با ریتم خودت، بدون مقایسه
              </p>
              <div
                className="relative shrink-0 size-[18px]"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={MobileimgHeart1}
                />
              </div>
            </div>
          </div>
          <div
            className="bg-[var(--background)] content-stretch flex flex-col gap-[16px] items-center overflow-clip p-[32px] relative rounded-[32px] shrink-0 w-full"
          >
            <div
              className="relative shrink-0 size-[160px]"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={MobileimgIllustrationBotanicalGrowth12}
              />
            </div>
            <p
              className="[word-break:break-word] font-sans font-bold leading-[1.9] min-w-full relative shrink-0 text-[var(--brand-dark)] text-[24px] text-center w-[min-content]"
              dir="auto"
            >
              «لازم نیست سریع رشد کنی؛ کافی‌ست ادامه بدهی.»
            </p>
          </div>
        </div>
        <div
          className="content-stretch flex flex-col items-start overflow-clip pb-[64px] px-[24px] relative shrink-0 w-full"
        >
          <div
            className="bg-[var(--brand-dark)] content-stretch flex items-center overflow-clip p-[32px] relative rounded-[32px] shrink-0 w-full"
          >
            <div
              className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px overflow-clip relative"
            >
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--surface-soft)] text-[13px] text-right w-full"
                dir="auto"
              >
                اولین برگ، منتظر توست
              </p>
              <p
                className="[word-break:break-word] font-sans font-extrabold leading-[1.6] relative shrink-0 text-[var(--background)] text-[28px] text-right w-full"
                dir="auto"
              >
                امروز، بذر فردای بهترت را بکار.
              </p>
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--surface-soft)] text-[15px] text-right w-full"
                dir="auto"
              >
                یک عادت کوچک انتخاب کن. بقیه مسیر را قدم‌به‌قدم، کنار هم رشد
                می‌دهیم.
              </p>
              <MobileHabitreeButton
                className="bg-[var(--brand)] content-stretch flex gap-[8px] h-[48px] items-center justify-center min-h-[48px] overflow-clip px-[24px] py-[8px] relative rounded-[12px] shrink-0 w-full"
                label="رایگان ثبت‌نام کن"
                variant="Kind Primary · Viewport Mobile"
              />
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] relative shrink-0 text-[var(--surface-soft)] text-[12px] text-right w-full"
                dir="auto"
              >
                شروع رایگان · بدون نیاز به کارت بانکی
              </p>
            </div>
          </div>
        </div>
        <div
          className="bg-[var(--background)] content-stretch flex flex-col gap-[32px] items-start overflow-clip pb-[32px] pt-[48px] px-[24px] relative shrink-0 w-full"
        >
          <div
            className="content-stretch flex flex-col gap-[32px] items-start overflow-clip relative shrink-0 w-full"
          >
            <div
              className="content-stretch flex flex-col gap-[12px] items-end overflow-clip relative shrink-0 w-full"
            >
              <div
                className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0"
              >
                <p
                  className="[word-break:break-word] font-sans font-extrabold leading-[normal] relative shrink-0 text-[var(--brand)] text-[22px] whitespace-nowrap"
                >
                  habitree
                </p>
                <div
                  className="relative shrink-0 size-[40px]"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={MobileimgBrandMark}
                  />
                </div>
              </div>
              <p
                className="[word-break:break-word] font-sans font-normal leading-[1.9] min-w-full relative shrink-0 text-[var(--muted)] text-[14px] text-right w-[min-content]"
                dir="auto"
              >
                همراه کوچک تو برای عادت‌های ماندگار و روزهای سبزتر.
              </p>
            </div>
            <div
              className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full"
            >
              <MobileHabitreeFooterMenu className="content-stretch flex flex-col gap-[8px] h-[184px] items-end overflow-clip relative shrink-0 w-[159px]" />
              <div
                className="content-stretch flex flex-col gap-[8px] h-[184px] items-end overflow-clip relative shrink-0 w-[159px]"
              >
                <p
                  className="[word-break:break-word] font-sans font-bold leading-[1.9] relative shrink-0 text-[var(--brand-dark)] text-[15px] text-right w-full"
                  dir="auto"
                >
                  کشف Habitree
                </p>
                <div
                  className="content-stretch flex h-[44px] items-center justify-end min-h-[44px] overflow-clip relative shrink-0 w-full"
                >
                  <p
                    className="[word-break:break-word] flex-[1_0_0] font-sans font-normal leading-[1.9] min-w-px relative text-[var(--muted)] text-[14px] text-right"
                    dir="auto"
                  >
                    امکانات
                  </p>
                </div>
                <div
                  className="content-stretch flex h-[44px] items-center justify-end min-h-[44px] overflow-clip relative shrink-0 w-full"
                >
                  <p
                    className="[word-break:break-word] flex-[1_0_0] font-sans font-normal leading-[1.9] min-w-px relative text-[var(--muted)] text-[14px] text-right"
                    dir="auto"
                  >
                    چطور کار می‌کند؟
                  </p>
                </div>
                <div
                  className="content-stretch flex h-[44px] items-center justify-end min-h-[44px] overflow-clip relative shrink-0 w-full"
                >
                  <p
                    className="[word-break:break-word] flex-[1_0_0] font-sans font-normal leading-[1.9] min-w-px relative text-[var(--muted)] text-[14px] text-right"
                    dir="auto"
                  >
                    درباره ما
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="bg-[var(--surface-soft)] h-px relative shrink-0 w-full"
          />
          <div
            className="[word-break:break-word] content-center flex flex-wrap font-sans font-normal gap-[16px] items-center justify-end leading-[1.9] overflow-clip relative shrink-0 text-[var(--muted)] text-[12px] text-right w-full"
          >
            <p
              className="relative shrink-0 w-[84px]"
              dir="auto"
            >
              همراه همیشگیت
            </p>
            <p
              className="flex-[1_0_0] min-w-px relative"
              dir="auto"
            >
              © Habitree · با حوصله، برای رشد تو
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}



export default function Habitree() {
  return (
    <main dir="rtl" className="min-h-screen w-full bg-background font-sans text-right">
      <div className="block md:hidden">
        <MobileHabitreePage />
      </div>
      <div className="hidden md:block lg:hidden">
        <TabletHabitreePage />
      </div>
      <div className="hidden lg:block">
        <DesktopHabitreePage />
      </div>
    </main>
  );
}
