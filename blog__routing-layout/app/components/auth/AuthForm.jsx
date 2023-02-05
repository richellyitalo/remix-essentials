import { Form, Link, useSearchParams } from "@remix-run/react";

export default function AuthForm() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";
  const isLogin = mode === "login";
  const title = isLogin ? "Login" : "Sign Up";
  const textButtonSubmit = isLogin ? "Login" : "Sign up";
  const textAlternativeAction = isLogin
    ? "Create a new user"
    : "Login with a existing user";
  const gotoMode = isLogin ? "signup" : "login";

  return (
    <Form>
      <h1 className="text-lg font-bold mb-3 border-b">{title}</h1>
      <p className="mb-3">
        <label className="font-bold">Email</label>
        <input
          type="email"
          name="email"
          className="p-2 border rounded-sm block"
        />
      </p>
      <p className="mb-3">
        <label className="font-bold">Password</label>
        <input
          type="password"
          name="password"
          className="p-2 border rounded-sm block"
        />
      </p>
      <p class="flex">
        <button className="p-2 px-4 bg-blue-200 rounded">
          {textButtonSubmit}
        </button>
      </p>
      <p className="mt-3">
        <Link
          to={`?mode=${gotoMode}`}
          className="text-slate-400 hover:text-slate-800"
        >
          {textAlternativeAction}
        </Link>
      </p>
    </Form>
  );
}
