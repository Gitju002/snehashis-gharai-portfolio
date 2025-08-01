import type { AppProps } from "next/app";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "../styles/globals.css";
import Header from "../components/navigation/Header";
import ScrollWrapper from "../components/ui/ScrollWrapper";
import ScrollToTop from "../components/ui/ScrollToTop";
import { AnimatePresence } from "framer-motion";
import Preloader from "../components/PreLoader";
import { LoadingProvider, useLoadingContext } from "../contexts/LoadingContext";
import { NavigationProvider } from "../contexts/NavigationContext";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const testManuka = localFont({
  src: [
    {
      path: "../public/fonts/TestManuka-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/TestManuka-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-test-manuka",
  display: "swap",
});

function AppContent({ Component, pageProps }: AppProps) {
  const { isLoading } = useLoadingContext();

  return (
    <div className={`${dmSans.variable} ${testManuka.variable} antialiased`}>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      <ScrollWrapper>
        <Header />
        <Component {...pageProps} />
      </ScrollWrapper>

      <ScrollToTop />
    </div>
  );
}

export default function MyApp(appProps: AppProps) {
  return (
    <LoadingProvider>
      <NavigationProvider>
        <AppContent {...appProps} />
      </NavigationProvider>
    </LoadingProvider>
  );
}
