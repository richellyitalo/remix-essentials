import { Form, Link, useFetcher, useSubmit } from "@remix-run/react";

function ExpenseListItem({ id, title, amount }) {
  // __DELETE #B programmatically
  // const submit = useSubmit();

  // function deleteExpenseItemHandler() {
  //   submit(null, {
  //     method: 'delete',
  //     action: `/expenses/${id}`
  //   });
  // }
  // __END DELETE #B

  // __DELETE #C programmatically with useFetcher
  const fetcher = useFetcher();

  function deleteExpenseItemHandler() {
    const proceed = confirm("Do you really want remove this item?");

    if (!proceed) {
      return;
    }

    // make a request without navigate to page
    fetcher.submit(null, {
      method: "delete",
      action: `/expenses/${id}`,
    });
  }

  const isSubmitting = fetcher.state !== "idle";

  if (isSubmitting) {
    return <article className="expense-item locked">Deleting ...</article>;
  }
  // __END DELETE #C

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        
        {/* __DELETE #A Form */}
        {/* <Form
          method="delete"
          action={`/expenses/${id}`}
        >
          <button>Delete</button>
        </Form> */}
        {/* __END DELETE #A*/}

        {/* __DELETE #B|C programmatically */}
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        {/* __END DELETE #B|C */}

        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
