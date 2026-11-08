import { Outlet } from "react-router-dom";
import { PasswordRecoveryContext, useRecoveryController } from "../hooks/usePasswordRecovery";

export function PasswordRecoveryProvider() {
  const recovery = useRecoveryController();
  return <PasswordRecoveryContext value={recovery}><Outlet /></PasswordRecoveryContext>;
}
