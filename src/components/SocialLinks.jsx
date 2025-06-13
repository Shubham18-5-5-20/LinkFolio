// src/components/SocialLinks.jsx
'use client';
import React, { useState, useEffect, useRef } from 'react';

// Using fa6 for the latest icons, and fi for the repeat icon
import { FaXTwitter, FaInstagram, FaYoutube, FaFacebook, FaTiktok, FaDiscord, FaPalette } from 'react-icons/fa6';
import { FiRepeat } from 'react-icons/fi';

const SocialLinks = ({ socialLinks }) => {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('socialLinksSettings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return {
      position: { x: window.innerWidth - 80, y: window.innerHeight / 2 - 150 },
      orientation: 'vertical',
      size: 40,
      iconColor: '#ffffff'
    };
  });

  const dragInfo = useRef(null);
  const colorPickerRef = useRef(null);

  const socialPlatforms = [
    { id: 'x', Icon: FaXTwitter, name: 'X / Twitter' },
    { id: 'instagram', Icon: FaInstagram, name: 'Instagram' },
    { id: 'youtube', Icon: FaYoutube, name: 'YouTube' },
    { id: 'facebook', Icon: FaFacebook, name: 'Facebook' },
    { id: 'tiktok', Icon: FaTiktok, name: 'TikTok' },
    { id: 'discord', Icon: FaDiscord, name: 'Discord' }
  ];

  useEffect(() => {
    localStorage.setItem('socialLinksSettings', JSON.stringify(settings));
  }, [settings]);

  // Drag logic remains unchanged and correct
  const handleMouseDown = (e) => {
    e.preventDefault();
    dragInfo.current = { startX: e.clientX, startY: e.clientY, initialX: settings.position.x, initialY: settings.position.y };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!dragInfo.current) return;
    const dx = e.clientX - dragInfo.current.startX;
    const dy = e.clientY - dragInfo.current.startY;
    setSettings(prev => ({ ...prev, position: { x: dragInfo.current.initialX + dx, y: dragInfo.current.initialY + dy } }));
  };

  const handleMouseUp = () => {
    dragInfo.current = null;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  // --- NEW: RESIZE LOGIC USING MOUSE WHEEL ---
  const handleWheelResize = (e) => {
    // Prevent the entire page from scrolling
    e.preventDefault();
    
    // e.deltaY is negative when scrolling up (zoom in), positive when scrolling down (zoom out)
    const newSize = settings.size - (e.deltaY / 50); // Divide by 50 for smoother scaling
    
    // Set boundaries for the size
    const MIN_SIZE = 24;
    const MAX_SIZE = 72;
    const clampedSize = Math.max(MIN_SIZE, Math.min(MAX_SIZE, newSize));

    setSettings(prev => ({
      ...prev,
      size: clampedSize
    }));
  };
  // --- END OF NEW RESIZE LOGIC ---

  const handleColorChange = (color) => {
    setSettings(prev => ({ ...prev, iconColor: color }));
  };

  const toggleOrientation = () => {
    setSettings(prev => ({ ...prev, orientation: prev.orientation === 'vertical' ? 'horizontal' : 'vertical' }));
  };

  return (
    <div 
      className="fixed group cursor-grab z-40 p-3 bg-black/40 backdrop-blur-sm rounded-2xl shadow-lg"
      style={{ transform: `translate(${settings.position.x}px, ${settings.position.y}px)` }}
      onMouseDown={handleMouseDown}
      // Add the onWheel event handler here
      onWheel={handleWheelResize}
    >
      <div 
        className={`flex gap-4 items-center transition-all duration-300 ${
          settings.orientation === 'vertical' ? 'flex-col' : 'flex-row'
        }`}
      >
        {socialPlatforms.map((platform) => {
          const url = socialLinks[platform.id];
          if (!url) return null;
          
          return (
            <a
              key={platform.id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <platform.Icon 
                size={settings.size} 
                color={settings.iconColor}
                style={{ transition: 'color 0.2s ease, font-size 0.2s ease' }}
              />
            </a>
          );
        })}
      </div>

      {/* Control buttons */}
      <button
        onClick={() => colorPickerRef.current.click()}
        onMouseDown={(e) => e.stopPropagation()}
        className="absolute -top-3 -right-3 bg-white text-black p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-gray-200"
        title="Change Icon Color"
      >
        <FaPalette size={16} />
      </button>

      <input
        ref={colorPickerRef}
        type="color"
        value={settings.iconColor}
        onChange={(e) => handleColorChange(e.target.value)}
        className="hidden"
        onMouseDown={(e) => e.stopPropagation()}
      />

      <button
        onClick={toggleOrientation}
        onMouseDown={(e) => e.stopPropagation()}
        className="absolute -bottom-3 -right-3 bg-white text-black p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-gray-200"
        title="Change Axis"
      >
        <FiRepeat size={16} />
      </button>

      {/* Size indicator now appears on any hover, providing feedback during resize */}
      <div className="absolute bottom-full right-0 mb-2 bg-black/70 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
        Size: {Math.round(settings.size)}px
      </div>
    </div>
  );
};

export default SocialLinks;