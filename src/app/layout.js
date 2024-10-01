import localFont from "next/font/local";
import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from './widgets/Footer/Footer';
import ClientWrapper from "./ClientWrapper";

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
  title: "SINGIDA BLACK STARS",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
