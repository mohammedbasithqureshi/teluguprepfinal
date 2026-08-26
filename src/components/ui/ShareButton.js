'use client';

import {
  Share2,
  Check,
  Link2,
  MessageCircle,
  Send,
  Globe,
} from 'lucide-react';

import { useState, useRef, useEffect } from 'react';

export default function ShareButton({ title, url }) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  /*
   * Get the EXACT page URL.
   *
   * If a URL is passed manually, use it.
   * Otherwise use the current browser URL.
   */
  function getShareUrl() {
    if (url) {
      return url;
    }

    if (typeof window !== 'undefined') {
      return window.location.href;
    }

    return '';
  }

  async function handleNativeShare() {
    const shareUrl = getShareUrl();

    if (!shareUrl) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title || 'TeluguPrep',
          text: title || '',
          url: shareUrl,
        });

        setIsOpen(false);
        return;
      } catch (error) {
        // User cancelled native share.
        // Show dropdown as fallback.
      }
    }

    setIsOpen((prev) => !prev);
  }

  async function handleCopyLink() {
    const shareUrl = getShareUrl();

    if (!shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1500);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  }

  const shareUrl =
    typeof window !== 'undefined'
      ? getShareUrl()
      : '';

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title || '');

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
    <div
      className="relative inline-block text-left"
      ref={dropdownRef}
    >
      {/* Share Button */}
      <button
        type="button"
        onClick={handleNativeShare}
        className="
          inline-flex
          items-center
          gap-2
          border-[2px]
          border-[#ab1738]
          bg-white
          px-4
          py-2
          text-sm
          font-bold
          text-[#ab1738]
          transition-colors
          hover:bg-[#ab1738]
          hover:text-white
        "
      >
        <Share2 className="h-4 w-4" />
        Share
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="
            absolute
            left-0
            z-50
            mt-2
            w-52
            border-[2px]
            border-[#ab1738]
            bg-white
            shadow-lg
          "
        >
          {/* Copy Link */}
          <div className="border-b border-gray-200 p-1">
            <button
              type="button"
              onClick={handleCopyLink}
              className="
                flex
                w-full
                items-center
                gap-2.5
                px-3
                py-2.5
                text-left
                text-sm
                text-gray-700
                hover:bg-gray-50
              "
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Link2 className="h-4 w-4 text-gray-500" />
              )}

              <span
                className={
                  copied
                    ? 'font-medium text-green-600'
                    : ''
                }
              >
                {copied
                  ? 'Link Copied!'
                  : 'Copy Link'}
              </span>
            </button>
          </div>

          {/* Social Share */}
          <div className="p-1">
            {shareOptions.map((option) => {
              const Icon = option.icon;

              return (
                <a
                  key={option.name}
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex
                    items-center
                    gap-2.5
                    rounded
                    px-3
                    py-2.5
                    text-sm
                    text-gray-700
                    transition-colors
                    ${option.color}
                  `}
                >
                  <Icon className="h-4 w-4" />

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