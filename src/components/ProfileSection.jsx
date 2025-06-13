'use client';
import React, { useRef } from 'react';

const ProfileSection = ({ profile, onProfileChange }) => {
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Image file size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const result = e.target.result;
        if (!result) throw new Error('Failed to read image file');
        
        onProfileChange(prev => ({
          ...prev,
          image: {
            ...prev.image,
            src: result,
            size: prev.image.size || 32 // Maintain size if set
          }
        }));
      } catch (error) {
        console.error('Error processing image:', error);
        alert('Failed to process the image. Please try again with a different file.');
      }
    };

    reader.onerror = () => {
      console.error('Error reading file');
      alert('Error reading the file. Please try again.');
    };

    reader.readAsDataURL(file);
  };

  const handleInputChange = (field, subField, value) => {
    try {
      onProfileChange(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subField]: value
        }
      }));
    } catch (error) {
      console.error(`Error updating ${field} ${subField}:`, error);
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[90vw] max-w-[800px]">
      <div className="bg-transparent p-4">
        <div className="flex justify-start mb-4">
          <div className="relative">
            {profile.image.src ? (
              <img
                src={profile.image.src}
                alt="Profile"
                className="rounded-full object-cover border-4 border-white shadow-lg"
                style={{
                  width: `${profile.image.size}px`,
                  height: `${profile.image.size}px`
                }}
              />
            ) : (
              <div
                className="rounded-full bg-gray-300/50 border-4 border-dashed border-white/50 flex items-center justify-center"
                style={{
                  width: `${profile.image.size}px`,
                  height: `${profile.image.size}px`
                }}
                aria-label="Profile image placeholder"
              >
                <span className="text-white/60 text-xs text-center p-2">Upload Photo</span>
              </div>
            )}
            
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full text-sm transition-colors"
              title="Upload new image"
            >
              Change
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        <div className="space-y-2">
          <input
            type="text"
            value={profile.name.text}
            onChange={(e) => handleInputChange('name', 'text', e.target.value)}
            placeholder="Your Name"
            className={`w-full bg-transparent focus:outline-none focus:bg-white/20 rounded p-1 placeholder:text-gray-500/70 placeholder:italic text-${profile.name.textAlign}`}
            style={{
              fontSize: profile.name.fontSize,
              color: profile.name.fontColor,
              fontWeight: profile.name.fontWeight,
              fontFamily: profile.name.fontFamily
            }}
          />
          <input
            type="text"
            value={profile.profession.text}
            onChange={(e) => handleInputChange('profession', 'text', e.target.value)}
            placeholder="Your Profession"
            className={`w-full bg-transparent focus:outline-none focus:bg-white/20 rounded p-1 placeholder:text-gray-500/70 placeholder:italic text-${profile.profession.textAlign}`}
            style={{
              fontSize: profile.profession.fontSize,
              color: profile.profession.fontColor,
              fontWeight: profile.profession.fontWeight,
              fontFamily: profile.profession.fontFamily
            }}
          />
          <textarea
            value={profile.description.text}
            onChange={(e) => handleInputChange('description', 'text', e.target.value)}
            placeholder="A little bit about yourself..."
            className={`w-full bg-transparent focus:outline-none focus:bg-white/20 rounded p-1 resize-none placeholder:text-gray-500/70 placeholder:italic text-${profile.description.textAlign}`}
            rows="3"
            style={{
              fontSize: profile.description.fontSize,
              color: profile.description.fontColor,
              fontWeight: profile.description.fontWeight,
              fontFamily: profile.description.fontFamily
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;