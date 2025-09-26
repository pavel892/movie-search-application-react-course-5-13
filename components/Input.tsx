'use client';

import { ConfigProvider, Input } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import debounce from 'lodash.debounce';

export default function InputComponent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set('query', e.target.value);
      params.set('page', '1');
    } else {
      params.delete('query');
    }

    if (!e.target.value.trim()) {
      params.set('page', '1');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const debouncedHandleSearch = debounce(handleSearch, 300);

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 4,
          controlHeight: 40,
        },
      }}
    >
      <Input
        placeholder="Type to search..."
        onChange={debouncedHandleSearch}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </ConfigProvider>
  );
}
