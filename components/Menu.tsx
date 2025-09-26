'use client';

import { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '/',
    label: (
      <Link href="/" rel="noopener noreferrer">
        Home
      </Link>
    ),
  },
  {
    key: '/about',
    label: (
      <Link href="/about" rel="noopener noreferrer">
        About
      </Link>
    ),
  },
];

export default function MenuComponent() {
  const pathname = usePathname();
  const [current, setCurrent] = useState(pathname);

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };
  return (
    <Menu
      style={{ fontFamily: 'var(--font-inter)' }}
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
}
