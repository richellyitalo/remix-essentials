import { Form, Link, NavLink } from "@remix-run/react";
import { AiOutlineRollback } from "react-icons/ai";

export default function AdminHeader() {
  return (
    <nav
      id="site-header"
      className="py-4 drop-shadow-md bg-slate-100 border p-2 px-5 rounded-md mb-4"
    >
      <ul className="list-inline flex">
        <li className="mr-6">
          <NavLink
            className="text-blue-500 hover:text-blue-800"
            to="/admin/posts"
          >
            Posts
          </NavLink>
        </li>
        <li className="mr-6">
          <NavLink
            className="text-blue-500 hover:text-blue-800"
            to="/admin/categories"
            end
          >
            Categories
          </NavLink>
        </li>
        <li className="mr-6">
          <Form
            method="post"
            action="/logout"
          >
            <button className="text-white p-2 rounded-md bg-purple-500 hover:text-purple-200 hover:bg-purple-700">
              Logout
            </button>
          </Form>
        </li>
        <li className="mr-6">
          <Link
            className="text-purple-500 p-2 hover:text-purple-800"
            to="/"
            target="_blank"
          >
            <AiOutlineRollback className="inline mr-1" />
            go to Website
          </Link>
        </li>
      </ul>
    </nav>
  );
}
