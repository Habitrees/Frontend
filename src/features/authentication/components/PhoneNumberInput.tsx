import type { ComponentProps } from "react";
import { UserRound } from "lucide-react";
import { Input } from "../../../shared/components/Input";

type PhoneNumberInputProps = Omit<ComponentProps<typeof Input>, "type" | "icon" | "inputMode">;

export function PhoneNumberInput(props: PhoneNumberInputProps) {
  return <Input {...props} type="tel" dir="ltr" inputMode="tel" autoComplete="tel" icon={<UserRound size={20} strokeWidth={1.7} />} />;
}
