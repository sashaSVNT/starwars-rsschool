import PeoplePageComponent from '@/components/peoplePageComponent';

export default async function SelectedPersonPage({
  params,
}: {
  params: Promise<{ page: string; detailsId: string }>;
}) {
  const { page, detailsId } = await params;
  const currentPage = parseInt(page) || 1;
  return (
    <PeoplePageComponent currentPage={currentPage} detailsId={detailsId} />
  );
}
