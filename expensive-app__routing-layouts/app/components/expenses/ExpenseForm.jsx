import { json } from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useMatches,
  useNavigation,
  useParams,
} from "@remix-run/react";
import Error from "../util/Error";

function ExpenseForm({ expense }) {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  // const submit = useSubmit();
  const validationErrors = useActionData();
  const { state } = useNavigation();
  const isSubmitting = state !== "idle";

  // GET_ENTITY: #A get data from loader method on route
  // const expenseData = useLoaderData();
  // END GET_ENTITY: #A

  // GET_ENTITY: #B
  const matches = useMatches();
  const params = useParams();
  const { data: expenses } = matches.find(
    (match) => match.id === "routes/__app/expenses"
  );
  const expenseData = expenses.find((expense) => expense.id === params.id);
  // END GET_ENTITY: #B

  if (params.id && !expenseData) {
    return (
      <div>
        <h3>Expense not found</h3>
        <p>
          Go back to list of expenses <Link to="..">clicking here</Link>!
        </p>
      </div>
    );
  }

  const defaultValues = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date.slice(0, 10),
      }
    : {
        title: "",
        amount: "",
        date: "",
      };

  // submit programmatically
  // function submitHandler(event) {
  //   event.preventDefault();

  //   submit(event.target, {
  //     action: "",
  //   });
  // }

  return (
    <Form
      method={expenseData ? "patch" : "post"}
      className="form"
      id="expense-form"
      // onSubmit={submitHandler}
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultValues.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValues.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={defaultValues.date}
          />
        </p>
      </div>

      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}

      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "...Saving" : "Save Expense"}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
