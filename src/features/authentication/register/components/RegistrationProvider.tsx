import { Outlet } from "react-router-dom";
import { RegistrationContext, useRegistrationController } from "../hooks/useRegistration";

export function RegistrationProvider() {
  const registration = useRegistrationController();
  return <RegistrationContext value={registration}><Outlet /></RegistrationContext>;
}
