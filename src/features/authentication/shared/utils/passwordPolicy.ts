export interface PasswordRequirement {
  id: "minLength" | "letter" | "number";
  label: string;
  met: boolean;
}

const passwordRuleDefinitions = [
  {
    id: "minLength",
    label: "حداقل ۸ کاراکتر",
    test: (value: string) => Array.from(value).length >= 8,
  },
  {
    id: "letter",
    label: "حداقل یک حرف انگلیسی",
    test: (value: string) => /[A-Za-z]/.test(value),
  },
  {
    id: "number",
    label: "حداقل یک عدد",
    test: (value: string) => /[0-9۰-۹٠-٩]/.test(value),
  },
] as const;

export function getPasswordRequirements(value: string): PasswordRequirement[] {
  return passwordRuleDefinitions.map((rule) => ({
    id: rule.id,
    label: rule.label,
    met: rule.test(value),
  }));
}

export function validatePassword(value: string, fieldLabel = "رمز عبور"): true | string {
  if (!value) return `${fieldLabel} را وارد کن.`;

  const missing = getPasswordRequirements(value).filter((requirement) => !requirement.met);
  if (missing.length === 0) return true;

  return `${fieldLabel} باید ${missing.map((requirement) => requirement.label).join("، ")} را داشته باشد.`;
}
