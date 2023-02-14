import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import Error from "~/components/util/Error";
import { requireUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

import expensesLayoutStyles from "~/styles/expenses.css";

export const meta = () => ({
  title: "Expenses Panel",
});

export const links = () => [
  {
    rel: "stylesheet",
    href: expensesLayoutStyles,
  },
];

export async function loader ({ request }) {
  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);

  return await json(expenses, {
    headers: {
      "Cache-Control": "max-age=3"
    }
  });
}

export function headers({
  loaderHeaders,
  actionHeaders,
  parentHeaders
}) {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control")
  }
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
          <a
            href="/expenses/raw"
            target="_blank"
          >
            <FaDownload />
            <span>Access Raw Data</span>
          </a>
        </section>

        {expenses.length === 0 && (
          <Error title="No expenses registered">
            You can add one expense now{" "}
            <Link to="add">
              <strong>clicking here</strong>
            </Link>
          </Error>
        )}

        <ExpensesList expenses={expenses} />
      </main>
    </>
  );
}
