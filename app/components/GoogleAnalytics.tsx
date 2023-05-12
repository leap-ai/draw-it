import Script from "next/script";
import React from "react";

declare global {
  interface Window {
    gtag: any;
  }
}

export default function GoogleAnalytics() {
  return (
    <div>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-4DQ04SP2T3"
      ></Script>
      <Script id="ga">
        {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-4DQ04SP2T3');`}
      </Script>
    </div>
  );
}
