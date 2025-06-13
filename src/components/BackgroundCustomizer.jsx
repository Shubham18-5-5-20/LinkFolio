// src/components/BackgroundCustomizer.jsx
'use client';
import React from 'react';

const BackgroundCustomizer = ({ background, onBackgroundChange, socialLinks, onLinkChange, profile, onProfileChange }) => {

  // Handlers for all state changes, passed from App.jsx
  const handleProfileImageChange = (property, value) => {
    onProfileChange(prev => ({ ...prev, image: { ...prev.image, [property]: value } }));
  };

  const handleTextChange = (field, property, value) => {
    onProfileChange(prev => ({ ...prev, [field]: { ...prev[field], [property]: value } }));
  };

  const handleTypeChange = (type) => onBackgroundChange(prev => ({ ...prev, type }));
  const handleSettingChange = (setting, value) => onBackgroundChange(prev => ({ ...prev, [setting]: value }));
  const handleGradientChange = (property, value) => onBackgroundChange(prev => ({ ...prev, gradient: { ...prev.gradient, [property]: value } }));
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => onBackgroundChange(prev => ({ ...prev, type: 'image', image: e.target.result }));
      reader.readAsDataURL(file);
    }
  };
  const handlePatternChange = (pattern) => onBackgroundChange(prev => ({ ...prev, pattern }));
  const handlePatternOpacityChange = (opacity) => onBackgroundChange(prev => ({ ...prev, patternOpacity: opacity }));
  
  // Data arrays for mapping over UI elements
  const socialPlatformsForEditing = [ { id: 'x', name: 'X / Twitter' }, { id: 'instagram', name: 'Instagram' }, { id: 'youtube', name: 'YouTube' }, { id: 'facebook', name: 'Facebook' }, { id: 'tiktok', name: 'TikTok' }, { id: 'discord', name: 'Discord' } ];
  const patterns = [ { id: 'none', name: 'None' }, { id: 'dots', name: 'Dots' }, { id: 'stripes', name: 'Stripes' }, { id: 'chevron', name: 'Chevron' }, { id: 'zigzag', name: 'Zigzag' } ];

  return (
    <div className="fixed top-4 left-4 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-xl z-50 w-80 max-h-[95vh] overflow-y-auto">
      <div className="space-y-4">
        
        {/* --- SECTION 1: BACKGROUND (RESTORED) --- */}
        <details open>
          <summary className="font-bold cursor-pointer">Background</summary>
          <div className="pt-2 space-y-3">
            <div className="flex gap-2">
              {['solid', 'gradient', 'image'].map(type => (
                <button key={type} className={`px-3 py-1 text-sm rounded transition-all ${background.type === type ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => handleTypeChange(type)}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
            {background.type === 'solid' && ( <input type="color" value={background.color} onChange={(e) => handleSettingChange('color', e.target.value)} className="w-full h-10 rounded cursor-pointer border border-gray-300" /> )}
            {background.type === 'gradient' && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input type="color" value={background.gradient.colors[0]} onChange={(e) => handleGradientChange('colors', [e.target.value, background.gradient.colors[1]])} className="w-1/2 h-10 rounded cursor-pointer border border-gray-300" />
                  <input type="color" value={background.gradient.colors[1]} onChange={(e) => handleGradientChange('colors', [background.gradient.colors[0], e.target.value])} className="w-1/2 h-10 rounded cursor-pointer border border-gray-300" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs">Angle: {background.gradient.angle}°</label>
                  <input type="range" min="0" max="360" value={background.gradient.angle} onChange={(e) => handleGradientChange('angle', parseInt(e.target.value))} className="w-full" />
                </div>
              </div>
            )}
            {background.type === 'image' && ( <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm border border-gray-300 rounded p-2" /> )}
            <div className="pt-2 border-t space-y-2">
              <label className="text-sm font-semibold">Pattern Overlay</label>
              <select value={background.pattern || 'none'} onChange={(e) => handlePatternChange(e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm bg-white">
                {patterns.map(pattern => ( <option key={pattern.id} value={pattern.id}>{pattern.name}</option>))}
              </select>
            </div>
            {background.pattern && background.pattern !== 'none' && (
              <div className="space-y-2">
                <label className="text-sm font-semibold">Pattern Opacity: {background.patternOpacity}%</label>
                <input type="range" min="0" max="100" value={background.patternOpacity} onChange={(e) => handlePatternOpacityChange(parseInt(e.target.value))} className="w-full" />
              </div>
            )}
          </div>
        </details>

        {/* --- SECTION 2: PROFILE PICTURE --- */}
        <details className="border-t pt-3" open>
          <summary className="font-bold cursor-pointer">Profile Picture</summary>
          <div className="pt-2 space-y-2">
            <label className="text-sm font-semibold">Size: {profile.image.size}px</label>
            <input type="range" min="64" max="256" value={profile.image.size} onChange={(e) => handleProfileImageChange('size', parseInt(e.target.value))} className="w-full" />
          </div>
        </details>

        {/* --- SECTION 3: TEXT STYLING --- */}
        <details className="border-t pt-3" open>
          <summary className="font-bold cursor-pointer">Text Styling</summary>
          <div className="pt-2 space-y-3">
            {['name', 'profession', 'description'].map(field => (
              <div key={field} className="space-y-3 border-b pb-3 last:border-b-0">
                <h4 className="text-sm font-semibold capitalize">{field}</h4>
                <div>
                  <label className="text-xs">Alignment</label>
                  <div className="flex bg-gray-200 rounded-md p-1 mt-1">
                    {['left', 'center', 'right'].map(align => (
                      <button key={align} onClick={() => handleTextChange(field, 'textAlign', align)} className={`w-full text-xs capitalize rounded-sm py-1 transition-colors ${profile[field].textAlign === align ? 'bg-white text-blue-600 shadow-sm' : 'bg-transparent text-gray-600'}`}>
                        {align}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select value={profile[field].fontFamily} onChange={(e) => handleTextChange(field, 'fontFamily', e.target.value)} className="col-span-2 p-1 border border-gray-300 rounded text-sm bg-white">
                    {['Inter', 'Arial', 'Helvetica', 'Times New Roman', 'Georgia'].map(font => ( <option key={font} value={font}>{font}</option> ))}
                  </select>
                  <select value={profile[field].fontWeight} onChange={(e) => handleTextChange(field, 'fontWeight', e.target.value)} className="p-1 border border-gray-300 rounded text-sm bg-white">
                    <option value="normal">Normal</option><option value="bold">Bold</option>
                  </select>
                  <select value={profile[field].fontStyle} onChange={(e) => handleTextChange(field, 'fontStyle', e.target.value)} className="p-1 border border-gray-300 rounded text-sm bg-white">
                    <option value="normal">Normal</option><option value="italic">Italic</option>
                  </select>
                  <div className="flex items-center gap-2 col-span-2">
                    <label className="text-xs">Size:</label>
                    <input type="range" min="12" max="48" value={parseInt(profile[field].fontSize)} onChange={(e) => handleTextChange(field, 'fontSize', `${e.target.value}px`)} className="flex-1"/>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <label className="text-xs">Color:</label>
                    <input type="color" value={profile[field].fontColor} onChange={(e) => handleTextChange(field, 'fontColor', e.target.value)} className="w-full h-8 rounded border border-gray-300"/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </details>

        {/* --- SECTION 4: SOCIAL LINKS (RESTORED) --- */}
        <details className="border-t pt-3">
          <summary className="font-bold cursor-pointer">Social Links</summary>
          <div className="pt-2 space-y-3">
            {socialPlatformsForEditing.map((platform) => (
              <div key={platform.id}>
                <label className="text-xs font-semibold">{platform.name}</label>
                <input type="url" placeholder="Paste your link here..." value={socialLinks[platform.id]} onChange={(e) => onLinkChange(platform.id, e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm bg-white" />
              </div>
            ))}
          </div>
        </details>
        
      </div>
    </div>
  );
};

export default BackgroundCustomizer;