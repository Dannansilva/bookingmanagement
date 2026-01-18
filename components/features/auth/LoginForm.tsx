'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Input, Button, Card } from '@/components/ui';
import { brandingConfig, contentConfig } from '@/config';
import { validateLogin } from '@/lib/data/auth';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await validateLogin(email, password);

    if (result.success && result.user) {
      // Store user in localStorage (use proper auth in production)
      localStorage.setItem('user', JSON.stringify(result.user));
      router.push('/dashboard');
    } else {
      setError(result.error || 'Login failed');
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full">
          <Image
            src={brandingConfig.company.logo}
            alt={brandingConfig.company.name}
            width={80}
            height={80}
            className="h-20 w-20"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="mb-2 text-2xl font-semibold text-slate-900">
          {contentConfig.pages.login.title}
        </h1>

        {/* Subtitle */}
        <p className="mb-8 text-center text-sm text-amber-600">
          {contentConfig.pages.login.description}
        </p>

        {/* Error message */}
        {error && (
          <div className="mb-4 w-full rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <Input
            type="email"
            label={contentConfig.labels.email}
            placeholder={contentConfig.placeholders.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <Input
            type="password"
            label={contentConfig.labels.password}
            placeholder={contentConfig.placeholders.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isLoading}
          >
            {contentConfig.buttons.signIn}
          </Button>
        </form>

        {/* Demo credentials hint */}
        <p className="mt-6 text-center text-xs text-slate-400">
          Demo: Use any user email with any password
        </p>
      </div>
    </Card>
  );
}
