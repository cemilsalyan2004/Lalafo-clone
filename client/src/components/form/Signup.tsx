import React, { useState } from 'react';
import axios from 'axios';
import url from '../../url';
import { Spinner } from '@material-tailwind/react';

const Signup: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  const validateUsername = () => {
    if (!username) {
      setUsernameError('İstifadəçi adı boş ola bilməz.');
    } else {
      setUsernameError('');
    }
  };

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

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('Şifrələr eyni deyil.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setUsernameError('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    setLoading(true);

    if (!emailError && !passwordError && !confirmPasswordError) {
      axios
        .post(
          `${url}/users/signup`,
          {
            userName: username,
            passwordConfirm: confirmPassword,
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
          htmlFor='username'
        >
          İstifadəçi Adı
        </label>
        <input
          className={`appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            usernameError ? 'border-red-500' : ''
          }`}
          id='username'
          type='text'
          placeholder='İstifadəçi adınizi daxil edin'
          value={username}
          onChange={handleUsernameChange}
          onBlur={validateUsername}
        />
        {usernameError && (
          <p className='text-red-500 text-xs italic'>{usernameError}</p>
        )}
      </div>
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
      <div className='mb-4'>
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
      <div className='mb-6'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='confirmPassword'
        >
          Şifrənin Təsdiqi
        </label>
        <input
          className={`appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            confirmPasswordError ? 'border-red-500' : ''
          }`}
          id='confirmPassword'
          type='password'
          placeholder='Şifrənizi təkrar daxil edin'
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          onBlur={validateConfirmPassword}
        />
        {confirmPasswordError && (
          <p className='text-red-500 text-xs italic'>{confirmPasswordError}</p>
        )}
      </div>
      <div className='flex items-center justify-between'>
        <button
          className='bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type='submit'
        >
          {loading ? <Spinner className='text-white mx-8' /> : 'Qeydiyyat'}
        </button>
      </div>
    </form>
  );
};

export default Signup;
