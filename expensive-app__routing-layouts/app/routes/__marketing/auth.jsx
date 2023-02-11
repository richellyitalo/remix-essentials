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
      await login(credentials);
      return redirect("/expenses");
    } else {
      await signup(credentials);
      return redirect("/expenses");
    }
  } catch (error) {
    if (error.status && [422, 401].includes(error.status)) {
      return { credentials: error.message };
    }

    return { credentials: "Something wront went." };
  }

  return null;
}

export default function AuthPage() {
  return <AuthForm />;
}
