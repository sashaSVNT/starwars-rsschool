import type { Metadata } from 'next';
import { ReduxProvider } from '@/redux/ReduxProvider';
import './index.css';

export const metadata: Metadata = {
  title: 'Starwars .ft RS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <ReduxProvider>{children}</ReduxProvider>
        </div>
      </body>
    </html>
  );
}
