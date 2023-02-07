import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { getExpense, updateExpense } from "~/data/expense.server";
import { validateExpenseRequestData } from "~/data/validation.server";

export async function action ({ request, params }) {
  const expenseId = params.id;
  const formData = await request.formData();
  const expenseData = {
    ...Object.fromEntries(formData),
    id: expenseId
  };

  try {
    validateExpenseRequestData(expenseData);

    await updateExpense(expenseData);
  } catch (error) {
    return error;
  }

  return redirect('/expenses');
}

export function loader({ params }) {
  try {
    return getExpense(params.id);
  } catch (error) {
    throw error;
  }
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
