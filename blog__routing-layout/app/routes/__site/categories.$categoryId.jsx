import { CATEGORIES, POSTS } from "~/../data/dummy";
import PostsList from "~/components/site/post/PostList";

const category = CATEGORIES[0];

export default function CategoriesDetailPage() {
  return (
    <>
      <h1 className="font-bold text-lg border-b">Posts of {category.name}</h1>
      <PostsList posts={POSTS} />
    </>
  );
}
