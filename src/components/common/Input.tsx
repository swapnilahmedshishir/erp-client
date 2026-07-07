import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: unknown[]) => twMerge(clsx(inputs));

const inputVariants = cva(
  "flex h-11 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        default: "",
        error: "border-red-500 focus:border-red-500 focus:ring-red-500/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-slate-700">
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={id}
          className={cn(
            inputVariants({
              variant: error ? "error" : variant,
            }),
            className,
          )}
          {...props}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
