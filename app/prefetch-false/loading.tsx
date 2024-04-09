import React from 'react';
import { getSpinner } from '@/api/getSpinner';

const Loading = async () => {
  const Spinner = await getSpinner();

  return (
    <main className="w-[600px] mx-auto p-12 ">
      <div className="w-full flex place-items-center">
        <Spinner />
      </div>
    </main>
  );
};

export default Loading;
