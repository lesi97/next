import { AuthButton, ThemeSwitcher } from '@/components/layout';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='min-h-screen flex flex-col items-center'>
      <div className='flex-1 w-full flex flex-col gap-20 items-center'>
        <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
          <div className='w-full max-w-5xl flex justify-end items-center p-3 px-5 text-sm'>
            <AuthButton />
          </div>
        </nav>
        <div className='flex-1 flex flex-col gap-20 max-w-5xl p-5'>
          {children}
        </div>

        <footer className='w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16'>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
