import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import { getExpenses } from "~/data/expenses.server";

import expensesLayoutStyles from "~/styles/expenses.css";

export const meta = () => ({
  title: "Admin/Expenses",
});

export const links = () => [
  {
    rel: "stylesheet",
    href: expensesLayoutStyles,
  },
];

export function loader () {
  return getExpenses();
}

export default function ExpensesLayout() {
  const expenses = useLoaderData();

  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw" target="_blank">
            <FaDownload />
            <span>Access Raw Data</span>
          </a>
        </section>

        {expenses.length === 0 && <h3>No one expense added.</h3>}

        <ExpensesList expenses={expenses} />
      </main>
    </>
  );
}
