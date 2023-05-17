import Script from "next/script";

declare global {
  interface Window {
    gtag: any;
  }
}

export default function GoogleAnalytics() {
  const trackingId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  if (!trackingId) return null;

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
      ></Script>
      <Script id="ga">
        {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${trackingId}');`}
      </Script>
    </>
  );
}
