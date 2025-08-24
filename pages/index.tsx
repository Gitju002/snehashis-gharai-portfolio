import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /profession on mount
    router.replace("/profession");
  }, [router]);

  // Return minimal SEO content while redirecting
  return (
    <Head>
      <title>Snehashis Gharai | Frontend Developer & Designer Portfolio</title>
      <meta
        name="description"
        content="Redirecting to professional portfolio..."
      />
      <meta name="robots" content="noindex, follow" />
      <link rel="canonical" href="https://snehashisgharai.me/profession" />
      <meta http-equiv="refresh" content="0; url=/profession" />
    </Head>
  );
}
