import { Outlet } from "@remix-run/react";

import expensesLayoutStyles from "~/styles/expenses.css";

export const meta = () => ({
  title: "Admin/Expenses",
});

export const styles = () => ({
  rel: "stylesheet",
  href: expensesLayoutStyles,
});

export default function ExpensesLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}
