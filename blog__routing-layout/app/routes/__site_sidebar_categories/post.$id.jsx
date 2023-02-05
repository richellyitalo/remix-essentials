import { Link } from '@remix-run/react';
import { POSTS } from '~/../data/dummy';

export default function PostPage () {
    const post = POSTS[0];

    return (
      <div className="post-detail">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div>
          <Link
            to={`/categories/${post.category.id}`}
            className="text-blue-500 underline hover:no-underline"
          >
            {post.category.name}
          </Link>
        </div>

        <div className="post-entry-text py-4">{post.content}</div>
      </div>
    );
}