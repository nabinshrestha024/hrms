import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTenant } from '@erp/tenant';
import { useAuthStore } from '@erp/auth';
import {
  useLogin,
  loginSchema,
  type LoginInput,
} from '@erp/data-access';
import { Button, Input, FormField, toast } from '@erp/ui';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { tenant } = useTenant();
  const storeLogin = useAuthStore((s) => s.login);
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
      onSuccess: (result) => {
        storeLogin(result.user, result.permissions, result.token);
        toast({ title: 'Welcome back!', description: `Signed in as ${result.user.name}`, variant: 'success' });
        navigate({ to: '/dashboard' });
      },
      onError: (err) => {
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
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your account</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <FormField label="Email" htmlFor="email" error={errors.email?.message} required>
            <Input
              id="email"
              type="email"
              placeholder="admin@demo.com"
              aria-invalid={!!errors.email}
              className={errors.email ? 'border-destructive' : ''}
              {...register('email')}
            />
          </FormField>

          <FormField label="Password" htmlFor="password" error={errors.password?.message} required>
            <Input
              id="password"
              type="password"
              placeholder="password123"
              aria-invalid={!!errors.password}
              className={errors.password ? 'border-destructive' : ''}
              {...register('password')}
            />
          </FormField>

          <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">Demo credentials:</p>
          <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
            <li>admin@demo.com / password123</li>
            <li>hr@demo.com / password123</li>
            <li>employee@demo.com / password123</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
