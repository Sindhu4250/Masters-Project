import React from 'react'
import { Sidebar } from 'flowbite-react';
import { 
  HiUser, 
  HiDocumentText, 
  HiUserGroup, 
  HiArrowSmRight,
  HiChevronRight,
  HiChat,
  HiTemplate
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  


  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
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
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full md:w-64 bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
      <div className="p-4">
        {/* User Profile Section */}
        <div className="mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4 px-2 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center shadow-inner">
              {/* <HiUser className="w-6 h-6 text-slate-600 dark:text-slate-300" /> */}
              <img
              src={currentUser.profilePicture}
              alt='user'
              className="rounded-full w-11 h-11 object-cover"
              // className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              //   imageFileUploadProgress &&
              //   imageFileUploadProgress < 100 &&
              //   'opacity-60'
              // }`} 
            />
            </div>
            <div className="flex flex-col">
              <p className="font-medium text-lg dark:text-white">{currentUser.username}</p>
              <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                {currentUser.isAdmin ? (
                  <>
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                    Administrator
                  </>
                ) : (
                  <>
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                    User
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
<nav className="space-y-2">
  {currentUser.isAdmin && (
    <>
      <a 
        href="/dashboard"
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          !tab
            ? 'bg-slate-100 dark:bg-slate-800 shadow-sm'
            : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
        }`}
      >
        <HiTemplate className={`w-5 h-5 ${
          !tab 
            ? 'text-blue-600 dark:text-blue-400' 
            : 'text-slate-600 dark:text-slate-400'
        }`} />
        <span className={!tab ? 'font-medium' : ''}>Dashboard</span>
      </a>

      <a 
        href="/dashboard?tab=profile"
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          tab === 'profile'
            ? 'bg-slate-100 dark:bg-slate-800 shadow-sm'
            : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
        }`}
      >
        <HiUser className={`w-5 h-5 ${
          tab === 'profile' 
            ? 'text-blue-600 dark:text-blue-400' 
            : 'text-slate-600 dark:text-slate-400'
        }`} />
        <span className={tab === 'profile' ? 'font-medium' : ''}>Profile</span>
      </a>

      <a 
        href="/dashboard?tab=posts"
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          tab === 'posts'
            ? 'bg-slate-100 dark:bg-slate-800 shadow-sm'
            : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
        }`}
      >
        <HiDocumentText className={`w-5 h-5 ${
          tab === 'posts' 
            ? 'text-blue-600 dark:text-blue-400' 
            : 'text-slate-600 dark:text-slate-400'
        }`} />
        <span className={tab === 'posts' ? 'font-medium' : ''}>Posts</span>
      </a>

      <a 
        href="/dashboard?tab=users"
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          tab === 'users'
            ? 'bg-slate-100 dark:bg-slate-800 shadow-sm'
            : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
        }`}
      >
        <HiUserGroup className={`w-5 h-5 ${
          tab === 'users' 
            ? 'text-blue-600 dark:text-blue-400' 
            : 'text-slate-600 dark:text-slate-400'
        }`} />
        <span className={tab === 'users' ? 'font-medium' : ''}>Users</span>
      </a>
      
      <a 
        href="/dashboard?tab=comments"
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          tab === 'comments'
            ? 'bg-slate-100 dark:bg-slate-800 shadow-sm'
            : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
        }`}
      >
        <HiChat className={`w-5 h-5 ${
          tab === 'comments' 
            ? 'text-blue-600 dark:text-blue-400' 
            : 'text-slate-600 dark:text-slate-400'
        }`} />
        <span className={tab === 'comments' ? 'font-medium' : ''}>Comments</span>
      </a>
    </>
  )}

  {/* If not admin, show only profile */}
  {!currentUser.isAdmin && (
    <a 
      href="/dashboard?tab=profile"
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        tab === 'profile'
          ? 'bg-slate-100 dark:bg-slate-800 shadow-sm'
          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
      }`}
    >
      <HiUser className={`w-5 h-5 ${
        tab === 'profile' 
          ? 'text-blue-600 dark:text-blue-400' 
          : 'text-slate-600 dark:text-slate-400'
      }`} />
      <span className={tab === 'profile' ? 'font-medium' : ''}>Profile</span>
    </a>
  )}

  {/* Sign Out Button */}
  <button
    onClick={handleSignout}
    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors mt-4"
  >
    <HiArrowSmRight className="w-5 h-5" />
    <span>Log Out</span>
  </button>
</nav>
      </div>
    </div>
  );
};
