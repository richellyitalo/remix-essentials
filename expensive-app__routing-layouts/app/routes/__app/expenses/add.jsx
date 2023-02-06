import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expense.server";
import { validateExpenseRequestData } from "~/data/validation.server";

export async function action({ request }) {
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);

  try {
    validateExpenseRequestData(expenseData);
  } catch (error) {
    return error;
  }

  await addExpense(expenseData);

  return redirect("/expenses");
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