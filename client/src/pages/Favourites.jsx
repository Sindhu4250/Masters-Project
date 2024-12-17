import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
// import Header from '../components/Header';

export default function favourites() {
  const [favourites, setfavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchfavourites = async () => {
      try {
        const res = await fetch('/api/favourite/get');
        const data = await res.json();
        if (res.ok) {
          setfavourites(data); // Ensure data structure matches expectations
        } else {
          console.log(data.message); // Log backend error messages
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (currentUser) {
      fetchfavourites();
    }
  }, [currentUser]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <>
    {/* <Header /> */}
    <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8">
      <h1 className="text-3xl font-semibold text-center my-8">Your favourite Posts</h1>
      {favourites.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 mb-4">You haven't added any posts to favourites yet.</p>
          <Link to="/search" className="text-blue-500 hover:underline">
            Explore posts
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favourites.map((favourite) => (
            <PostCard key={favourite._id} post={favourite.post} />
          ))}
        </div>
      )}
    </div>
    </>
  );
}
