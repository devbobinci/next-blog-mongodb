import Head from "next/head";
import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";

import { getFeaturedPosts } from "../helpers/posts-util";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Bob&apos;s Blog</title>
        <meta name="description" content="I post about spirutual awakening" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <Hero />
        <FeaturedPosts posts={posts} />
      </>
    </>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: { posts: featuredPosts },
    revalidate: 600,
  };
}
