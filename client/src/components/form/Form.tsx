import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/modalSclice';

import Login from './Login';
import Signup from './Signup';

export const Overlay = () => {
  const dispatch = useDispatch();
  return (
    <div
      className='h-screen w-full fixed top-0 left-0 bg-black/40 z-40 cursor-pointer'
      onClick={() => dispatch(closeModal())}
    />
  );
};

const Form: React.FC = () => {
  const [loginOrSign, setLoginOrSign] = useState<'login' | 'sign'>('login');
  const activateLogin = (e: React.MouseEvent) => {
    (e.target as HTMLButtonElement).classList.add('button_active');
    (e.target as HTMLButtonElement).nextElementSibling?.classList.remove(
      'button_active'
    );
    setLoginOrSign('login');
  };
  const activateSign = (e: React.MouseEvent) => {
    (e.target as HTMLButtonElement).classList.add('button_active');
    (e.target as HTMLButtonElement).previousElementSibling?.classList.remove(
      'button_active'
    );
    setLoginOrSign('sign');
  };

  return (
    <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 h-[408px]'>
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <div className='flex items-center justify-between mb-4 font-semibold text-gray-700'>
          <button
            className='basis-1/2 text-center button_active py-2'
            onClick={activateLogin}
          >
            Daxil ol
          </button>
          <button className='basis-1/2 text-center py-2' onClick={activateSign}>
            Qeydiyyat
          </button>
        </div>
        {loginOrSign === 'login' && <Login />}
        {loginOrSign === 'sign' && <Signup />}
      </div>
    </div>
  );
};

export default Form;
