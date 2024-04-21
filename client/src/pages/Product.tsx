import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showSlider, hideSlider } from '../store/sliderSlice';
import axios from 'axios';
import url from '../url';
import { originalUrl } from '../url';
import { useParams } from 'react-router-dom';
import { Post, RootState } from '../types/types';

import { PiDotsThreeVertical } from 'react-icons/pi';
import { LuSend } from 'react-icons/lu';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { RiFullscreenFill, RiFullscreenExitFill } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';

import {
  AiOutlineWhatsApp,
  AiFillFacebook,
  AiFillInstagram,
} from 'react-icons/ai';
import { BsTwitterX } from 'react-icons/bs';
import { FaTelegramPlane } from 'react-icons/fa';

const ImageSlider: React.FC<{ links: string[]; id: number }> = ({
  links,
  id,
}) => {
  const dispatch = useDispatch();
  const elementRef = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [imgid, setImgid] = useState<number>(id);

  const requestFullScreen = () => {
    const element = elementRef.current;
    setFullscreen(true);

    if (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    }
  };

  const exitFullScreen = () => {
    setFullscreen(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    }
  };

  return (
    <React.Fragment>
      <div
        className='fixed top-0 left-0 w-full h-screen bg-black/80'
        onClick={() => dispatch(hideSlider())}
      />
      <div
        className='fixed top-0 left-0 w-full h-screen flex justify-center'
        ref={elementRef}
      >
        <div className='flex flex-row items-center gap-4 absolute right-6 top-5'>
          {!fullscreen && (
            <RiFullscreenFill
              color='#c2c2c2'
              size={25}
              cursor='pointer'
              onClick={requestFullScreen}
              onMouseEnter={(e) =>
                ((e.target as HTMLDivElement).style.color = '#fff')
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLDivElement).style.color = '#c2c2c2')
              }
            />
          )}

          {fullscreen && (
            <RiFullscreenExitFill
              color='#c2c2c2'
              size={25}
              cursor='pointer'
              onClick={exitFullScreen}
              onMouseEnter={(e) =>
                ((e.target as HTMLDivElement).style.color = '#fff')
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLDivElement).style.color = '#c2c2c2')
              }
            />
          )}

          <IoMdClose
            color='#c2c2c2'
            size={28}
            cursor='pointer'
            onClick={() => dispatch(hideSlider())}
            onMouseEnter={(e) =>
              ((e.target as HTMLDivElement).style.color = '#ff0000')
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLDivElement).style.color = '#c2c2c2')
            }
          />
        </div>

        <div
          className={`absolute top-1/2 -translate-y-1/2 left-5 bg-gray-300 w-14 aspect-square rounded-full flex justify-center items-center cursor-pointer ${
            imgid === 0 ? 'hidden' : ''
          }`}
          onClick={() => {
            if (imgid !== 0) setImgid((id) => id - 1);
          }}
        >
          <MdOutlineArrowBackIosNew color='#fff' size={28} />
        </div>
        <div
          className={`absolute top-1/2 -translate-y-1/2 right-5 bg-gray-300 w-14 aspect-square rounded-full flex justify-center items-center cursor-pointer ${
            imgid === links.length - 1 ? 'hidden' : ''
          }`}
          onClick={() => {
            if (imgid !== links.length - 1) setImgid((id) => id + 1);
          }}
        >
          <MdOutlineArrowForwardIos color='#fff' size={28} />
        </div>

        <div className='aspect-square h-screen'>
          <img
            src={`${originalUrl}/static/ads/${links?.at(imgid)}`}
            className='object-contain w-full h-full'
          />
        </div>
      </div>
    </React.Fragment>
  );
};

const Product: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const [show, setShow] = useState<boolean>(false);
  const [num, setNum] = useState<number>(0);
  const dispatch = useDispatch();
  const slider = useSelector((state: RootState) => state.sliderState.shown);
  const focusRef = useRef<HTMLInputElement>(null);

  const activeStyle = ['border-2', 'border-blue-500'];

  const changeSrcHandler = (e: React.MouseEvent<HTMLImageElement>) => {
    const poster = document.getElementById('poster');
    (poster as HTMLImageElement).src = (e.target as HTMLImageElement).src;
    (e.target as HTMLImageElement)
      .closest('div')
      ?.querySelectorAll('img')
      .forEach((img) => img.classList.remove(...activeStyle));
    (e.target as HTMLImageElement).classList.add(...activeStyle);
  };

  const focusHandler = () => {
    (focusRef.current as HTMLInputElement)?.focus();
  };

  useEffect(() => {
    axios.get(`${url}/ads/getPostById/${id}`).then(({ data }) => {
      if (data.status === 'success') {
        setPost(data.data);
      }
    });
  }, []);

  return (
    <div className='rounded-lg shadow-md px-10 py-8 lg:px-28 bg-white mb-2'>
      <div className='mb-6'>
        <span id='logo' className='text-primary font-semibold'>
          CMStore
        </span>{' '}
        {'>'} {post?.city.type} {'>'} {post?.category?.type}
      </div>
      <div className='flex flex-col flex-wrap lg:flex-row lg:flex-nowrap lg:justify-center gap-6 lg:gap-12'>
        <div className='border border-gray-300 max-w-[500px] rounded-lg'>
          <div className='aspect-square border w-full bg-gray-300'>
            <img
              id='poster'
              src={`${originalUrl}/static/ads/${post?.poster}`}
              className='object-contain w-full h-full cursor-pointer'
              onClick={() => dispatch(showSlider())}
            />
          </div>
          <div className='grid grid-cols-7 px-6 py-4 border-b border-gray-300 gap-4'>
            {post?.image.map((image, i) => (
              <img
                src={`${originalUrl}/static/ads/${image}`}
                className={`cursor-pointer aspect-[1/1.1] rounded-md w-full h-full object-cover ${
                  i === 0 ? activeStyle.join(' ') : ''
                }`}
                onClick={(e) => {
                  changeSrcHandler(e);
                  setNum(i);
                }}
              />
            ))}
          </div>
          <div className='px-6 py-4 border-b border-gray-300'>
            <div className='bg-gray-200 px-4 py-4 rounded-lg flex items-center justify-between'>
              <div className='flex flex-row items-center gap-4'>
                <div className='aspect-square border w-[40px] rounded-full overflow-hidden'>
                  <img
                    src={`${originalUrl}/static/users/${post?.profile.image}`}
                    className='object-contain w-full h-full'
                  />
                </div>
                <div className='text-lg'>{post?.profile.userName}</div>
              </div>
              <button
                className='bg-primary text-white px-10 py-1 rounded-xl'
                onClick={focusHandler}
              >
                yazın
              </button>
            </div>
          </div>
          <div className='text-lg border-b border-gray-300 leading-6 font-serif overflow-ellipsis line-clamp-3 px-6 py-4 font-semibold'>
            {post?.desc}
          </div>
          <div className='px-6 py-4 space-y-3'>
            <p className='font-semibold'>Paylaş</p>
            <div className='flex flex-row items-center gap-2'>
              <AiOutlineWhatsApp size={28} cursor='pointer' />
              <AiFillFacebook size={28} cursor='pointer' />
              <AiFillInstagram size={28} cursor='pointer' />
              <FaTelegramPlane size={28} cursor='pointer' />
              <BsTwitterX size={28} cursor='pointer' />
            </div>
          </div>
        </div>

        <div className='space-y-6'>
          <div className='border border-gray-300 max-w-[500px] lg:basis-[350px] rounded-lg h-fit'>
            <div className='border-b border-gray-300 px-6 py-3 text-xl font-semibold'>
              {post?.price} <span className='text-primary'>&#x20BC;</span>
            </div>
            <div className='px-6 py-3 flex flex-row justify-between items-center shadow-md bg-gray-200'>
              <div className='flex flex-row items-center gap-4'>
                <div className='aspect-square w-8 overflow-hidden rounded-full'>
                  <img
                    src={`${originalUrl}/static/users/${post?.profile.image}`}
                    alt=''
                  />
                </div>
                <div>{post?.profile.userName}</div>
              </div>
              <PiDotsThreeVertical size={20} cursor={'pointer'} />
            </div>
            <div className='h-[400px] px-4 py-2 border-b border-gray-300'></div>
            <div className='px-4 py-3'>
              <form className='flex flex-row items-center justify-between flex-nowrap gap-4'>
                <input
                  type='text'
                  name='msg'
                  id='msg'
                  ref={focusRef}
                  className='border-2 border-gray-300 px-2 py-1 rounded-md focus:outline-none basis-full placeholder:text-sm break-words'
                  style={{ overflowWrap: 'break-word' }}
                  placeholder='yazın...'
                />
                <button type='submit'>
                  <LuSend size={22} color='#0000ff' />
                </button>
              </form>
            </div>
          </div>
          <div className='flex flex-row justify-between border border-gray-300 rounded-lg px-4 py-3 bg-gray-200 max-w-[500px]'>
            <div className='flex items-center gap-2 text-sm'>
              <BsFillTelephoneFill size={17} color='#000' />
              +994{' '}
              {show
                ? post?.number.toString().replace(' ', '')
                : post?.number.toString().replace(' ', '').slice(0, -2) + 'xx'}
            </div>
            <button
              className='text-sm text-primary'
              onClick={() => setShow((prevState) => !prevState)}
            >
              {show ? 'Gizlət' : 'Göstər'}
            </button>
          </div>
        </div>
      </div>
      {slider && <ImageSlider links={post?.image!} id={num} />}
    </div>
  );
};

export default Product;
