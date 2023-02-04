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

export function loader() {
  return DUMMY_EXPENSES;
}
