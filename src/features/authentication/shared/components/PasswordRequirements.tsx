import { CheckCircle2, Circle } from "lucide-react";
import { getPasswordRequirements } from "../utils/passwordPolicy";

interface PasswordRequirementsProps {
  password: string;
  id?: string;
}

export function PasswordRequirements({ password, id }: PasswordRequirementsProps) {
  const requirements = getPasswordRequirements(password);

  return (
    <ul
      id={id}
      className="password-requirements mt-2 flex flex-wrap gap-x-3 gap-y-1 text-fine"
      aria-label="قوانین رمز عبور"
      aria-live="polite"
      aria-relevant="text"
    >
      {requirements.map((requirement) => (
        <li
          key={requirement.id}
          data-met={requirement.met}
          className={`flex items-center gap-1 ${requirement.met ? "is-met text-reassurance" : "is-unmet text-login-muted"}`}
        >
          {requirement.met ? (
            <CheckCircle2 className="shrink-0" size={17} strokeWidth={2.7} aria-hidden="true" />
          ) : (
            <Circle className="shrink-0" size={16} strokeWidth={1.8} aria-hidden="true" />
          )}
          <span>{requirement.label}</span>
        </li>
      ))}
    </ul>
  );
}
