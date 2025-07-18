import { DeployButton } from '@/components/deploy-button';
import { EnvVarWarning } from '@/components/env-var-warning';
import { AuthButton } from '@/components/auth-button';
import { Hero } from '@/components/hero';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { ConnectSupabaseSteps } from '@/components/tutorial/connect-supabase-steps';
import { SignUpUserSteps } from '@/components/tutorial/sign-up-user-steps';

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col items-center'>
      <div className='flex-1 w-full flex flex-col gap-20 items-center'>
        <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
          <div className='w-full max-w-5xl flex justify-end items-center p-3 px-5 text-sm'>
            <AuthButton />
          </div>
        </nav>
      </div>
    </main>
  );
}

