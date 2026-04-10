import { useAuthStore } from '@erp/auth';
import { loginSchema, useLogin, type LoginInput } from '@erp/data-access';
import { useTenant } from '@erp/tenant';
import { Button, FormField, Input, toast } from '@erp/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

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
          role: string;
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
          role: string;
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-sm space-y-6 rounded-lg border border-border bg-card p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{tenant.branding.appTitle}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            label="Email"
            htmlFor="email"
            error={errors.email?.message}
            required
          >
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              className={errors.email ? 'border-destructive' : ''}
              {...register('email')}
            />
          </FormField>

          <FormField
            label="Password"
            htmlFor="password"
            error={errors.password?.message}
            required
          >
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              aria-invalid={!!errors.password}
              className={errors.password ? 'border-destructive' : ''}
              {...register('password')}
            />
          </FormField>

          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

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
  );
}
