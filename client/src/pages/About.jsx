import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { HiOutlineNewspaper, HiOutlineUserGroup, HiOutlineSearch, HiOutlineChatAlt2 } from 'react-icons/hi';
// import Header from '../components/Header';

export default function About() {
  const features = [
    {
      icon: <HiOutlineNewspaper className="h-6 w-6" />,
      title: "Easy to Use",
      description: "Simple and intuitive interface for reading and writing blogs"
    },
    {
      icon: <HiOutlineUserGroup className="h-6 w-6" />,
      title: "Free Access",
      description: "Read and share content without any subscription fees"
    },
    {
      icon: <HiOutlineSearch className="h-6 w-6" />,
      title: "Smart Search",
      description: "Find exactly what you're looking for with advanced filters"
    },
    {
      icon: <HiOutlineChatAlt2 className="h-6 w-6" />,
      title: "Active Discussions",
      description: "Engage in meaningful conversations through comments"
    }
  ];

  const categories = [
    { name: 'Technology', color: 'from-blue-400 to-blue-600' },
    { name: 'Travel', color: 'from-green-400 to-green-600' },
    { name: 'Food', color: 'from-orange-400 to-orange-600' },
    { name: 'Music', color: 'from-purple-400 to-purple-600' },
    { name: 'Sports', color: 'from-red-400 to-red-600' }
  ];

  return (
    <>
    {/* <Header /> */}
    <div className='relative bg-gray-50 dark:bg-gray-900'>
      {/* Hero Section - adjust z-index */}
      <div className='relative overflow-hidden bg-gradient-to-br from-teal-400 to-blue-500 py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-0'> {/* Change z-10 to z-0 */}
          <div className='text-center text-white'>
            <h1 className='text-4xl md:text-6xl font-bold mb-6'>
              Welcome to Blog Canvas
            </h1>
            <p className='text-xl md:text-2xl mb-8 text-teal-50'>
            Read engaging posts across various topics, 
            join the conversation through comments, and be part of our growing community of readers.            </p>
            <div className='flex gap-4 justify-center'>
              <Button gradientDuoTone='tealToBlue' size="xl" outline>
                <Link to='/search'>Explore Posts</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Lower the backdrop z-index */}
        <div className='absolute inset-0 bg-gradient-to-br from-teal-400/20 to-blue-500/20 backdrop-blur-sm -z-20'></div>
      </div>

      {/* Add Developer Section Here */}
      <div className='max-w-7xl mx-auto px-4 py-16'>
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-16'>
          <h2 className='text-3xl font-bold mb-6 text-center'>Meet the Developer</h2>
          <div className='max-w-3xl mx-auto'>
            <p className='text-gray-600 dark:text-gray-300 text-lg mb-4'>
              Hello! I'm <span className='font-semibold text-teal-600 dark:text-teal-400'>Sindhu Priya</span>, 
              a Masters student in Information Technology with a passion for web development and innovative solutions.
            </p>
            <p className='text-gray-600 dark:text-gray-300 text-lg mb-4'>
              Blog Canvas is my masters project, showcasing the implementation of modern web development technologies 
              using the MERN (MongoDB, Express.js, React, Node.js) stack. This platform demonstrates my expertise in 
              full-stack development, from database design to user interface implementation.
            </p>
            <p className='text-gray-600 dark:text-gray-300 text-lg'>
              Through this project, I aim to create a robust and user-friendly blogging platform that not only serves 
              as a testament to my technical skills but also provides valuable features for content creators and readers alike.
            </p>
          </div>
        </div>
      </div>

      <div className='relative z-0'>
      {/* Features Section */}
      <div className='max-w-7xl mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <div key={index} className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow'>
              <div className='text-teal-500 dark:text-teal-400 mb-4'>
                {feature.icon}
              </div>
              <h3 className='text-lg font-semibold mb-2'>{feature.title}</h3>
              <p className='text-gray-600 dark:text-gray-400'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>


      {/* Call to Action */}
      <div className='bg-gradient-to-br from-teal-400 to-blue-500 py-16'>
        <div className='max-w-7xl mx-auto px-4 text-center text-white'>
          <h2 className='text-3xl font-bold mb-4'>Ready to Start Your Journey?</h2>
          <p className='text-xl mb-8 text-teal-50'>
            Join our growing community of writers and readers today.
          </p>
          <div className='flex gap-6 justify-center'>
            <Button gradientDuoTone='tealToBlue' size="xl" outline>
              <Link to='/sign-in'>Sign In</Link>
            </Button>
            <Button gradientDuoTone='tealToBlue' size="xl" outline>
              <Link to='/sign-up'>Create Account</Link>
            </Button>
          </div>
        </div>
      </div>

      
    </div>
    </div>
    </>
  );
}