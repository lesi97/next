'use client';

// The copy to clipboard function doesn't work on local custom domains set by hosts file, only https:// or localhost
export async function copyToClipboard(text: string): Promise<void> {
  if (typeof window !== 'undefined' && window.navigator?.clipboard) {
    await window.navigator.clipboard.writeText(text);
  } else {
    console.warn('Clipboard API not available');
  }
}
