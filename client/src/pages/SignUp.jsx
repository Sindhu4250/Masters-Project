import React from 'react';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import OAuth from '../components/OAuth';
import { useSelector } from 'react-redux';  // Import useSelector to access the theme state

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const { theme } = useSelector((state) => state.theme);  // Access the theme state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');  
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Welcome Text */}
      <h1 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-700'}`}>
        Hello, Welcome to Blog Canvas!
      </h1>

      {/* Form container */}
      <form
        className={`p-6 rounded-lg shadow-lg w-full max-w-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}
        onSubmit={handleSubmit}
      >
        {/* Username Field */}
        <div className="mb-4">
          <Label htmlFor="username" value="Your Username" className="text-gray-700 dark:text-gray-200" />
          <TextInput
            id="username"
            type="text"
            placeholder="Enter your username"
            className="mt-2"
            onChange={handleChange}
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <Label htmlFor="email" value="Your Email" className="text-gray-700 dark:text-gray-200" />
          <TextInput
            id="email"
            type="email"
            placeholder="Enter your email"
            className="mt-2"
            onChange={handleChange}
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <Label htmlFor="password" value="Your Password" className="text-gray-700 dark:text-gray-200" />
          <TextInput
            id="password"
            type="password"
            placeholder="Enter your password"
            className="mt-2"
            onChange={handleChange}
          />
        </div>

        {/* Signup Button */}
        <Button type="submit" className="w-full bg-purple-700 text-white hover:bg-purple-800" disabled={loading}>
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">Loading...</span>
            </>
          ) : (
            'Sign Up'
          )}
        </Button>
        <OAuth />

        {/* Already have an account? */}
        <div className="mt-4 text-center">
          <p className={`text-${theme === 'dark' ? 'gray-400' : 'gray-600'}`}>
            Already have an account?{' '}
            <Link to="/sign-in" className="text-orange-500 hover:underline">
              Log In
            </Link>
          </p>
        </div>
        {errorMessage && (
          <Alert className="mt-5" color="failure">
            {errorMessage}
          </Alert>
        )}
      </form>
    </div>
  );
}
