import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface UsePageLoadingOptions {
  minLoadTime?: number;
  maxLoadTime?: number;
  imageTimeout?: number;
  onLoadingComplete?: () => void;
}

export const usePageLoading = (options: UsePageLoadingOptions = {}) => {
  const {
    minLoadTime = 1500,
    maxLoadTime = 5000,
    imageTimeout = 3000,
    onLoadingComplete,
  } = options;

  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [hasLoadingCompleted, setHasLoadingCompleted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
      setHasLoadingCompleted(false);
    };

    const handleRouteChangeComplete = () => {
      const hidePreloader = () => {
        const startTime = Date.now();

        const checkContentLoaded = () => {
          // Get all images in the document
          const images = document.querySelectorAll("img");

          // Create promises for each image
          const imagePromises = Array.from(images).map((img) => {
            if (img.complete && img.naturalHeight !== 0) {
              return Promise.resolve("already-loaded");
            }

            return new Promise((resolve) => {
              const timeout = setTimeout(
                () => resolve("timeout"),
                imageTimeout
              );

              img.onload = () => {
                clearTimeout(timeout);
                resolve("loaded");
              };

              img.onerror = () => {
                clearTimeout(timeout);
                resolve("error");
              };
            });
          });

          // Race between content loading and maximum timeout
          Promise.race([
            Promise.all(imagePromises),
            new Promise((resolve) =>
              setTimeout(() => resolve("max-timeout"), maxLoadTime)
            ),
          ]).then(() => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minLoadTime - elapsedTime);

            setTimeout(() => {
              setIsLoading(false);
              setHasLoadingCompleted(true);
              document.body.style.cursor = "default";
              window.scrollTo(0, 0);

              if (isInitialLoad) {
                setIsInitialLoad(false);
              }

              // Call the completion callback if provided
              onLoadingComplete?.();
            }, remainingTime);
          });
        };

        // Wait for DOM to be ready
        if (document.readyState === "complete") {
          setTimeout(checkContentLoaded, 100);
        } else {
          window.addEventListener(
            "load",
            () => {
              setTimeout(checkContentLoaded, 100);
            },
            { once: true }
          );
        }
      };

      hidePreloader();
    };

    // Handle initial page load
    if (isInitialLoad) {
      handleRouteChangeComplete();
    }

    // Listen to router events
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, [
    router,
    isInitialLoad,
    minLoadTime,
    maxLoadTime,
    imageTimeout,
    onLoadingComplete,
  ]);

  return { isLoading, hasLoadingCompleted };
};
