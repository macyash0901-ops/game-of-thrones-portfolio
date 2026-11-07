import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '../src/styles.css';

export const metadata: Metadata = {
  title: 'Yash Drall | Full-Stack Software Developer',
  description:
    'Yash Drall’s portfolio: production web and mobile applications with React.js, Next.js, Flutter, and Python.',
  openGraph: {
    title: 'Yash Drall | Full-Stack Software Developer',
    description:
      'Explore Yash Drall’s experience, projects, and full-stack software development expertise.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
