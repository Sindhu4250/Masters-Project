import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { Button, Table } from 'flowbite-react';

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers?limit=5');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=5');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch('/api/comment/getcomments?limit=5');
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Users Stats Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Users</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{totalUsers}</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg">
                <HiOutlineUserGroup className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <HiArrowNarrowUp className="text-green-500 h-4 w-4 mr-1" />
              <span className="text-green-500 font-medium">{lastMonthUsers}</span>
              <span className="ml-2 text-gray-500 dark:text-gray-400">New this month</span>
            </div>
          </div>
        </div>

        {/* Posts Stats Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Posts</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{totalPosts}</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-lg">
                <HiDocumentText className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <HiArrowNarrowUp className="text-green-500 h-4 w-4 mr-1" />
              <span className="text-green-500 font-medium">{lastMonthPosts}</span>
              <span className="ml-2 text-gray-500 dark:text-gray-400">New this month</span>
            </div>
          </div>
        </div>

        {/* Comments Stats Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Comments</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{totalComments}</p>
              </div>
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-3 rounded-lg">
                <HiAnnotation className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <HiArrowNarrowUp className="text-green-500 h-4 w-4 mr-1" />
              <span className="text-green-500 font-medium">{lastMonthComments}</span>
              <span className="ml-2 text-gray-500 dark:text-gray-400">New this month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Users</h2>
            <Button size="sm" gradientDuoTone="purpleToBlue" outline>
              <a href="/dashboard?tab=users">View All</a>
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className="bg-gray-50 dark:bg-gray-700">User</Table.HeadCell>
                <Table.HeadCell className="bg-gray-50 dark:bg-gray-700">Username</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {users.map((user) => (
                  <Table.Row key={user._id} className="bg-white dark:bg-gray-800">
                    <Table.Cell>
                      <img src={user.profilePicture} alt={user.username} className="w-10 h-10 rounded-full object-cover" />
                    </Table.Cell>
                    <Table.Cell className="font-medium">{user.username}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Posts</h2>
            <Button size="sm" gradientDuoTone="purpleToBlue" outline>
              <a href="/dashboard?tab=posts">View All</a>
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className="bg-gray-50 dark:bg-gray-700">Post</Table.HeadCell>
                <Table.HeadCell className="bg-gray-50 dark:bg-gray-700">Title</Table.HeadCell>
                <Table.HeadCell className="bg-gray-50 dark:bg-gray-700">Category</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {posts.map((post) => (
                  <Table.Row key={post._id} className="bg-white dark:bg-gray-800">
                    <Table.Cell>
                      <img src={post.image} alt={post.title} className="w-16 h-10 rounded object-cover" />
                    </Table.Cell>
                    <Table.Cell className="font-medium truncate max-w-[200px]">{post.title}</Table.Cell>
                    <Table.Cell>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {post.category}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>

        {/* Recent Comments */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Comments</h2>
            <Button size="sm" gradientDuoTone="purpleToBlue" outline>
              <a href="/dashboard?tab=comments">View All</a>
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className="bg-gray-50 dark:bg-gray-700">Comment</Table.HeadCell>
                <Table.HeadCell className="bg-gray-50 dark:bg-gray-700">Likes</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {comments.map((comment) => (
                  <Table.Row key={comment._id} className="bg-white dark:bg-gray-800">
                    <Table.Cell className="max-w-[300px]">
                      <p className="truncate">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        {comment.numberOfLikes}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}