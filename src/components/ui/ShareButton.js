'use client';

import { Share2, Check, Link2, MessageCircle, Send, Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function ShareButton({ title, url }) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title || '');

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
        setIsOpen(false);
        return;
      } catch (err) {
        // Fallback to dropdown
      }
    }
    setIsOpen(!isOpen);
  }

  async function handleCopyLink() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 1500);
  }

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: 'hover:bg-green-50 text-green-600',
    },
    {
      name: 'Telegram',
      icon: Send,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:bg-sky-50 text-sky-500',
    },
    {
      name: 'Facebook',
      icon: Globe,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-blue-50 text-blue-600',
    },
    {
      name: 'X (Twitter)',
      icon: Globe,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hover:bg-gray-100 text-gray-800',
    },
  ];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={handleNativeShare}
        className="inline-flex items-center gap-2 border border-gray-300 hover:border-[var(--color-teal)] hover:text-[var(--color-teal)] px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 p-1 divide-y divide-gray-100">
          <div className="py-1">
            <button
              onClick={handleCopyLink}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2.5 transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Link2 className="w-4 h-4 text-gray-500" />
              )}
              <span className={copied ? 'text-green-600 font-medium' : ''}>
                {copied ? 'Link Copied!' : 'Copy Link'}
              </span>
            </button>
          </div>

          <div className="py-1">
            {shareOptions.map((option) => {
              const Icon = option.icon;
              return (
                <a
                  key={option.name}
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 text-sm text-gray-700 rounded-lg flex items-center gap-2.5 transition-colors ${option.color}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{option.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}