import { useAuthStore } from '@erp/auth';
import { loginSchema, useLogin, type LoginInput } from '@erp/data-access';
import { useTenant } from '@erp/tenant';
import { Button, HRInput, toast } from '@erp/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ForgetPassword } from '../features/forget-password/forget-password';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});
export type Role = 'admin' | 'hr_manager' | 'employee';

function LoginPage() {
  const navigate = useNavigate();
  const { tenant } = useTenant();
  const storeLogin = useAuthStore(
    (s: {
      login: (
        user: {
          id: string;
          email: string;
          name: string;
          role: Role;
          tenantId: string;
        },
        permissions: string[],
        token: string
      ) => void;
    }) => s.login
  );
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      tenantId: tenant.id,
    },
  });

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (result: {
        user: {
          id: string;
          email: string;
          name: string;
          role: Role;
          tenantId: string;
        };
        permissions: string[];
        token: string;
      }) => {
        storeLogin(result.user, result.permissions, result.token);
        toast({
          title: 'Welcome back!',
          description: `Signed in as ${result.user.name}`,
          variant: 'success',
        });
        navigate({ to: '/dashboard' });
      },
      onError: (err: Error) => {
        toast({
          title: 'Login failed',
          description: err.message || 'Please check your credentials.',
          variant: 'destructive',
        });
      },
    });
  });
  const [showPassword, setShowPassword] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const onBack = () => {
    setForgetPassword(false);
  };

  return (
    <>
      {forgetPassword === false ? (
        <div className="flex min-h-screen justify-between bg-background lg:px-15 xl:px-30 py-15.5">
          <div className="w-164.5 h-176 overflow-hidden rounded-3xl">
            <img
              src="/login.jpg"
              alt="login"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-107.25 bg-card my-auto">
            <div className="flex flex-col gap-8">
              <div className="text-[24px] text-text-6 font-medium leading-8 text-center">
                Sign in with email
              </div>

              <form onSubmit={onSubmit} className="flex flex-col gap-8">
                <div className="flex flex-col gap-3.5">
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

                    <div className="relative">
                      <Lock
                        size={18}
                        className="absolute left-4 top-5 -translate-y-1/2 text-gray-400 z-10"
                      />

                      <HRInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        aria-invalid={!!errors.password}
                        className={`px-11 shadow-none ${
                          errors.password ? 'border-destructive' : ''
                        }`}
                        error={errors.password?.message}
                        {...register('password')}
                      />

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-5 -translate-y-1/2 text-gray-400 border-none rounded-none p-0 h-auto"
                      >
                        {showPassword ? (
                          <Eye size={18} />
                        ) : (
                          <EyeOff size={18} />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div
                    className="text-[12px] text-text-6 font-normal leading-4 text-right cursor-pointer"
                    onClick={() => setForgetPassword(true)}
                  >
                    Forgot Password
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full px-4 py-2 rounded-xl h-13"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? 'Log in...' : 'Log in'}
                </Button>
              </form>
            </div>
            {import.meta.env.DEV && (
              <div className="border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">
                  Dev-only demo credentials:
                </p>
                <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                  <li>admin@gmail.com / Test@123</li>
                  <li>hr@gmail.com / Test@123</li>
                  <li>emp@gmail.com / Test@123</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <ForgetPassword onBack={onBack} />
      )}
    </>
  );
}
