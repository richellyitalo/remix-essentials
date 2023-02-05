import { useNavigate } from "@remix-run/react";
import CategoryForm from "~/components/admin/categories/CategoryForm";
import Modal from "~/components/util/Modal";

export default function AddCategoryPage() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <CategoryForm />
    </Modal>
  );
}
