import { Inter } from 'next/font/google';
import './globals.css';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import GrainOverlay from './components/GrainOverlay';
import LoadingScreen from './components/LoadingScreen';

// We import Inter but mainly rely on the custom global fonts 
// (Bodoni Moda/Cormorant Garamond and General Sans) imported in CSS
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'KNOWN STRANGERS | Dark Luxury Streetwear',
  description: 'For those who belong nowhere and everywhere. A premium streetwear label exploring the poetry of urban loneliness.',
  keywords: ['Streetwear', 'Luxury', 'Fashion', 'Known Strangers', 'Mumbai', 'Clothing'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="has-scroll-smooth">
      <body className={`${inter.variable} antialiased bg-[#0a0a0a] text-[#F5F5F5] min-h-screen`}>
        <LoadingScreen />
        <GrainOverlay />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
