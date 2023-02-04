import { Link, Outlet } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
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
    id: "e3",
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
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Access Raw Data</span>
          </a>
        </section>
        <ExpensesList expenses={DUMMY_EXPENSES} />
      </main>
    </>
  );
}
