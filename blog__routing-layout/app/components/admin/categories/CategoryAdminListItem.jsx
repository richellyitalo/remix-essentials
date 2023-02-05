import { Link } from "@remix-run/react";

export default function CategoryAdminListItem({ category }) {
  return (
    <div
      key={category.id}
      className="p-2 bg-purple-700 rounded mb-3 text-white flex justify-between drop-shadow-md hover:drop-shadow-sm"
    >
      <div>
        <h2 className="font-semibold">{category.name}</h2>
      </div>
      <div className="text-right pl-2">
        <div>
          <Link
            to={`/admin/categories/edit/${category.id}`}
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