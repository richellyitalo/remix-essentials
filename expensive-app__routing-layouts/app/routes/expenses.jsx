import { Outlet } from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpensesList";

import expensesLayoutStyles from "~/styles/expenses.css";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Expense #1",
    amount: 15.45,
    date: new Date().toISOString(),
  },
  {
    id: "e2",
    title: "Expense #2",
    amount: 30.39,
    date: new Date("2023-05-01").toISOString(),
  },
  {
    id: "e2",
    title: "Expense #2",
    amount: 30.39,
    date: new Date("2023-08-01").toISOString(),
  },
];

export const meta = () => ({
  title: "Admin/Expenses",
});

export const links = () => ({
  rel: "stylesheet",
  href: expensesLayoutStyles,
});

export default function ExpensesLayout() {
  return (
    <main>
      <Outlet />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </main>
  );
}
