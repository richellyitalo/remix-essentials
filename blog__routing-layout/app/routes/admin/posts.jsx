import Title from "~/components/admin/shared/Title";
import PostsAdminList from "~/components/admin/post/PostsAdminList";
import AddLink from "~/components/admin/shared/AddLink";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/data/blog.server";

export function loader () {
  return getPosts();
}

export default function ListPostsPage() {
  const posts = useLoaderData();

  return (
    <>
      <Title>Posts</Title>

      <AddLink
        to="add"
        text="Add Post"
      />

      <PostsAdminList posts={posts} />
      <Outlet />
    </>
  );
}
