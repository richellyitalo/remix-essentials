import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import CategoryForm from "~/components/admin/categories/CategoryForm";
import Modal from "~/components/util/Modal";
import { updateCategory, validateCategoryRequest } from "~/data/blog.server";

export async function action({ request, params }) {
  const formData = await request.formData();
  const categoryId = params.categoryId;
  const categoryData = Object.fromEntries(formData);

  try {
    validateCategoryRequest(categoryData);
  } catch (error) {
    return error;
  }

  await updateCategory(categoryId, categoryData);

  return redirect("..");
}

export default function EditCategoryPage() {
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
