import React from 'react';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  

  
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);


  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchPost = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/post/getposts?postId=${postId}`);
            const data = await res.json();
            
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }
            
            if (res.ok && data.posts && data.posts[0]) {
                setPublishError(null);
                setFormData(data.posts[0]);
            } else {
                setPublishError('Post not found');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setPublishError('Error fetching post data');
        } finally {
            setLoading(false);
        }
    };

    if (postId) {
        fetchPost();
    }
}, [postId]);

  


  
  


  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );




    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
      
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add validation to ensure we have all required data
    if (!formData._id || !currentUser._id) {
        setPublishError('Unable to update post. Missing required data.');
        return;
    }

    try {
        const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        
        const data = await res.json();
        
        if (!res.ok) {
            setPublishError(data.message || 'Something went wrong updating the post');
            return;
        }

        setPublishError(null);
        navigate(`/post/${data.slug}`);
    } catch (error) {
        console.error('Update error:', error);
        setPublishError('Failed to update post. Please try again.');
    }
};

if (loading) {
  return (
    <div className="p-5 max-w-3xl mx-auto min-h-screen bg-gray-50 rounded-lg shadow-md">
      <div className="text-center">Loading post data...</div>
    </div>
  );
}
  
  return (
    <div className="p-5 max-w-3xl mx-auto min-h-screen bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-center text-4xl my-7 font-bold text-gray-800">Update Post</h1>
      <form className="flex flex-col gap-6"  onSubmit={handleSubmit}>
        {/* Title and Category Fields */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Post Title"
            required
            id="title"
            className="flex-1" 
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
           <option value='uncategorized'>All Categories</option>
                    <option value='food'>Food</option>
                    <option value='travel'>Travel</option>
                    <option value='technology'>Technology</option>
                    <option value='sports'>Sports</option>
                    <option value='music'>Music</option>
          </Select>
        </div>

        
        <div className="flex gap-4 items-center justify-between border-4 border-dashed border-indigo-400 p-3 rounded-md bg-indigo-50">
          <FileInput type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          <Button
            type="button"
            gradientMonochrome="teal"
            size="sm"
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )
        }

        
        <ReactQuill
          theme="snow"
          value={formData.content}
          placeholder="Write your post content here..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />

        
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          
        >
          Update
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
