import React from 'react';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      
      if(res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));

    }
  };

 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Welcome Text */}
      <h1 className="text-2xl font-bold text-gray-700 mb-8">Hello, Welcome to Blog Canvas!</h1>

      {/* Form container */}
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
        

        {/* Email Field */}
        <div className="mb-4">
          <Label htmlFor="email" value="Your Email" className="text-gray-700" />
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
          <Label htmlFor="password" value="Your Password" className="text-gray-700" />
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
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
        </Button>
        <OAuth />

         {/* Already have an account? */}
         <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account yet?{' '}
            <Link to="/sign-up" className="text-orange-500 hover:underline">
              Sign Up
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
