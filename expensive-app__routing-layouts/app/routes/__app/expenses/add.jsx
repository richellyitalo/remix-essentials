import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { requireUserSession } from "~/data/auth.server";
import { addExpense } from "~/data/expenses.server";
import { validateExpenseRequestData } from "~/data/validation.server";

export async function action({ request }) {
  const userId = await requireUserSession(request);
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);

  try {
    validateExpenseRequestData(expenseData);
  } catch (error) {
    return error;
  }

  await addExpense(expenseData, userId);

  return redirect("/expenses");
}

export async function loader ({ request }) {
  await requireUserSession(request);
  return null;
}

export default function Add() {
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
