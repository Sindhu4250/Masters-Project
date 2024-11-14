import React from 'react';
import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);
  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  return<main className="relative p-6 flex flex-col max-w-4xl mx-auto min-h-screen bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg">
  <div className="flex justify-start p-3 w-full max-w-2xl text-lg font-bold text-gray-800 dark:text-gray-300">
      <span>{post ? new Date(post.createdAt).toLocaleDateString() : ''}</span>
  </div>

  <h1 className="text-4xl mt-4 mb-4 px-4 text-center font-serif text-gray-800 dark:text-gray-100 max-w-2xl mx-auto lg:text-5xl">
      {post?.title}
  </h1>

  <Link
      to={`/search?category=${post?.category}`}
      className="self-center mt-4 mb-6"
  >
      <Button
          color="blue"
          pill
          size="sm"
          className="font-semibold shadow-md dark:bg-blue-600 dark:text-white"
      >
          {post?.category}
      </Button>
  </Link>

  <img
      src={post?.image}
      alt={post?.title}
      className="my-6 max-h-[300px] w-full object-cover rounded-lg shadow-md"
  />

  <div
      className="px-6 py-4 max-w-2xl mx-auto w-full text-gray-700 dark:text-gray-300 leading-relaxed post-content"
      dangerouslySetInnerHTML={{ __html: post?.content }}
  ></div>
</main>

;
}
