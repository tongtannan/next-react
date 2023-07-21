/*
 * @Author: tongtannan 13352424428@163.com
 * @Description: 首页
 */
import { useState } from 'react';
import dynamic from 'next/dynamic';

// import '../styles/globals.css';
import { login, getQARules, createBlog } from '../api/test';

const Blog = dynamic(() => import('@/components/Blog'));

export async function getServerSideProps(context) {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(null);
    }, 1000 * 0.1);
  });
  const [err, data] = await getQARules({
    query: {
      pageIndex: 0,
      pageSize: 10
    }
  });

  return {
    props: {
      blogList: data?.blogList || []
    }
  };
}

export default function Page({ blogList }) {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleCreateBlog = async () => {
    if (!value) {
    }
    const [err, data] = await createBlog({
      body: {
        content: value
      }
    });
    console.log(err, data);
  };

  const handleSwitchBlogList = () => {
    setShow(!show);
  };

  return (
    <div>
      <button onClick={handleCreateBlog}>发布blog</button>
      <input type='text' value={value} onChange={handleChange} />
      <h5>blog list</h5>
      <button onClick={handleSwitchBlogList}>show blog list</button>
      {show && <Blog blogs={blogList} />}
    </div>
  );
}
