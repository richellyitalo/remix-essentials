import { useNavigate } from "@remix-run/react";
import PostForm from "~/components/admin/post/PostForm";
import Modal from "~/components/util/Modal";

export default function AddPostPage() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <PostForm />
    </Modal>
  );
}
