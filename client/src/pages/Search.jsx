import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl || '',
        sort: sortFromUrl || 'desc',
        category: categoryFromUrl || 'uncategorized',
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Sidebar */}
          <div className='lg:w-1/4'>
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6'>
              <h2 className='text-xl font-bold mb-6 text-gray-800 dark:text-white'>Search Filters</h2>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Search Posts
                  </label>
                  <TextInput
                    type='text'
                    id='searchTerm'
                    placeholder='Type to search...'
                    value={sidebarData.searchTerm}
                    onChange={handleChange}
                    className='w-full'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Sort By
                  </label>
                  <Select
                    onChange={handleChange}
                    value={sidebarData.sort}
                    id='sort'
                    className='w-full'
                  >
                    <option value='desc'>Latest First</option>
                    <option value='asc'>Oldest First</option>
                  </Select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Category
                  </label>
                  <Select
                    onChange={handleChange}
                    value={sidebarData.category}
                    id='category'
                    className='w-full'
                  >
                    <option value='uncategorized'>All Categories</option>
                    <option value='food'>Food</option>
                    <option value='travel'>Travel</option>
                    <option value='technology'>Technology</option>
                    <option value='sports'>Sports</option>
                    <option value='music'>Music</option>
                  </Select>
                </div>

                <Button 
                  type='submit' 
                  gradientDuoTone='purpleToBlue'
                  className='w-full'
                >
                  Apply Filters
                </Button>
              </form>
            </div>
          </div>

          {/* Main Content */}
          <div className='lg:w-3/4'>
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6'>
              <h1 className='text-2xl font-bold mb-6 text-gray-800 dark:text-white'>
                Search Results
              </h1>
              
              {loading ? (
                <div className='flex items-center justify-center min-h-[400px]'>
                  <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
                </div>
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {posts.length === 0 ? (
                    <div className='col-span-2 text-center py-12'>
                      <p className='text-gray-500 dark:text-gray-400 text-lg'>
                        No posts found matching your criteria.
                      </p>
                    </div>
                  ) : (
                    posts.map((post) => (
                      <div key={post._id} className="transform transition duration-300 hover:scale-[1.02]">
                        <PostCard post={post} />
                      </div>
                    ))
                  )}
                </div>
              )}

              {showMore && (
                <div className='text-center mt-8'>
                  <Button
                    onClick={handleShowMore}
                    gradientDuoTone='purpleToBlue'
                    outline
                  >
                    Load More Posts
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}