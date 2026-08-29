'use client';

import { useEffect, useRef } from 'react';

export default function AdsterraNative() {
  const containerId = 'container-4e31fb52f2b784c9c0cb1cb605c69800';
  const containerRef = useRef(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current || !containerRef.current) return;
    loaded.current = true;

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://pl29855405.profitableratecpmnetwork.com/4e31fb52f2b784c9c0cb1cb605c69800/invoke.js';
    document.body.appendChild(script);
  }, []);

  return (
    <div className="my-6">
      <div id={containerId} ref={containerRef} />
    </div>
  );
}