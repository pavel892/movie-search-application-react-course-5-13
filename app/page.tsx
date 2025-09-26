import TabsComponent from '@/components/Tabs';
import SessionProvider from '@/components/SessionProvider';

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div style={{ fontFamily: 'var(--font-inter)' }}>
      <SessionProvider>
        <TabsComponent currentPage={currentPage} query={query} />
      </SessionProvider>
    </div>
  );
}
