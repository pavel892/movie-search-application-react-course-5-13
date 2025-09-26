'use client';

import { Pagination } from 'antd';
import { useRouter } from 'next/navigation';

export default function PaginationComponent({
  currentPage,
  query,
  totalPages,
}: {
  currentPage: number;
  query?: string;
  totalPages: number;
}) {
  const router = useRouter();

  return (
    <Pagination
      defaultCurrent={1}
      total={totalPages * 10}
      current={currentPage}
      onChange={(page) => {
        const params = new URLSearchParams();
        params.set('page', String(page));
        if (query) {
          params.set('query', query);
        }
        router.push(`?${params.toString()}`);
      }}
      align="center"
      style={{ marginBottom: '20px' }}
    />
  );
}
