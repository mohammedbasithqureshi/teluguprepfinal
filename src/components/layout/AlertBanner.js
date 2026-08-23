'use client';

import { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

export default function AlertBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#00897B] text-white text-xs md:text-sm py-2.5">
      <div className="container-page flex items-center justify-center gap-3 flex-wrap relative">
        <span className="font-medium text-center">
          📣 Get Instant Job Alerts — Join our channels
        </span>

        <div className="flex items-center gap-2">
          <a
            href="https://whatsapp.com/channel/0029VbCVLtBE50UpL20bNz3W"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 px-3 py-1 rounded-full font-semibold transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>

          <a
            href="https://t.me/+ebMXh1YjQrVmMmY1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 px-3 py-1 rounded-full font-semibold transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            Telegram
          </a>
        </div>

        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss"
          className="absolute right-0 top-1/2 -translate-y-1/2 md:static md:translate-y-0 p-1 hover:bg-white/15 rounded-full"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}