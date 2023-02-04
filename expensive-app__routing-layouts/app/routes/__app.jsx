import { Outlet } from "@remix-run/react";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";

export default function AppLayoutPage() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  );
}
