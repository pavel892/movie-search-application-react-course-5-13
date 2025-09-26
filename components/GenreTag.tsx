'use client';
import { useMovies } from '@/app/context/useMovies';
import { ConfigProvider, Tag } from 'antd';

interface GenreObject {
  id: number;
  name: string;
}

export default function GenreTag({ genreId }: { genreId: number }) {
  const { genres, error } = useMovies();
  const genreNumber = genreId;
  const genre: GenreObject | undefined = genres.find((genre) => genre.id === genreNumber);

  if (!genre) {
    return null;
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: 'rgba(0,0,0,0.65)',
          borderRadiusSM: 2,
        },
      }}
    >
      <Tag style={{ fontFamily: 'var(--font-inter)', marginBottom: '5px' }}>{genre ? genre.name : error}</Tag>
    </ConfigProvider>
  );
}
