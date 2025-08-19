import type { Metadata } from 'next';
import { ReduxProvider } from '@/redux/ReduxProvider';
import '@/styles/global.css';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import getRequestConfig from '@/i18n/request';

export const metadata: Metadata = {
  title: 'Starwars .ft RS',
  icons: {
    icon: '/star-wars.png',
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale: baseLocale } = await params;
  const { locale, messages } = await getRequestConfig({
    requestLocale: Promise.resolve(baseLocale),
  });

  if (locale !== baseLocale || !messages) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <div id="root">
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ReduxProvider>{children}</ReduxProvider>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
