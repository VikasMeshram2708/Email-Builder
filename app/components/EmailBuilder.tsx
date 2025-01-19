"use client"

import Image from 'next/image';
import React, { useState } from 'react';
import { Download, Code, X } from 'lucide-react';

interface ContentState {
  title: string;
  description: string;
  logo: string | null;
  heroImage: string;
}

const EmailBuilder: React.FC = () => {
  const [content, setContent] = useState<ContentState>({
    title: 'Email has never been easier',
    description: 'Create beautiful and sophisticated emails in just minutes with minimal setup and maximum ease. The way email should truly be.',
    logo: null,
    heroImage: '/person-with-laptop.jpg'
  });
  
  const [showCode, setShowCode] = useState<boolean>(false);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent(prev => ({
          ...prev,
          logo: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeroImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent(prev => ({
          ...prev,
          heroImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContentEdit = (field: keyof ContentState, value: string) => {
    setContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateHTMLCode = (): string => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.title}</title>
  <style>
    body { margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .text-center { text-align: center; }
    img { max-width: 100%; height: auto; }
    .button { display: inline-block; padding: 10px 20px; margin: 10px; text-decoration: none; border-radius: 8px; }
    .primary-button { background: black; color: white; }
    .secondary-button { border: 2px solid black; color: black; }
  </style>
</head>
<body>
  <div class="container">
    ${content.logo ? `<div class="text-center"><img src="${content.logo}" alt="Logo" style="max-height: 80px;"></div>` : ''}
    <h1 class="text-center">${content.title}</h1>
    <p class="text-center">${content.description}</p>
    <div class="text-center">
      <a href="#" class="button primary-button">Get Started</a>
      <a href="#" class="button secondary-button">Learn more</a>
    </div>
    <div class="text-center">
      <img src="${content.heroImage}" alt="Hero Image" style="border-radius: 12px; margin-top: 40px;">
    </div>
  </div>
</body>
</html>`.trim();
  };

  const downloadHTML = () => {
    const htmlContent = generateHTMLCode();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-template.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex">
      {/* Main Content - With right margin for settings panel */}
      <div className="flex-1 mr-64">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              {content.logo ? (
                <div className="relative group">
                  <Image 
                    src={content.logo}
                    alt="Logo"
                    width={80}
                    height={80}
                    className="h-20 w-auto object-contain"
                  />
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer transition">
                    <span className="text-white text-sm">Change Logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="bg-gray-500/30 px-4 py-2 rounded-xl text-black hover:bg-gray-500 hover:text-white transition cursor-pointer">
                  Add Logo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div className="py-10 flex flex-col gap-4 items-center justify-center text-center">
              <h1 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold outline-none"
                contentEditable
                onBlur={(e) => handleContentEdit('title', e.currentTarget.textContent || '')}
                suppressContentEditableWarning
              >
                {content.title}
              </h1>
              
              <p 
                className="text-sm sm:text-base lg:text-lg max-w-3xl outline-none"
                contentEditable
                onBlur={(e) => handleContentEdit('description', e.currentTarget.textContent || '')}
                suppressContentEditableWarning
              >
                {content.description}
              </p>

              <section className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 mt-4">
                <button className="px-4 py-2 w-full sm:w-auto rounded-xl text-white bg-black hover:bg-gray-800 transition">
                  Get Started
                </button>
                <button className="border-2 px-4 py-2 w-full sm:w-auto rounded-xl hover:bg-gray-100 transition">
                  Learn more
                </button>
              </section>

              <section className="py-10 w-full flex flex-col items-center justify-center">
                <div className="relative group">
                  <Image
                    src={content.heroImage}
                    alt="email-marketing"
                    width={700}
                    height={700}
                    className="rounded-xl max-w-full h-auto"
                  />
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer transition rounded-xl">
                    <span className="text-white text-sm">Change Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleHeroImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Right Settings Panel */}
      <div className="w-64 bg-white h-screen fixed right-0 border-l border-gray-200 p-4">
        <div className="flex flex-col h-full">
          <h3 className="font-semibold text-lg mb-6">Settings</h3>
          
          <div className="space-y-4">
            <button 
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-2 w-full px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <Code className="w-4 h-4" />
              <span>{showCode ? 'Hide Code' : 'Show Code'}</span>
            </button>
            
            <button 
              onClick={downloadHTML}
              className="flex items-center gap-2 w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              <Download className="w-4 h-4" />
              <span>Download HTML</span>
            </button>
          </div>
        </div>
      </div>

      {/* Code Preview Modal */}
      {showCode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h3 className="font-semibold">HTML Source Code</h3>
              <button 
                onClick={() => setShowCode(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
                aria-label="Close code preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <pre className="p-4 text-sm overflow-auto">
              <code>{generateHTMLCode()}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailBuilder;