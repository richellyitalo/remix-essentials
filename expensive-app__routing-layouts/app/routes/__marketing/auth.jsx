import { redirect } from "@remix-run/node";
import AuthForm from "~/components/auth/AuthForm";
import { login, signup } from "~/data/auth.server";
import { validateCredentials } from "~/data/validation.server";
import authStyles from "~/styles/auth.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: authStyles,
  },
];

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  try {
    if (authMode === "login") {
      return await login(credentials);
    } else {
      return await signup(credentials);
    }
  } catch (error) {
    if (error.status && [422, 401].includes(error.status)) {
      return { credentials: error.message };
    }

    return { credentials: "Something wrong went." };
  }
}

export function headers ({
  actionHeaders,
  loaderHeaders,
  parentHeaders
}) {
  return {
    "Cache-Control": parentHeaders.get("Cache-Control"),
  }
}

export default function AuthPage() {
  return <AuthForm />;
}
