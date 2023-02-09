import {
  Form,
  Link,
  useActionData,
  useMatches,
  useNavigation,
  useParams,
} from "@remix-run/react";
import Title from "../shared/Title";

export default function CategoryForm() {
  const errors = useActionData();
  const navigation = useNavigation();
  const params = useParams();
  const matches = useMatches();

  const isSubmitting = navigation.state !== "idle";
  const isEditing = params.categoryId !== undefined;

  let category = undefined;
  if (isEditing) {
    const categories = matches.find(
      (match) => match.id === "routes/admin/categories"
    ).data;

    category = categories.find((category) => category.id === params.categoryId);
  }

  const defaultValues = isEditing
    ? {
        name: category.name,
      }
    : {
        name: "",
      };

  return (
    <>
      <Title className="text-center">
        {isEditing ? "Edit Category" : "New Category"}
      </Title>
      <Form
        method={isEditing ? "patch" : "post"}
        className="form-data"
        autocomplete="off"
      >
        <p>
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={defaultValues.name}
          />
        </p>

        {errors && errors.name && (
          <p className="text-red-500 text-xs mb-3">{errors.name}</p>
        )}

        <p className="flex justify-end my-2">
          <Link
            to=".."
            className="pt-1"
          >
            Cancel
          </Link>
          <button
            className={`p-1 px-2 rounded-md ml-2 ${
              isSubmitting ? "bg-gray-300" : "bg-green-300 hover:bg-green-400"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "...Saving" : "Save"}
          </button>
        </p>
      </Form>
    </>
  );
}
