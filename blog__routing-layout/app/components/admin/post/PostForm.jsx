import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useMatches,
  useNavigation,
  useParams,
} from "@remix-run/react";
import Title from "../shared/Title";

export default function PostForm({ categories = [] }) {
  const matches = useMatches();
  const params = useParams();
  const errors = useActionData();
  const navigation = useNavigation();

  const isEditing = params.postId !== undefined;

  let post = undefined;

  if (isEditing) {
    const posts = matches.find(
      (match) => match.id === "routes/admin/posts"
    ).data;

    post = posts.find((post) => post.id === params.postId);
  }

  const isSubmitting = navigation.state !== "idle";

  const defaultValues =
    post !== undefined
      ? {
          title: post.title,
          content: post.content,
          categories: post.categories.map((category) => category.id),
        }
      : {
          title: "",
          content: "",
          categories: [],
        };

  return (
    <>
      <Title className="text-center">New Post</Title>
      <Form
        className="form-data"
        method={isEditing ? "patch" : "post"}
      >
        <p>
          <label htmlFor="">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={defaultValues.title}
          />
        </p>

        {errors && errors.title && (
          <p className="text-red-500 text-xs mb-3">{errors.title}</p>
        )}

        <p>
          <label htmlFor="">Content</label>
          <textarea
            name="content"
            defaultValue={defaultValues.content}
          />
        </p>

        {errors && errors.content && (
          <p className="text-red-500 text-xs mb-3">{errors.content}</p>
        )}
        <p>
          <label htmlFor="">Category</label>
          <select
            name="categories[]"
            multiple
          >
            {categories.map((category) => (
              <option
                key={category.id}
                selected={defaultValues?.categories.includes(category.id)}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </p>
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
          >
            {isSubmitting ? "...Saving" : "Save"}
          </button>
        </p>
      </Form>
    </>
  );
}
