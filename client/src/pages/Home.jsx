import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
// import Header from '../components/Header';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=6');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
    {/* <Header /> */}
    <div className='min-h-screen max-w-6xl mx-auto flex flex-col gap-8 p-3'>
      <div className='flex flex-col gap-6 py-20 px-4 max-w-6xl mx-auto'>
        <h1 className='text-2xl font-bold lg:text-5xl'>Welcome to Blog Canvas</h1>
        <p className='text-gray-500 text-sm sm:text-lg'>
        A dedicated space featuring carefully curated articles from our writers. 
        Read interesting articles and share your thoughts through comments.
        </p>
        <Link
          to='/search'
          className='text-sm sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>

      {/* Recent Posts Section */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8'>
        <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {posts.map((post) => (
            <div key={post._id} className='bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow'>
              <Link to={`/post/${post.slug}`}>
                <img 
                  src={post.image} 
                  alt={post.title}
                  className='w-full h-48 object-cover hover:scale-105 transition-transform duration-300'
                />
                <div className='p-4'>
                  <h3 className='font-semibold text-lg mb-2 line-clamp-2'>{post.title}</h3>
                  <span className='text-sm text-blue-500 bg-blue-100 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded-full'>
                    {post.category}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Link to='/search' className='text-center'>
          <Button gradientDuoTone='purpleToPink' outline>
            View all posts
          </Button>
        </Link>
      </div>
    </div>
    </>
  );
}