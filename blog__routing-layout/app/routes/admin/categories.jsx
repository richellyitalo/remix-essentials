import Title from "~/components/admin/shared/Title";
import AddLink from "~/components/admin/shared/AddLink";
import { Outlet, useLoaderData } from "@remix-run/react";
import CategoriesAdminList from "~/components/admin/categories/CategoriesAdminList";
import { getCategories } from "~/data/blog.server";

export function loader () {
  return getCategories();
}

export default function ListCategoriresPage() {
  const categories = useLoaderData();

  return (
    <>
      <Title>Categorires</Title>

      <AddLink
        to="add"
        text="Add Category"
      />

      <CategoriesAdminList categories={categories} />
      <Outlet />
    </>
  );
}
