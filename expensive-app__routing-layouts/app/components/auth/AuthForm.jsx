import { Link, useSearchParams } from "@remix-run/react";
import { FaLock, FaPlus } from "react-icons/fa";

function AuthForm() {
  const [searchParams] = useSearchParams();

  const authMode = searchParams.get("mode") || "login";
  const isLogin = authMode === "login";
  const FormHeaderIcon = isLogin ? FaLock : FaPlus;
  const textSubmit = isLogin ? "Login" : "Sign Up";

  return (
    <form
      method="post"
      className="form"
      id="auth-form"
    >
      <div className="icon-img">
        <FormHeaderIcon />
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          required
        />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          minLength={7}
        />
      </p>
      <div className="form-actions">
        <button>{textSubmit}</button>
        {isLogin ? (
          <Link to="?mode=signup">Create a new User</Link>
        ) : (
          <Link to="?mode=login">Log in with existing user</Link>
        )}
      </div>
    </form>
  );
}

export default AuthForm;
