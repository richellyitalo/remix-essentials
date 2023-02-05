import Title from "~/components/admin/shared/title";
import { POSTS } from "~/../data/dummy";
import { Link } from "@remix-run/react";
import { FaPlusCircle } from 'react-icons/fa'

export default function ListPostsPage() {
  return (
    <>
      <Title>Posts</Title>
      <div className="my-3">
        <Link
          to=""
          className="p-1 bg-green-300 rounded hover:bg-green-400"
        >
          <FaPlusCircle className="inline mr-1 drop-shadow-sm" />
          Add Post
        </Link>
      </div>

      {POSTS.map((post) => (
        <div
          key={post.id}
          className="p-2 bg-purple-700 rounded mb-3 text-white flex justify-between drop-shadow-md hover:drop-shadow-sm"
        >
          <div>
            <h2 className="font-semibold">{post.title}</h2>
            <p className="text-sm text-purple-300">
              {post.content.slice(0, 200)}...
            </p>
          </div>
          <div className="text-right pl-2">
            <div>
              <Link
                to=""
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
      ))}
    </>
  );
}
