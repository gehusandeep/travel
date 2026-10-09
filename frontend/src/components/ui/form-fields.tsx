import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

/** Accessible form controls: visible label, aria-invalid and error text linked by aria-describedby. */

const controlClasses =
  'block w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-ink-950 shadow-sm placeholder:text-stone-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20 disabled:cursor-not-allowed disabled:bg-stone-100';

const errorControlClasses = 'border-red-600 focus:border-red-600 focus:ring-red-600/20';

interface FieldBaseProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  /** Show "(optional)" after the label of non-required fields. Turn off for filters. */
  showOptional?: boolean;
  className?: string;
}

interface FieldShellProps extends FieldBaseProps {
  children: ReactNode;
}

function FieldShell({ id, label, error, hint, required, showOptional = true, className, children }: FieldShellProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-900">
        {label}
        {required ? (
          <span className="text-brand-700" aria-hidden="true">
            {' '}
            *
          </span>
        ) : showOptional ? (
          <span className="font-normal text-stone-500"> (optional)</span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-stone-500">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

type TextFieldProps = FieldBaseProps & Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'className' | 'required'>;

export function TextField({ id, label, error, hint, required, showOptional, className, ...inputProps }: TextFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
      showOptional={showOptional}
      className={className}
    >
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        aria-required={required || undefined}
        className={cn(controlClasses, error && errorControlClasses)}
        {...inputProps}
      />
    </FieldShell>
  );
}

type SelectFieldProps = FieldBaseProps &
  Omit<ComponentPropsWithoutRef<'select'>, 'id' | 'className' | 'required'> & { children: ReactNode };

export function SelectField({
  id,
  label,
  error,
  hint,
  required,
  showOptional,
  className,
  children,
  ...selectProps
}: SelectFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
      showOptional={showOptional}
      className={className}
    >
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        aria-required={required || undefined}
        className={cn(controlClasses, 'pr-9', error && errorControlClasses)}
        {...selectProps}
      >
        {children}
      </select>
    </FieldShell>
  );
}

type TextAreaFieldProps = FieldBaseProps &
  Omit<ComponentPropsWithoutRef<'textarea'>, 'id' | 'className' | 'required'>;

export function TextAreaField({
  id,
  label,
  error,
  hint,
  required,
  showOptional,
  className,
  rows = 3,
  ...textareaProps
}: TextAreaFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
      showOptional={showOptional}
      className={className}
    >
      <textarea
        id={id}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        aria-required={required || undefined}
        className={cn(controlClasses, 'resize-y', error && errorControlClasses)}
        {...textareaProps}
      />
    </FieldShell>
  );
}
