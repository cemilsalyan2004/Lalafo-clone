import React from 'react';
import { useNavigate } from 'react-router-dom';
import url from '../url';
import { originalUrl } from '../url';
import { FaRegUserCircle } from 'react-icons/fa';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { GiQueenCrown } from 'react-icons/gi';

import { Post } from '../types/types';

const AdItem: React.FC<Post> = ({
  _id,
  category,
  city,
  created,
  desc,
  image,
  number,
  poster,
  price,
  profile,
  showNumber,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className='border border-blue-gray-200 relative rounded-lg cursor-pointer hover:shadow-lg'
      onClick={() => navigate(`product/${_id}`)}
    >
      {/* {vip && (
        <GiQueenCrown
          title='VIP'
          size={27.5}
          className='-rotate-45 absolute -top-4 -left-3 z-20'
          color='#ffa500'
        />
      )} */}
      <div className='aspect-square overflow-hidden rounded-tr-lg border-tl-lg'>
        <img
          className='w-full h-full object-cover hover:scale-110 transition-transform'
          src={`${originalUrl}/static/ads/${poster}`}
          alt='Product'
        />
      </div>
      <div className='px-2 pb-2'>
        <div className='mt-2 font-semibold text-lg line-clamp-1'>
          {price} AZN
        </div>
        <div className='line-clamp-1 mt-1 italic text-sm'>{desc}</div>
        <div className='mt-3 flex items-center justify-between px-1'>
          <div className='aspect-square rounded-full overflow-hidden w-[30px]'>
            <img src={`${originalUrl}/static/users/${profile.image}`} />
          </div>
          <BiMessageSquareDetail size={27.5} />
        </div>
      </div>
    </div>
  );
};

export default AdItem;
