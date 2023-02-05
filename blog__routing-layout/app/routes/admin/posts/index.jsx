import Title from "~/components/admin/shared/Title";
import { POSTS } from "~/../data/dummy";
import PostsAdminlist from "~/components/admin/post/PostsAdminList";
import AddLink from "~/components/admin/shared/AddLink";

export default function ListPostsPage() {
  return (
    <>
      <Title>Posts</Title>

      <AddLink
        to=""
        text="Add Post"
      />

      <PostsAdminlist posts={POSTS} />
    </>
  );
}
