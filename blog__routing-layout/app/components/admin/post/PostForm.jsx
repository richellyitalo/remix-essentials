import { Form, Link } from "@remix-run/react";
import Modal from "~/components/util/Modal";
import Title from "../shared/Title";

export default function PostForm() {
  return (
    <>
      <Title className="text-center">New Post</Title>
      <Form className="form-data">
        <p>
          <label htmlFor="">Title</label>
          <input
            type="text"
            name="title"
          />
        </p>
        <p>
          <label htmlFor="">Title</label>
          <textarea name="content" />
        </p>
        <p>
          <label htmlFor="">Category</label>
          <select>
            <option>Cinema</option>
            <option>Internet</option>
          </select>
        </p>
        <p className="flex justify-end my-2">
          <Link to="..">Cancel</Link>
          <button className="p-1 px-2 bg-green-500 rounded-md ml-2">
            Save
          </button>
        </p>
      </Form>
    </>
  );
}
