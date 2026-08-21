'use client';

import { useEffect, useRef } from 'react';

export default function AdSlot({ slot, format = 'auto', label = 'Advertisement' }) {
  const adRef = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className="container-page my-6">
      <ins
        ref={adRef}
        className="adsbygoogle block"
        style={{ display: 'block', minHeight: '90px' }}
        data-ad-client="ca-pub-9039316648016229"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}