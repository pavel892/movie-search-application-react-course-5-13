'use client';

import { Alert } from 'antd';

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex justify-center mt-6">
      <Alert message={error.message} type="error" />
    </div>
  );
}
