'use client';
import Script from 'next/script';
import { useEffect, useRef } from 'react';

export default function Turnstile({
  onToken,
  siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
}: {
  onToken: (token: string) => void;
  siteKey?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    const w = window as any;
    function render() {
      if (!ref.current || !w.turnstile || !siteKey) return;
      w.turnstile.render(ref.current, {
        sitekey: siteKey,
        callback: onToken,
        theme: 'dark',
        appearance: 'interaction-only',
        'error-callback': () => onToken(''),
        'expired-callback': () => onToken(''),
        'timeout-callback': () => onToken(''),
      });
    }
    if (w.turnstile) render();
    else {
      w.onTurnstileLoad = render;
    }
  }, [onToken, siteKey]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad"
        strategy="afterInteractive"
      />
      <div ref={ref} className="cf-turnstile" />
    </>
  );
}
