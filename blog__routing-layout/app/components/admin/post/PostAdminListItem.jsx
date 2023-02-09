import { Link } from "@remix-run/react";

export default function PostAdminListItem({ post }) {
  function createMarkup(content) {
    return { __html: content };
  }

  return (
    <div
      key={post.id}
      className="p-2 bg-purple-700 rounded mb-3 text-white flex justify-between drop-shadow-md hover:drop-shadow-sm"
    >
      <div>
        <h2 className="font-semibold">{post.title}</h2>
        <p
          className="text-sm text-purple-300"
          dangerouslySetInnerHTML={createMarkup(post.content.slice(0, 200))}
        />
        <p>
          {post?.categories.map((category) => (
            <span
              key={category.id}
              className="text-sm mr-2 bg-purple-600 p-1 rounded-sm"
            >
              {category.name}
            </span>
          ))}
        </p>
      </div>
      <div className="text-right pl-2">
        <div>
          <Link
            to={`/admin/posts/edit/${post.id}`}
            className="text-white text-lg hover:text-yellow-300"
          >
            Edit
          </Link>
        </div>
        <Link
          to=""
          className="text-sm text-red-200 hover:text-yellow-300"
        >
          Delete
        </Link>
      </div>
    </div>
  );
}
