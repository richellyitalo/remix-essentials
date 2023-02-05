import { Link } from "react-router-dom";

export default function PostListItem({ post }) {
  return (
    <div className="post-list-item py-2">
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="pb-2 text-slate-500">{post.content}</p>
      <div>
        <Link
          to={`/categories/${post.category.id}`}
          className="text-blue-500 underline hover:no-underline"
        >
          {post.category.name}
        </Link>
      </div>
      <div className="mt-2">
        <Link
          to={`/post/${post.id}`}
          className="text-white rounded-md p-1 px-4 bg-blue-600 hover:bg-blue-900"
        >
          Read more
        </Link>
      </div>
    </div>
  );
}
