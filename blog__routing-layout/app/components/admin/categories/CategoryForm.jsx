import { Form, Link } from "@remix-run/react";
import Title from "../shared/Title";

export default function CategoryForm() {
  return (
    <>
      <Title className="text-center">New Category</Title>
      <Form className="form-data">
        <p>
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="title"
          />
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
