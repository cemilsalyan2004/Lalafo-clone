import React, { useEffect, useState } from 'react';
import url from '../url';
import { Spinner } from '@material-tailwind/react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { displayModal } from '../store/modalSclice';
import { createPortal } from 'react-dom';
import { originalUrl } from '../url';
import { category } from '../types/types';

import { DrawerDefault } from './Drawer';
import Form, { Overlay } from './form/Form';

import { AiFillHeart, AiOutlineUser, AiOutlineDown } from 'react-icons/ai';
import { GrUploadOption } from 'react-icons/gr';
import { GoSearch } from 'react-icons/go';
import { LuCable, LuSofa } from 'react-icons/lu';
import {
  PiPlantLight,
  PiTShirtLight,
  PiDog,
  PiFirstAidKitLight,
} from 'react-icons/pi';
import { AiOutlineHome } from 'react-icons/ai';
import { RiCarLine } from 'react-icons/ri';
import { BiDumbbell, BiMessageDetail, BiFork } from 'react-icons/bi';
import { IoBagOutline } from 'react-icons/io5';
import { TfiAnnouncement } from 'react-icons/tfi';
import { CiUser } from 'react-icons/ci';
import { MdBusinessCenter } from 'react-icons/md';
import { TbBabyCarriage } from 'react-icons/tb';

import { RootState } from '../types/types';
import axios from 'axios';
import Category from './Category';

const Profile: React.FC<{
  image: string;
  userName: string;
  mobile: boolean;
}> = ({ image, userName, mobile }) => {
  const [cookie, _, removeCookie] = useCookies();
  const showList = (e: React.MouseEvent<HTMLDivElement>) => {
    (
      (e.currentTarget as HTMLDivElement).lastChild as HTMLDivElement
    ).classList.remove('hidden');
  };
  const closeList = (e: React.MouseEvent<HTMLDivElement>) => {
    (
      (e.currentTarget as HTMLDivElement).lastChild as HTMLDivElement
    ).classList.add('hidden');
  };

  const exitUser = (e: React.MouseEvent) => {
    if (cookie.jwt) {
      removeCookie('jwt');
      window.location.reload();
    }
  };

  return (
    <div onMouseEnter={showList} onMouseLeave={closeList}>
      <div
        className={`items-center gap-3 ${
          mobile ? 'flex sm:hidden' : 'hidden sm:flex'
        } px-2 cursor-pointer`}
      >
        <div className='w-5 h-5 overflow-hidden rounded-full'>
          <img src={`${originalUrl}/static/users/${image}`} />
        </div>
        <span className='text-lg max-w-[60px] text-ellipsis overflow-hidden whitespace-nowrap'>
          {userName}
        </span>
        <AiOutlineDown size={12.5} />
      </div>
      <div className='hidden absolute z-40 bg-gray-100 px-2 py-4 shadow-lg rounded-lg'>
        <ul className='flex flex-col gap-2'>
          <li className='flex items-center gap-2 hover:bg-gray-300 px-4 py-2 rounded-md cursor-pointer'>
            <CiUser size={18} />
            Profil
          </li>
          <li className='flex items-center gap-2 hover:bg-gray-200 px-4 py-2 rounded-md cursor-pointer'>
            <TfiAnnouncement size={18} /> Elanlarım
          </li>
          <li className='flex items-center gap-2 hover:bg-gray-200 px-4 py-2 rounded-md cursor-pointer'>
            <BiMessageDetail size={18} />
            Mesajlar
          </li>
          <li
            className='text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-md cursor-pointer'
            onClick={exitUser}
          >
            Çıxış
          </li>
        </ul>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const modal = useSelector((state: RootState) => state.modalState.modal);
  const userName = useSelector((state: RootState) => state.userState.userName);
  const image = useSelector((state: RootState) => state.userState.image);
  const dispatch = useDispatch();
  const [catego, setCatego] = useState<category[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [cookie, _, removeCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${url}/category/getCategories`)
      .then(({ data }) => {
        if (data.status === 'success') setCatego(data.categories);
      })
      .finally(() => setLoading(false));
  }, []);

  const addPost = (e: React.MouseEvent) => {
    if (!cookie.jwt) dispatch(displayModal());
    else navigate('add');
  };

  return (
    <div className='rounded-lg overflow-hidden shadow-md px-4 py-2 bg-white mb-2 xl:px-28'>
      <div className='border-b-gray-300 flex flex-row items-center justify-between border-b-[1px] py-4 px-4'>
        <Link to='/' id='logo' className='text-2xl text-primary'>
          CMStore
        </Link>
        <div className='relative w-full mx-6 hidden md:block'>
          <input
            type='text'
            placeholder='     Axtar'
            className='border-[1px] border-gray-400 outline-none w-full px-2 py-1 rounded-lg'
            onFocus={(e) => {
              e.target.placeholder = 'Axtar';
              (e.target.nextSibling as SVGAElement).style.display = 'none';
            }}
            onBlur={(e) => {
              e.target.placeholder = '     Axtar';
              if (e.target.value.length === 0)
                (e.target.nextSibling as SVGAElement).style.display = 'block';
            }}
          />
          <GoSearch
            color='#bdbdbd'
            size={22}
            className='absolute top-1/2 -translate-y-1/2 ml-2'
          />
        </div>
        <div className='flex flex-row items-center gap-2 sm:gap-4'>
          <AiFillHeart color='#ff0000' size={22} className='cursor-pointer' />
          {userName ? (
            <Profile image={image!} userName={userName} mobile={true} />
          ) : (
            <AiOutlineUser
              size={22}
              className='cursor-pointer sm:hidden'
              onClick={() => dispatch(displayModal())}
            />
          )}
          {userName ? (
            <Profile image={image!} userName={userName} mobile={false} />
          ) : (
            <button
              className='cursor-pointer bg-gray-500 px-4 py-2 rounded-xl hidden sm:block text-sm text-white whitespace-nowrap'
              onClick={() => dispatch(displayModal())}
            >
              Daxil ol
            </button>
          )}
          <GrUploadOption
            size={20}
            className='cursor-pointer sm:hidden'
            onClick={addPost}
          />
          <button
            onClick={addPost}
            className='cursor-pointer bg-primary text-white px-4 py-2 rounded-xl hidden sm:block text-sm whitespace-nowrap'
          >
            Elan yerləşdir
          </button>
        </div>
      </div>
      {modal &&
        createPortal(
          <Form />,
          document.getElementById('form') as HTMLDivElement
        )}
      {modal &&
        createPortal(
          <Overlay />,
          document.getElementById('overlay') as HTMLDivElement
        )}
      <div className='border-gray-300 pt-2 sm:pt-0 flex flex-row justify-between items-center px-2 py-2 md:block xl:my-8 xl:bg-purple-200/50 rounded-xl'>
        <div className='relative w-full order-2 md:hidden'>
          <input
            type='text'
            placeholder='     Axtar'
            className='border-[1px] border-gray-400 outline-none w-full px-2 py-1 rounded-lg'
            onFocus={(e) => {
              e.target.placeholder = 'Axtar';
              (e.target.nextSibling as SVGAElement).style.display = 'none';
            }}
            onBlur={(e) => {
              e.target.placeholder = '     Axtar';
              (e.target.nextSibling as SVGAElement).style.display = 'block';
            }}
          />
          <GoSearch
            color='#bdbdbd'
            size={22}
            className='absolute top-1/2 -translate-y-1/2 ml-2'
          />
        </div>
        <div className='flex flex-row items-center'>
          <DrawerDefault />
          <div className='w-full mt-4 hidden md:flex flex-row flex-nowrap gap-2 justify-center md:gap-4 lg:gap-6 xl:gap-6'>
            {loading ? (
              <Spinner />
            ) : (
              catego?.map((cat, i) => {
                if (i < 8) {
                  let icon;
                  switch (cat.icon) {
                    case 'LuCable': {
                      icon = <LuCable size={20} />;
                      break;
                    }
                    case 'LuSofa': {
                      icon = <LuSofa size={20} />;
                      break;
                    }
                    case 'PiPlantLight': {
                      icon = <PiPlantLight size={20} />;
                      break;
                    }
                    case 'PiTShirtLight': {
                      icon = <PiTShirtLight size={20} />;
                      break;
                    }
                    case 'AiOutlineHome': {
                      icon = <AiOutlineHome size={20} />;
                      break;
                    }
                    case 'RiCarLine': {
                      icon = <RiCarLine size={20} />;
                      break;
                    }
                    case 'BiDumbbell': {
                      icon = <BiDumbbell size={20} />;
                      break;
                    }
                    case 'IoBagOutline': {
                      icon = <IoBagOutline size={20} />;
                      break;
                    }
                    case 'BiFork': {
                      icon = <BiFork size={25} />;
                      break;
                    }
                    case 'PiDog': {
                      icon = <PiDog size={25} />;
                      break;
                    }
                    case 'MdBusinessCenter': {
                      icon = <MdBusinessCenter size={25} />;
                      break;
                    }
                    case 'TbBabyCarriage': {
                      icon = <TbBabyCarriage size={25} />;
                      break;
                    }
                    case 'PiFirstAidKitLight': {
                      icon = <PiFirstAidKitLight size={25} />;
                      break;
                    }
                  }
                  return (
                    <Category
                      key={cat._id}
                      icon={icon}
                      type={cat.type}
                      _id={cat._id}
                    />
                  );
                }
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
