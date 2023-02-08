import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
import { validateExpenseRequestData } from "~/data/validation.server";

export async function action({ request, params }) {
  const expenseId = params.id;
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);
  if (request.method === "PATCH") {
    try {
      validateExpenseRequestData(expenseData);
    } catch (error) {
      return error;
    }

    await updateExpense(expenseId, expenseData);

    return redirect("/expenses");
  } else if (request.method === "DELETE") {
    await deleteExpense(expenseId);

    return {expenseId};

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
