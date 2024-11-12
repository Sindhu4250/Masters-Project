import React from 'react';
import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className="p-5 max-w-3xl mx-auto min-h-screen bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-center text-4xl my-7 font-bold text-gray-800">Create a Post</h1>
      <form className="flex flex-col gap-6">
        {/* Title and Category Fields */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Post Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a Category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>

        
        <div className="flex gap-4 items-center justify-between border-4 border-dashed border-indigo-400 p-3 rounded-md bg-indigo-50">
          <FileInput type="file" accept="image/*" className="bg-white rounded-md border-none shadow-md" />
          <Button
            type="button"
            gradientMonochrome="teal"
            size="sm"
        
            
          >
            Upload Image
          </Button>
        </div>

        
        <ReactQuill
          theme="snow"
          placeholder="Write your post content here..."
          className="h-72 mb-12"
          required
        />

        
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          
        >
          Publish
        </Button>
      </form>
    </div>
  );
}
