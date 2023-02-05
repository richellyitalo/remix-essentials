import { Outlet } from "@remix-run/react";
import AdminHeader from "~/components/nav/AdminHeader";

export default function AdminLayout() {
  return (
    <div className="bg-purple-500 min-h-screen">
      <div className="lg:w-2/3 sm:w-auto mx-auto p-2">
        <AdminHeader />
        <div className="bg-slate-100 p-3 rounded">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
