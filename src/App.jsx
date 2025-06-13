// src/App.jsx
'use client';
import { useState, useEffect } from 'react';
import BackgroundCustomizer from './components/BackgroundCustomizer';
import ProfileSection from './components/ProfileSection';
import SocialLinks from './components/SocialLinks';

function App() {
  // State for background
  const [background, setBackground] = useState(() => {
    try {
      const savedBackground = localStorage.getItem('userBackground');
      if (savedBackground) return JSON.parse(savedBackground);
    } catch (error) {
      console.error("Failed to parse background from localStorage", error);
    }
    return { type: 'solid', color: '#e5e7eb', gradient: { angle: 90, colors: ['#74EBD5', '#ACB6E5'] }, image: '', pattern: 'none', patternOpacity: 50 };
  });

  // State for social links
  const [socialLinks, setSocialLinks] = useState(() => {
    try {
      const savedLinks = localStorage.getItem('userSocialLinks');
      if (savedLinks) return JSON.parse(savedLinks);
    } catch (error) {
      console.error("Failed to parse social links from localStorage", error);
    }
    return { x: '', instagram: '', youtube: '', facebook: '', tiktok: '', discord: '' };
  });

  // --- THE FINAL, ARMORED FIX IS HERE ---
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
        
        // This is the new, more robust merging logic.
        // It explicitly checks if the saved `image` is an object before spreading it.
        const safeImage = typeof parsed.image === 'object' && parsed.image !== null ? parsed.image : {};

        return {
          ...defaultProfile,
          ...parsed,
          image: { ...defaultProfile.image, ...safeImage }, // This line is now crash-proof
          name: { ...defaultProfile.name, ...(parsed.name || {}) },
          profession: { ...defaultProfile.profession, ...(parsed.profession || {}) },
          description: { ...defaultProfile.description, ...(parsed.description || {}) },
        };
      }
    } catch (error) {
      console.error("Failed to parse profile from localStorage", error);
    }
    return defaultProfile;
  });

  // useEffects for saving data
  useEffect(() => { localStorage.setItem('userBackground', JSON.stringify(background)); }, [background]);
  useEffect(() => { localStorage.setItem('userSocialLinks', JSON.stringify(socialLinks)); }, [socialLinks]);
  useEffect(() => { localStorage.setItem('profile', JSON.stringify(profile)); }, [profile]);

  // State handlers
  const handleSocialLinkChange = (platform, url) => setSocialLinks(prev => ({ ...prev, [platform]: url }));
  const handleProfileChange = (updater) => setProfile(updater);

  // Background style function
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
    <div className="min-h-screen w-full" style={getBackgroundStyle()}>
      <BackgroundCustomizer
        background={background}
        onBackgroundChange={setBackground}
        socialLinks={socialLinks}
        onLinkChange={handleSocialLinkChange}
        profile={profile}
        onProfileChange={handleProfileChange}
      />
      <ProfileSection 
        profile={profile}
        onProfileChange={handleProfileChange}
      />
      <SocialLinks socialLinks={socialLinks} />
    </div>
  );
}

export default App;