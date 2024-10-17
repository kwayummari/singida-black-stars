import localFont from "next/font/local";
import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
import './fontawesome';
import Footer from './widgets/Footer/Footer';
import ClientWrapper from "./ClientWrapper";
import Head from "next/head";

// Font imports
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Export metadata
export const metadata = {
  title: "Singida Black Stars | Official Team Website",
  description: "Welcome to the official website of Singida Black Stars football team. Stay updated on news, match results, and player profiles.",
  keywords: "Singida Black Stars, football team, Singida, Tanzania, match results, player profiles",
  openGraph: {
    title: "Singida Black Stars | Official Team Website",
    description: "Follow the latest news, match results, and updates of Singida Black Stars.",
    image: "/images/logo.png",
    url: "https://singidablackstars.com",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: "index, follow",
  canonical: "https://singidablackstars.com",
  icons: {
    icon: "/images/logo.png",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.image} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="robots" content={metadata.robots} />
        <link rel="canonical" href={metadata.canonical} />
        <link rel="icon" href={metadata.icons.icon} />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientWrapper>
          <main style={{ minHeight: "80vh" }}>
            {children}
          </main>
        </ClientWrapper>
        <Footer />
      </body>
    </html>
  );
}
