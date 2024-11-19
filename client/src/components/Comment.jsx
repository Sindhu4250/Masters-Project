import React from 'react'
import moment from 'moment';
import { useEffect, useState } from 'react';

export default function Comment({ comment }) {
  const [user, setUser] = useState({});
  console.log(user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);
  return (
    <div className="flex gap-4 p-5 border-b dark:border-gray-600/50">
      {/* User Avatar */}
      <div className="flex-shrink-0">
        <img
          className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-700"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>

      {/* Comment Content */}
      <div className="flex-1 space-y-2">
        {/* User Info & Time */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">
              {user ? `@${user.username}` : 'anonymous user'}
            </span>
            {user?.isAdmin && (
              <span className="px-2 py-0.5 text-[10px] font-medium bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                Admin
              </span>
            )}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">•</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>

        {/* Comment Text */}
        <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {comment.content}
        </div>
      </div>
    </div>
  );
}