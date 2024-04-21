import React, { useState, useEffect } from 'react';
import axios from 'axios';
import url from '../url';
import { Spinner } from '@material-tailwind/react';
import { category } from '../types/types';
import { Drawer, Typography, IconButton } from '@material-tailwind/react';
import { AiFillAppstore } from 'react-icons/ai';

export function DrawerDefault() {
  const [catego, setCatego] = useState<category[]>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${url}/category/getCategories`)
      .then(({ data }) => {
        if (data.status === 'success') setCatego(data.categories);
      })
      .finally(() => setLoading(false));
  }, []);

  const [open, setOpen] = React.useState(false);

  const openDrawer = () => {
    setOpen(true);
    document.getElementById('overlay')?.classList.remove('hidden');
  };
  const closeDrawer = () => {
    setOpen(false);
    document.getElementById('overlay')?.classList.add('hidden');
  };

  return (
    <React.Fragment>
      <div className='pr-4 py-4 lg:pl-8 order-1 sm:order-none'>
        <AiFillAppstore
          size={30}
          onClick={openDrawer}
          className='cursor-pointer m-3'
        />
      </div>
      <Drawer open={open} onClose={closeDrawer} className='p-4' id='draw'>
        <div className='mb-6 flex items-center justify-between'>
          <Typography variant='h5' color='blue-gray'>
            Kataloq
          </Typography>
          <IconButton variant='text' color='blue-gray' onClick={closeDrawer}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </IconButton>
        </div>
        <div className='flex gap-2 flex-col'>
          {loading ? (
            <Spinner />
          ) : (
            catego?.map((cat, index) => (
              <div
                className='border-2 px-2 py-1 rounded-lg cursor-pointer hover:bg-gray-200'
                key={index}
              >
                {cat.type}
              </div>
            ))
          )}
        </div>
      </Drawer>
      <div
        id='overlay'
        className='hidden fixed inset-0 w-full h-full pointer-events-auto z-[9996] bg-black bg-opacity-60 backdrop-blur-sm'
      />
    </React.Fragment>
  );
}
