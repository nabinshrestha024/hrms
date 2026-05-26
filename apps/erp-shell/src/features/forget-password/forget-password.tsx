import { loginSchema, type LoginInput } from '@erp/data-access';
import { useTenant } from '@erp/tenant';
import { Button, HRInput } from '@erp/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ForgetPasswordProps {
  onBack: () => void;
}

export const ForgetPassword = ({ onBack }: ForgetPasswordProps) => {
  const { tenant } = useTenant();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      tenantId: tenant.id,
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.warn(data);
  });

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-107.25 p-8 shadow-lg rounded-3xl flex flex-col gap-6 border border-border bg-white">
        <div className="flex flex-col gap-3">
          <span className="text-[24px] text-text-6 font-medium leading-8 text-center">
            Forgot Password
          </span>
          <span className="text-[14px] text-text-6 font-normal leading-5">
            Enter your work email and we’ll send you a password reset link.
          </span>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-5 -translate-y-1/2 text-gray-400"
              />

              <HRInput
                id="email"
                type="email"
                placeholder="Email"
                aria-invalid={!!errors.email}
                className={`pl-11 shadow-none ${
                  errors.email ? 'border-destructive' : ''
                }`}
                error={errors.email?.message}
                {...register('email')}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              variant="secondary"
              className="w-full px-4 py-2 rounded-xl h-12"
            >
              Send
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full px-4 py-2 rounded-xl h-12"
              onClick={onBack}
            >
              Back to Log in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
