import PeoplePageComponent from '@/components/peoplePageComponent';

export default async function PeoplePage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const currentPage = parseInt(page) || 1;
  return <PeoplePageComponent currentPage={currentPage} />;
}
