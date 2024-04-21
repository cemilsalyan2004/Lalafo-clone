import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';
import axios from 'axios';
import url from '../url';
import { useCookies } from 'react-cookie';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const [cookie] = useCookies();
  useEffect(() => {
    if (cookie.jwt) {
      axios
        .post(`${url}/users`, {}, { withCredentials: true })
        .then(({ data }) => {
          if (data.status === 'success')
            dispatch(
              addUser({
                _id: data.user._id,
                userName: data.user.userName,
                email: data.user.email,
                createdAt: data.user.createdAt,
                image: data.user.image,
              })
            );
        });
    }
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
