import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Alert } from 'flowbite-react';
import { HiHeart, HiOutlineHeart, HiInformationCircle } from 'react-icons/hi';

export default function FavouriteButton({ postId }) {
  const [isfavourite, setIsfavourite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate(); 

  useEffect(() => {
    
    
    const checkIffavourite = async () => {
      
      if (!currentUser) return;
     
      
      try {
        const res = await fetch(`/api/favourite/check/${postId}`);
        
        const data = await res.json();

        setIsfavourite(data.isFavourite);
      } catch (error) {
        console.log(error);
      }
    };
    checkIffavourite();
  }, [postId, currentUser]);

  const handlefavourite = async () => {
    if (!currentUser) {
      navigate('/sign-in');
      return;
    }

    if (isfavourite) {
      // Show alert when trying to add already favorited post
      setShowAlert(true);
      // Hide alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch('/api/favourite/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      });
      if (res.ok) {
        setIsfavourite(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavourite = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/favourite/remove/${postId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setIsfavourite(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {showAlert && (
        <Alert
          color="info"
          icon={HiInformationCircle}
          onDismiss={() => setShowAlert(false)}
          className="mb-3 animate-fadeIn"
        >
          <span className="font-medium">
            This post is already in your favorites!
          </span>
        </Alert>
      )}
      
      <Button
        onClick={isfavourite ? handleRemoveFavourite : handlefavourite}
        disabled={loading}
        color={isfavourite ? 'failure' : 'gray'}
        className="flex items-center gap-2 transition-all duration-300"
      >
        {isfavourite ? (
          <>
            <HiHeart className="w-5 h-5" />
            Remove from favourites
          </>
        ) : (
          <>
            <HiOutlineHeart className="w-5 h-5" />
            Add to favourites
          </>
        )}
      </Button>
    </div>
  );
}