import React, { useState } from 'react';
import axios from 'axios';
import url from '../../url';
import { Spinner } from '@material-tailwind/react';

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const validateEmail = () => {
    const isValid: boolean = /\S+@\S+\.\S+/.test(email);
    if (!isValid) {
      setEmailError('E-poçt formatı düzgün daxil edilməyib.');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError('Şifrə üçün minimum uzunluq 6-dır.');
    } else {
      setPasswordError('');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateEmail();
    validatePassword();
    setLoading(true);

    if (!emailError && !passwordError) {
      console.log('Email:', email);
      console.log('Password:', password);

      axios
        .post(
          `${url}/users/login`,
          {
            email,
            password,
          },
          { withCredentials: true }
        )
        .then(({ data }) => {
          if (data.status === 'success') window.location.reload();
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='email'
        >
          E-poçt
        </label>
        <input
          className={`appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            emailError ? 'border-red-500' : ''
          }`}
          id='email'
          type='email'
          placeholder='E-poçtunuzu daxil edin'
          value={email}
          onChange={handleEmailChange}
          onBlur={validateEmail}
        />
        {emailError && (
          <p className='text-red-500 text-xs italic'>{emailError}</p>
        )}
      </div>
      <div className='mb-6'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='password'
        >
          Şifrə
        </label>
        <input
          className={`appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            passwordError ? 'border-red-500' : ''
          }`}
          id='password'
          type='password'
          placeholder='Şifrə'
          value={password}
          onChange={handlePasswordChange}
          onBlur={validatePassword}
        />
        {passwordError && (
          <p className='text-red-500 text-xs italic'>{passwordError}</p>
        )}
      </div>
      <div className='flex items-center justify-between'>
        <button
          className='bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type='submit'
        >
          {loading ? <Spinner className='text-white mx-5' /> : 'Daxil ol'}
        </button>
      </div>
    </form>
  );
};

export default Login;
