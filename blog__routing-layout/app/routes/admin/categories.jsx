import Title from "~/components/admin/shared/Title";
import { CATEGORIES } from "~/../data/dummy";
import AddLink from "~/components/admin/shared/AddLink";
import { Outlet } from "@remix-run/react";
import CategoriesAdminList from "~/components/admin/categories/CategoriesAdminList";

export default function ListCategoriresPage() {
  return (
    <>
      <Title>Categorires</Title>

      <AddLink
        to="add"
        text="Add Category"
      />

      <CategoriesAdminList categories={CATEGORIES} />
      <Outlet />
    </>
  );
}
