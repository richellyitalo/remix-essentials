import Title from "~/components/admin/shared/Title";
import { POSTS } from "~/../data/dummy";
import PostsAdminlist from "~/components/admin/post/PostsAdminList";
import AddLink from "~/components/admin/shared/AddLink";
import { Outlet } from "@remix-run/react";

export default function ListPostsPage() {
  return (
    <>
      <Title>Posts</Title>

      <AddLink
        to="add"
        text="Add Post"
      />

      <PostsAdminlist posts={POSTS} />
      <Outlet />
    </>
  );
}
