import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai'; 
import { FaMoon, FaSun } from 'react-icons/fa';
import './Header.css'
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';


export default function Header() {
    const path = useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { theme } = useSelector((state) => state.theme);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

    const handleSignout = async () => {
      try {
        const res = await fetch('/api/user/signout', {
          method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signoutSuccess());
          
          navigate('/sign-in');

        }
        
      } catch (error) {
        console.log(error.message);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('searchTerm', searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    };

  return (
    <Navbar className='border-b-2'>
      {/* Logo section */}
      <div className="flex justify-between items-center w-full">
        <Link to="/" className="flex items-center whitespace-nowrap text-sm sm:text-xl font-semibold">
          <span className="self-center text-3xl font-bold whitespace-nowrap text-indigo-600">
            <span className="bg-green-700 text-white px-2 py-1 rounded-xl">Blog Canvas</span>
          </span>
        </Link>
      <form onSubmit={handleSubmit}>
            <TextInput
                type="text"
                placeholder="Search..."
                rightIcon={AiOutlineSearch}
                className='hidden lg:inline'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </form>
        
        <Button className='w-12 h-9 lg:hidden' color='gray' pill>
            <AiOutlineSearch />
        </Button>
        <div className="headerNavBar" >
            <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={'div'}>
                    <Link to='/'>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={'div'}>
                    <Link to='/about'>
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/favourites"} as={'div'}>
  <Link to='/favourites'>
    Favourites
  </Link>
</Navbar.Link>
    
            </Navbar.Collapse>
        </div>
        <div className='flex gap-2 md:order-2'>

            <Button className='w-12 h-9 hidden sm:inline' color='gray' pill 
              onClick={() => dispatch(toggleTheme())}
              >
                {theme === 'light' ? <FaSun /> : <FaMoon />}
                

            </Button>
            {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Log out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button className=" bg-purple-700 text-white rounded-xl">Sign In</Button>
          </Link>
        )}
            
        </div>
        <Navbar.Toggle />       
        

      </div>
      

    </Navbar>
  );
}
