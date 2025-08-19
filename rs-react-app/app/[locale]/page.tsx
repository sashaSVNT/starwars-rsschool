import { redirect } from '@/i18n/routing';
// import { useLocale } from 'next-intl';

type HomeParams = {
  params: {
    locale: string;
  };
};

export default function Home({ params }: HomeParams) {
  redirect({
    href: '/1',
    locale: params.locale,
  });
}
