'use client';
import { axiosInstance } from '@/lib/axios';
import React, { useEffect } from 'react';

const Page = () => {
  useEffect(() => {
    const get = async () => {
      try {
        const response = await axiosInstance
          .get('/user')
          .then((data) => data.data)
          .catch((e) => console.log(e));

        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    get();
  }, []);

  return <div></div>;
};

export default Page;
