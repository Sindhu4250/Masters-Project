import React from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Welcome Text */}
      <h1 className="text-2xl font-bold text-gray-700 mb-8">Hello, Welcome to Blog Canvas!</h1>

      {/* Form container */}
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Username Field */}
        <div className="mb-4">
          <Label htmlFor="username" value="Your Username" className="text-gray-700" />
          <TextInput
            id="username"
            type="text"
            placeholder="Enter your username"
            className="mt-2"
            required={true}
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <Label htmlFor="email" value="Your Email" className="text-gray-700" />
          <TextInput
            id="email"
            type="email"
            placeholder="Enter your email"
            className="mt-2"
            required={true}
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
            required={true}
          />
        </div>

        {/* Signup Button */}
        <Button type="submit" className="w-full bg-purple-700 text-white hover:bg-purple-800">
          Sign Up
        </Button>

         {/* Already have an account? */}
         <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/sign-in" className="text-purple-700 hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        
      </form>
    </div>
  );
}
