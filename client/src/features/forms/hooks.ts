import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { toast } from 'sonner';

export const ScrollToFieldError: React.FC = () => {
  const { isSubmitting, isValidating, errors } = useFormikContext();

  useEffect(() => {
    if (isSubmitting && !isValidating && Object.keys(errors).length > 0) {
      const firstErrorKey = Object.keys(errors)[0];
      
      toast.error('Please fix the validation errors before saving.');

      const errorElement = document.getElementsByName(firstErrorKey)[0];

      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (errorElement as HTMLElement).focus(); 
      }
    }
  }, [isSubmitting, isValidating, errors]);

  return null;
};

