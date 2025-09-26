import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import MoviesList from './MoviesList';
import RatedMoviesList from './RatedMoviesList';
import { Suspense } from 'react';
import { Spin } from 'antd';
import InputComponent from './Input';

export default function TabsComponent({ currentPage, query }: { currentPage: number; query: string }) {
  const items: TabsProps['items'] = [
    {
      key: 'tab1',
      label: 'Search',
      children: (
        <>
          <div className="flex justify-center">
            <div className="w-[388px] md:w-[92%] lg:w-[988px]">
              <InputComponent />
            </div>
          </div>
          <Suspense
            key={query + currentPage}
            fallback={
              <div className="flex justify-center mt-6 mb-6">
                <Spin />
              </div>
            }
          >
            <MoviesList currentPage={currentPage} query={query} />
          </Suspense>
        </>
      ),
    },
    {
      key: 'tab2',
      label: 'Rated',
      children: <RatedMoviesList />,
    },
  ];

  return (
    <>
      <Tabs style={{ fontFamily: 'var(--font-inter)' }} centered={true} defaultActiveKey="1" items={items} />
    </>
  );
}
