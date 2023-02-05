import { Outlet } from "@remix-run/react";

export default function AdminLayout() {
  return (
    <>
      <h1>Layout:Admin</h1>
      <h3>NAV ADMIN</h3>
      <Outlet />
    </>
  );
}