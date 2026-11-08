import type { ReactNode } from "react";
import registrationBotanicalImage from "../../../../assets/registration-botanical.png";
import { AuthLayout } from "../../shared/components/AuthLayout";

interface RegistrationLayoutProps {
  children: ReactNode;
  title: string;
  label: string;
  showPrivacyFooter?: boolean;
}

export function RegistrationLayout({
  children,
  title,
  label,
  showPrivacyFooter = false,
}: RegistrationLayoutProps) {
  return (
    <AuthLayout
      title={title}
      label={label}
      showPrivacyFooter={showPrivacyFooter}
      headerVariant="registration"
      welcome={{
        heading: <>یک عادت کوچک،<br />یک شروع برای رشد.</>,
        description: <>عادت‌های خوبت را با habitree پرورش بده؛<br />هر روز، یک قدم به خودت نزدیک‌تر.</>,
        imageSrc: registrationBotanicalImage,
        variant: "registration",
      }}
    >
      {children}
    </AuthLayout>
  );
}
