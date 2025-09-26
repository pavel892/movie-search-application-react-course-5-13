import { Spin } from 'antd';

export default function Loading() {
  return (
    <div className="flex justify-center mt-6">
      <Spin />
    </div>
  );
}
