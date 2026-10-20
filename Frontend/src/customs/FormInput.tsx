import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
}

/**
 * FormInput – Custom reusable labeled input with error display.
 * Works with react-hook-form register() spread directly.
 */
const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          ref={ref}
          aria-invalid={!!error}
          className={error ? "border-destructive focus-visible:ring-destructive" : ""}
          {...props}
        />
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
