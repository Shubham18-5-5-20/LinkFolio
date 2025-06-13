// src/App.jsx
'use client';
import { useState, useEffect } from 'react';
import BackgroundCustomizer from './components/BackgroundCustomizer';
import ProfileSection from './components/ProfileSection';
import SocialLinks from './components/SocialLinks';
import { FiSettings, FiX } from 'react-icons/fi'; // Import icons for the buttons

function App() {
  // --- CHANGE IS HERE: State to manage panel visibility ---
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  // All existing state and handlers remain unchanged
  const [background, setBackground] = useState(() => {
    const savedBackground = localStorage.getItem('userBackground');
    if (savedBackground) return JSON.parse(savedBackground);
    return { type: 'solid', color: '#e5e7eb', gradient: { angle: 90, colors: ['#74EBD5', '#ACB6E5'] }, image: '', pattern: 'none', patternOpacity: 50 };
  });

  const [socialLinks, setSocialLinks] = useState(() => {
    const savedLinks = localStorage.getItem('userSocialLinks');
    return savedLinks ? JSON.parse(savedLinks) : { x: '', instagram: '', youtube: '', facebook: '', tiktok: '', discord: '' };
  });

  const [profile, setProfile] = useState(() => {
    const defaultProfile = {
      image: { src: '', size: 128 },
      name: { text: 'Your Name', fontStyle: 'normal', fontSize: '24px', fontColor: '#1F2937', fontWeight: 'bold', fontFamily: 'Arial', textAlign: 'left' },
      profession: { text: 'Your Profession', fontStyle: 'normal', fontSize: '18px', fontColor: '#374151', fontWeight: 'normal', fontFamily: 'Arial', textAlign: 'left' },
      description: { text: 'A little bit about yourself.', fontStyle: 'normal', fontSize: '16px', fontColor: '#6B7280', fontWeight: 'normal', fontFamily: 'Arial', textAlign: 'left' }
    };
    try {
      const savedProfile = localStorage.getItem('profile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        const safeImage = typeof parsed.image === 'object' && parsed.image !== null ? parsed.image : {};
        return {
          ...defaultProfile, ...parsed,
          image: { ...defaultProfile.image, ...safeImage },
          name: { ...defaultProfile.name, ...(parsed.name || {}) },
          profession: { ...defaultProfile.profession, ...(parsed.profession || {}) },
          description: { ...defaultProfile.description, ...(parsed.description || {}) },
        };
      }
    } catch (error) { console.error("Failed to parse profile from localStorage", error); }
    return defaultProfile;
  });

  useEffect(() => { localStorage.setItem('userBackground', JSON.stringify(background)); }, [background]);
  useEffect(() => { localStorage.setItem('userSocialLinks', JSON.stringify(socialLinks)); }, [socialLinks]);
  useEffect(() => { localStorage.setItem('profile', JSON.stringify(profile)); }, [profile]);

  const handleSocialLinkChange = (platform, url) => setSocialLinks(prev => ({ ...prev, [platform]: url }));
  const handleProfileChange = (updater) => setProfile(updater);

  const getBackgroundStyle = () => {
    let baseBackground = '';
    if (background.type === 'solid') baseBackground = background.color;
    else if (background.type === 'gradient') baseBackground = `linear-gradient(${background.gradient.angle}deg, ${background.gradient.colors[0]}, ${background.gradient.colors[1]})`;
    else if (background.type === 'image') baseBackground = `url(${background.image})`;
    const opacity = (background.patternOpacity || 50) / 100;
    const patternStyles = {
      dots: `radial-gradient(rgba(0,0,0,${opacity}) 1px, transparent 1px)`,
      stripes: `repeating-linear-gradient(45deg, rgba(0,0,0,${opacity}), rgba(0,0,0,${opacity}) 10px, transparent 10px, transparent 20px)`,
      chevron: `repeating-linear-gradient(135deg, rgba(0,0,0,${opacity}) 0, rgba(0,0,0,${opacity}) 10px, transparent 10px, transparent 20px)`,
      zigzag: `repeating-linear-gradient(45deg, rgba(0,0,0,${opacity}) 0 10px, transparent 10px 20px), repeating-linear-gradient(-45deg, rgba(0,0,0,${opacity}) 0 10px, transparent 10px 20px)`,
    };
    const patternImage = background.pattern && background.pattern !== 'none' ? patternStyles[background.pattern] : null;
    const finalStyle = {
      backgroundSize: background.type === 'image' ? 'cover' : (background.pattern === 'dots' ? '15px 15px' : undefined),
      backgroundPosition: 'center',
    };
    const imageLayers = [];
    if (patternImage) imageLayers.push(patternImage);
    if (baseBackground && background.type !== 'solid') imageLayers.push(baseBackground);
    if (imageLayers.length > 0) finalStyle.backgroundImage = imageLayers.join(', ');
    if (background.type === 'solid') finalStyle.backgroundColor = baseBackground;
    return finalStyle;
  };

  return (
    <div className="min-h-screen w-full font-sans" style={getBackgroundStyle()}>
      
      {/* --- CHANGE IS HERE: Wrapper for the control panel --- */}
      {/* This div handles the sliding transition based on `isPanelVisible` */}
      {/* On medium screens and up (md:), it is always visible and translated */}
      <div className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out 
        ${isPanelVisible ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0`
      }>
        <BackgroundCustomizer
          background={background}
          onBackgroundChange={setBackground}
          socialLinks={socialLinks}
          onLinkChange={handleSocialLinkChange}
          profile={profile}
          onProfileChange={handleProfileChange}
          // Pass the setter down so the panel can close itself
          setIsPanelVisible={setIsPanelVisible}
        />
      </div>

      {/* --- CHANGE IS HERE: The "Settings" button --- */}
      {/* This button is only visible on small screens (md:hidden) */}
      <button 
        onClick={() => setIsPanelVisible(true)}
        className="md:hidden fixed top-4 right-4 z-40 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
        aria-label="Open settings panel"
      >
        <FiSettings size={24} />
      </button>

      {/* The main content now needs left padding on desktop to not be covered by the panel */}
      <div className="md:pl-80"> {/* 80 is the width of the panel (w-80 = 20rem = 320px) */}
        <ProfileSection 
          profile={profile}
          onProfileChange={handleProfileChange}
        />
      </div>

      <SocialLinks socialLinks={socialLinks} />
    </div>
  );
}

export default App;