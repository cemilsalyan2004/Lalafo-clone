import React from 'react';
import {
  AiOutlineWhatsApp,
  AiFillFacebook,
  AiFillInstagram,
} from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <div className='rounded-lg shadow-md px-8 lg:px-10 py-4 bg-white flex justify-between xl:px-28'>
      <div className='flex items-center text-2xl gap-1'>
        <span>&#169;</span>
        <span id='logo' className='text-2xl text-primary'>
          CMStore
        </span>
      </div>
      <div className='flex gap-2 items-center'>
				<AiOutlineWhatsApp size={25}/>
				<AiFillFacebook size={25}/>
				<AiFillInstagram size={25}/>
				<FaTelegramPlane size={25}/>
			</div>
    </div>
  );
};

export default Footer;
