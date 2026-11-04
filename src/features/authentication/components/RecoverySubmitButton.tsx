import type { ButtonHTMLAttributes } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "../../../shared/components/Button";

export function RecoverySubmitButton({ loading, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { loading: boolean }) {
  return <Button {...props} type="submit" disabled={loading || props.disabled}>
    {loading && <LoaderCircle size={18} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />}
    {loading ? "در حال بررسی…" : children}
  </Button>;
}
