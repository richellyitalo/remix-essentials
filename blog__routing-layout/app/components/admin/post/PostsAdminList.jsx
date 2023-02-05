import PostAdminListItem from "./PostAdminListItem";

export default function PostsAdminlist({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <PostAdminListItem
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}
