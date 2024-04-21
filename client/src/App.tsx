import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './layouts/Layout';
import Main from './pages/Main';
import Post from './pages/Post';
import Product from './pages/Product';

function App() {
  return (
    <div className='max-w-[1500px] mx-auto px-3 py-2'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='add' element={<Post />} />
          <Route path='product/:id' element={<Product />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
