import { useCallback, useState, type FormEvent } from 'react';
import { getErrorDetails, getErrorMessage } from '@/store/api-utils';
import { useCreateEnquiryMutation } from '../api/enquiry.api';
import { enquiryFormSchema, type EnquiryField, type EnquiryFormValues } from '../enquiry.schema';
import type { EnquiryPayload, EnquiryReceipt, EnquirySource } from '../types';
import { getStoredUtm } from '../utm';

/** Order used to move focus to the first invalid field. */
const FIELD_ORDER: EnquiryField[] = ['name', 'phone', 'email', 'city', 'travelMonth', 'groupSize', 'message'];

const EMPTY_VALUES: EnquiryFormValues = {
  name: '',
  phone: '',
  email: '',
  city: '',
  travelMonth: '',
  groupSize: '',
  message: '',
  website: '',
};

export type FieldErrors = Partial<Record<EnquiryField, string>>;

interface UseEnquiryFormOptions {
  idPrefix: string;
  source: EnquirySource;
  packageSlug?: string;
  defaultMessage?: string;
  onSuccess?: (receipt: EnquiryReceipt) => void;
}

const optionalText = (value: string) => value.trim() || undefined;
const isEnquiryField = (value: unknown): value is EnquiryField =>
  typeof value === 'string' && Object.prototype.hasOwnProperty.call(EMPTY_VALUES, value);

/**
 * Form state, validation and submission for every enquiry form on the site.
 * Components stay presentational; this hook owns the behaviour.
 */
export function useEnquiryForm({ idPrefix, source, packageSlug, defaultMessage = '', onSuccess }: UseEnquiryFormOptions) {
  const [values, setValues] = useState<EnquiryFormValues>({ ...EMPTY_VALUES, message: defaultMessage });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [createEnquiry, { isLoading, data: receipt, error, reset: resetMutation }] = useCreateEnquiryMutation();

  const setField = useCallback((field: EnquiryField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  }, []);

  const showErrors = (fieldErrors: FieldErrors) => {
    setErrors(fieldErrors);
    const firstInvalid = FIELD_ORDER.find((field) => fieldErrors[field]);
    if (firstInvalid) document.getElementById(`${idPrefix}-${firstInvalid}`)?.focus();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsed = enquiryFormSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (isEnquiryField(field)) fieldErrors[field] ??= issue.message;
      }
      showErrors(fieldErrors);
      return;
    }

    const data = parsed.data;
    const payload: EnquiryPayload = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      city: optionalText(data.city),
      travelMonth: optionalText(data.travelMonth),
      message: optionalText(data.message),
      groupSize: data.groupSize ? Number(data.groupSize) : undefined,
      packageSlug,
      source,
      pageUrl: `${window.location.origin}${window.location.pathname}`,
      utm: getStoredUtm(),
      website: data.website || undefined,
    };

    try {
      const result = await createEnquiry(payload).unwrap();
      onSuccess?.(result);
    } catch (submitError) {
      // Map server-side validation messages back onto the matching fields.
      const fieldErrors: FieldErrors = {};
      for (const detail of getErrorDetails(submitError)) {
        if (isEnquiryField(detail.path)) fieldErrors[detail.path] = detail.message;
      }
      if (Object.keys(fieldErrors).length > 0) showErrors(fieldErrors);
    }
  };

  const reset = () => {
    setValues({ ...EMPTY_VALUES, message: defaultMessage });
    setErrors({});
    resetMutation();
  };

  return {
    values,
    errors,
    setField,
    handleSubmit,
    reset,
    isSubmitting: isLoading,
    receipt,
    serverError: error ? getErrorMessage(error) : null,
  };
}
