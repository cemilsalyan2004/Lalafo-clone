import React from 'react';

const Category: React.FC<{ icon: any; type: string; _id: string }> = ({
  icon,
  type,
  _id,
}) => {
  return (
    <div className='flex flex-col items-center cursor-pointer px-2 py-3 rounded-xl hover:bg-gray-200 basis-[12.5%] md:basis-[10%] '>
      <div className='mb-3'>{icon}</div>
      <span className='text-xs text-center'>{type}</span>
    </div>
  );
};

export default Category;
