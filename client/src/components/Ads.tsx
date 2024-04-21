import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import url from '../url';
import AdItem from './AdItem';
import { Spinner } from '@material-tailwind/react';

import { Post } from '../types/types';

const Ads: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('useEffect triggered');
    const fetchPosts = () => {
      setLoading(true);
      axios
        .get(`${url}/ads/getPosts?page=${page}`)
        .then(({ data }) => {
          if (data.status === 'success' && data.data.length) {
            setPage((prevPage) => prevPage + 1);
            setPosts((prevPosts) => [...prevPosts, ...data.data]);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchPosts();
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current!);
    };
  }, [page]);

  return (
    <>
      <div className='px-8 mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-7 gap-x-4 lg:gap-x-6 xl:gap-y-8 xl:px-28'>
        {posts?.map((post) => (
          <AdItem
            key={post._id}
            _id={post._id}
            category={post.category}
            city={post.city}
            created={post.created}
            desc={post.desc}
            image={post.image}
            poster={post.poster}
            number={post.number}
            price={post.price}
            profile={post.profile}
            showNumber={post.showNumber}
          />
        ))}
      </div>
      <div className='flex justify-center mt-8' ref={loaderRef}>
        {loading && <Spinner className='h-8 w-8'/>}
      </div>
    </>
  );
};

export default Ads;
