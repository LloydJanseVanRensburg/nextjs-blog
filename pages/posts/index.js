import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../lib/post-util';
import Head from 'next/head';

function AllPostsPage(props) {
  const { posts } = props;
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="I post about programming and web development"
        />
      </Head>
      <AllPosts posts={posts} />;
    </>
  );
}

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}

export default AllPostsPage;
