import React from 'react'
import { Link } from 'react-router-dom';
export default function PostCard({ post }) {
  
  if (post != null)
  {

    return (
        <div className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
  <Link to={`/post/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden">
    <img
      src={post.image}
      alt={post.title}
      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
    />
    {/* Category Badge */}
    <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-sm font-medium rounded-full">
      {post.category}
    </span>
  </Link>

  <div className="p-5">
    {/* Title and Excerpt */}
    <div className="mb-4">
      <Link to={`/post/${post.slug}`}>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>
      </Link>
      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
        {post.excerpt || 'Read this interesting article...'}
      </p>
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between mt-auto">
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {new Date(post.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        })}
      </span>
      <Link
        to={`/post/${post.slug}`}
        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
      >
        Read more →
      </Link>
    </div>
  </div>
  
  {/* Hover Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <div className="absolute bottom-0 left-0 right-0 p-5">
      <Link
        to={`/post/${post.slug}`}
        className="block w-full py-2 px-4 bg-white dark:bg-gray-800 text-center text-gray-900 dark:text-white font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        Read article
      </Link>
    </div>
  </div>
</div>
      );
    }
  }
