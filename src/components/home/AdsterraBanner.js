'use client';

import { useEffect, useRef } from 'react';

export default function AdsterraBanner({ adKey, width, height, format = 'iframe' }) {
  const containerRef = useRef(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current || !containerRef.current) return;
    loaded.current = true;

    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.innerHTML = `
      atOptions = {
        'key': '${adKey}',
        'format': '${format}',
        'height': ${height},
        'width': ${width},
        'params': {}
      };
    `;

    const invokeScript = document.createElement('script');
    invokeScript.src = `https://www.highrevenueformat.com/${adKey}/invoke.js`;
    invokeScript.async = true;

    containerRef.current.appendChild(configScript);
    containerRef.current.appendChild(invokeScript);
  }, [adKey, width, height, format]);

  return (
    <div className="flex justify-center my-4">
      <div ref={containerRef} style={{ width, height }} />
    </div>
  );
}