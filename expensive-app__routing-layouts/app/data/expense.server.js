import { prisma } from "./database.server";

export async function addExpense(expenseData) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function getExpenses() {
  try {
    return await prisma.expense.findMany({
      orderBy: {
        dateAdded: "desc",
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function getExpense(id) {
  try {
    return await prisma.expense.findFirstOrThrow({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log("getExpense:catch", error);
    throw error;
  }
}

export async function updateExpense(expenseData) {
  try {
    return await prisma.expense.update({
      where: {
        id: 333,
      },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date)
      },
    });
  } catch (error) {
    throw error;
  }
}
