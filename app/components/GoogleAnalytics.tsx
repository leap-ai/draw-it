import Script from "next/script";

declare global {
  interface Window {
    gtag: any;
  }
}

const trackingId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export default function GoogleAnalytics() {
  if (typeof trackingId !== "string") return null;

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
