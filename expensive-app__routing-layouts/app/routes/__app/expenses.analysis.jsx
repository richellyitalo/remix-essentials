import { useCatch, useLoaderData } from "@remix-run/react";
import { json } from "react-router";
import { Link } from "react-router-dom";
import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Error from "~/components/util/Error";
import { getExpenses } from "~/data/expenses.server";

import expenseStyles from "~/styles/expenses.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: expenseStyles,
  },
];

export async function loader() {
  const expenses = await getExpenses();

  if (!expenses || expenses.length === 0) {
    throw json({ message: "aqui deu ruim" }, { status: 404 });
  }

  return expenses;
}

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData();
  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export function CatchBoundary() {
  return (
    <Error title="No expenses registered">
      <p>
        You can add expenses throut the{" "}
        <Link to="/expenses/add">form here.</Link>
      </p>
    </Error>
  );
}
