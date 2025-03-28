import type { Metadata } from 'next';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ToastContainer } from 'react-toastify';
import { syncUser } from './actions';

import localFont from 'next/font/local';
import styles from './components/Toast/styles.module.css';

import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Carton tracker',
  description: 'Carton tracker',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await syncUser();

  return (
    <html lang="en">
      <UserProvider>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            className={styles.toastContainer}
          />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
