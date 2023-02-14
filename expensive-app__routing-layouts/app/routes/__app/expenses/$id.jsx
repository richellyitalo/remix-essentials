import { json, redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { requireUserSession } from "~/data/auth.server";
import {
  deleteExpense,
  getExpense,
  updateExpense,
} from "~/data/expenses.server";
import { validateExpenseRequestData } from "~/data/validation.server";

export async function action({ request, params }) {
  const userId = await requireUserSession(request);
  const expenseId = params.id;
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);
  const expense = await getExpense(expenseId);

  if (expense && expense.userId !== userId) {
    throw json(
      { message: "This expense does not belong to you." },
      { status: 401 }
    );
  }

  if (request.method === "PATCH") {
    try {
      validateExpenseRequestData(expenseData);
    } catch (error) {
      return error;
    }

    await updateExpense(expenseId, expenseData, userId);

    return redirect("/expenses");
  } else if (request.method === "DELETE") {
    await deleteExpense(expenseId);

    // using useFetch to no show as error
    return { expenseId };

    // return redirect("/expenses");
  }
}

// export function loader({ params }) {
//   try {
//     return getExpense(params.id);
//   } catch (error) {
//     throw error;
//   }
// }

export function meta({ params, parentsData }) {
  const expense = parentsData["routes/__app/expenses"].find(
    (expense) => expense.id === params.id
  );

  return {
    title: "Edit Expense: " + expense.title,
    description: "Edit page expense",
  };
}

export default function ExpensesAddPage() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}
