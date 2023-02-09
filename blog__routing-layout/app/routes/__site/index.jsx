import { useLoaderData } from "@remix-run/react";
import PostsList from "~/components/site/post/PostList";
import { getPosts } from "~/data/blog.server";

export async function loader() {  
  return await getPosts();
}

export default function SiteHomePage() {
  const posts = useLoaderData();

  return (
    <>
      <h1 className="font-bold text-lg border-b">Posts</h1>
      <div>
        <PostsList posts={posts} />
      </div>
    </>
  );
}
