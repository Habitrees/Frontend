import type { ButtonHTMLAttributes, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "../../../../shared/components/Button";
import type { ButtonVariant } from "../../../../shared/components/Button";

interface AuthSubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  loadingLabel?: ReactNode;
  variant?: ButtonVariant;
}

export function AuthSubmitButton({
  loading,
  loadingLabel = "در حال بررسی…",
  variant = "login",
  children,
  ...props
}: AuthSubmitButtonProps) {
  return (
    <Button {...props} variant={variant} type="submit" disabled={loading || props.disabled}>
      {loading && <LoaderCircle size={18} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />}
      {loading ? loadingLabel : children}
    </Button>
  );
}
