import { redirect, createCookieSessionStorage } from "@remix-run/node";
import { compare, hash } from "bcryptjs";
import { prisma } from "./database.server";

const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  },
});

const { getSession, commitSession } = sessionStorage;

export async function getSessionUserId(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("userId");

  if (!userId) {
    return null;
  }

  return userId;
}

export async function destroySession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function requireUserSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const userId = session.get("userId");
  if (!userId) {
    throw redirect("/auth?mode=login");
  }

  return userId;
}

export async function createUserSession(userId, redirectPath) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);

  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

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

  const user = await prisma.user.create({
    data: {
      email,
      password: passwordHash,
    },
  });

  return await createUserSession(user.id, "/expenses?signup=1");
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

  return await createUserSession(user.id, "/expenses?login=1");
}

export { getSession, commitSession };
