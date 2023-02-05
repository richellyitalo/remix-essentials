import { POSTS as posts } from "~/../data/dummy";
import PostsList from "~/components/site/post/PostList";

export default function SiteHomePage() {
  return (
    <>
      <h1 className="font-bold text-lg border-b">Posts</h1>
      <div>
        <PostsList posts={posts} />
      </div>
    </>
  );
}
