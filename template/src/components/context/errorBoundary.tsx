'use client';
import { Component, ErrorInfo, ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import Link from 'next/link';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  detailsExpanded: boolean;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
    detailsExpanded: false,
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null,
      detailsExpanded: false,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.setState({ error, errorInfo: info });
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      detailsExpanded: false,
    });
  };

  setDetailsExpanded = () => {
    const expanded = !this.state.detailsExpanded;
    this.setState({ detailsExpanded: expanded });
  };

  render() {
    if (this.state.hasError) {
      return (
        <>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange>
            <div className='flex flex-col items-center justify-center h-dvh max-h-dvh min-h-dvh min-w-screen bg-base-100 antialiased'>
              <main className='h-fit bg-secondary/40 p-10 rounded flex flex-col gap-4 items-center justify-center'>
                <p>
                  An unexpected error has occurred. Please return to the home
                  page.
                </p>
                <Link href='/' className='w-full flex flex-row justify-end'>
                  <button className='rounded px-4 py-2 bg-primary text-primary-foreground hover:opacity-80 '>
                    Return
                  </button>
                </Link>
              </main>
            </div>
          </ThemeProvider>
        </>
      );
    }
    return this.props.children;
  }
}
