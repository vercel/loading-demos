import React from 'react';
import { Spinner } from '@/components/spinner';

const Loading = () => {
  return (
    <main className="w-[600px] mx-auto p-12 ">
      <div className="w-full flex place-items-center">
        <Spinner />
      </div>
    </main>
  );
};

export default Loading;
