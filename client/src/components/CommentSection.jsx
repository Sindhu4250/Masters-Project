import { Alert, Button, TextInput, Textarea } from 'flowbite-react';
import { set } from 'mongoose';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };
  return (
    
        <div className="max-w-2xl mx-auto w-full p-4">
          {/* User Info Section */}
          {currentUser ? (
            <div className="flex items-center gap-3 mb-6 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3 flex-1">
                <img
                  className="h-8 w-8 object-cover rounded-full ring-2 ring-slate-100 dark:ring-slate-700"
                  src={currentUser.profilePicture}
                  alt={currentUser.username}
                />
                <div className="flex flex-col">
                  <a
                    href="/dashboard?tab=profile"
                    className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    @{currentUser.username}
                  </a>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Verified User
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg flex items-center justify-between">
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Sign in to post a comment
              </p>
              <a
                href="/sign-in"
                className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Sign In
              </a>
            </div>
          )}
    
          {/* Comment Form */}
          {currentUser && (
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
              <form onSubmit={handleSubmit} className="p-4">
                <div className="relative">
                  <Textarea
                    placeholder="Add a comment..."
                    rows="3"
                    maxLength="200"
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 resize-none"
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                    {comment.length}/200
                  </div>
                </div>
    
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    <span className="text-xs">
                      {200 - comment.length} characters left
                    </span>
                  </div>
    
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-sm font-medium rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    Post Comment
                  </button>
                </div>
    
                {commentError && (
                  <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 text-sm">
                    {commentError}
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      );
    };

  