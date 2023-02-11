import { redirect } from "@remix-run/node";
import { compare, hash } from "bcrypt";
import { prisma } from "./database.server";

export async function signup({ email, password }) {
  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (existingUser) {
    const error = new Error(
      "User already exists. Please provide a different email address."
    );
    error.status = 422;
    throw error;
  }

  const passwordHash = await hash(password, 16);

  await prisma.user.create({
    data: {
      email,
      password: passwordHash,
    },
  });
}

export async function login({ email, password }) {
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    const error = new Error("Please, check your credentials and try again.");
    error.status = 401;
    throw error;
  }

  const passwordValidated = await compare(password, user.password);

  if (!passwordValidated) {
    const error = new Error("Please, check your credentials and try again.");
    error.status = 401;
    throw error;
  }

  return redirect("/expenses");
}
