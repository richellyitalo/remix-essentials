import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { FaLock, FaPlus } from "react-icons/fa";

function AuthForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const validationErrors = useActionData();

  const authMode = searchParams.get("mode") || "login";
  const isLogin = authMode === "login";
  const FormHeaderIcon = isLogin ? FaLock : FaPlus;
  const navigation = useNavigation();

  const isSubmitting = navigation.state !== "idle";

  // function toggleModeHandler(event) {
  //   event.preventDefault();
  //   setSearchParams({ mode: isLogin ? "signup" : "login" });
  // }

  let textSubmit = isLogin ? "Login" : "Sign Up";

  if (isSubmitting) {
    textSubmit = isLogin ? "...Loging" : "...Signing Up";
  }

  return (
    <Form
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

      {validationErrors && validationErrors.email && (
        <div className="error-input-form">{validationErrors.email}</div>
      )}

      <p>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          minLength={7}
        />
      </p>

      {validationErrors && validationErrors.password && (
        <div className="error-input-form">{validationErrors.password}</div>
      )}

      {validationErrors && validationErrors.credentials && (
        <div className="error-input-form">{validationErrors.credentials}</div>
      )}

      <div className="form-actions">
        <button disabled={isSubmitting}>{textSubmit}</button>
        {isLogin ? (
          <Link to="?mode=signup">Create a new User</Link>
        ) : (
          <Link to="?mode=login">Log in with existing user</Link>
        )}
      </div>
    </Form>
  );
}

export default AuthForm;
