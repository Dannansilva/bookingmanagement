import { LoginForm } from '@/components/features/auth';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <LoginForm />
    </main>
  );
}
