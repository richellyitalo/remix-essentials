import { redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import PostForm from "~/components/admin/post/PostForm";
import Modal from "~/components/util/Modal";
import {
  deletePost,
  getCategories,
  updatePost,
  validatePostRequest,
} from "~/data/blog.server";

export async function action({ request, params }) {
  const formData = await request.formData();
  const postData = {
    title: formData.get("title"),
    content: formData.get("content"),
    categories: formData.getAll("categories[]"),
  };
  const postId = params.postId;
  
  if (request.method === "POST") {
    try {
      validatePostRequest(postData);
    } catch (error) {
      return error;
    }
  
    await updatePost(postId, postData);
  } else if (request.method === "DELETE") {
    await deletePost(postId);
    return {postId}
  }


  return redirect("..");
}

export function loader() {
  return getCategories();
}

export default function EditPostPage() {
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
