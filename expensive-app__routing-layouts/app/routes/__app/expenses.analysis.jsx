import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";

import expenseStyles from "~/styles/expenses.css";

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

export const links = () => [
  {
    rel: "stylesheet",
    href: expenseStyles,
  },
];

export default function ExpensesAnalysisPage() {
  return (
    <main>
      <Chart expenses={DUMMY_EXPENSES} />
      <ExpenseStatistics expenses={DUMMY_EXPENSES} />
    </main>
  );
}
