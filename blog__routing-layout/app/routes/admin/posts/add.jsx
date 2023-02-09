import { redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import PostForm from "~/components/admin/post/PostForm";
import Modal from "~/components/util/Modal";
import { addPost, getCategories, validatePostRequest } from "~/data/blog.server";

export async function action ({ request }) {
  const formData = await request.formData();
  const postData = {
    title: formData.get("title"),
    content: formData.get("content"),
    categories: formData.getAll("categories[]")
  };

  try {
    validatePostRequest(postData);
  } catch (error) {
    return error;
  }

  await addPost(postData);

  return redirect("..");
}

export function loader () {
  return getCategories();
}

export default function AddPostPage() {
  const categories = useLoaderData();
  const navigate = useNavigate();

  function closeHandler() {
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <PostForm categories={categories} />
    </Modal>
  );
}
