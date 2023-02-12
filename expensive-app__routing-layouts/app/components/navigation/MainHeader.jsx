import { Form, Link, useLoaderData } from "@remix-run/react";
import Logo from "../util/Logo";

function MainHeader() {
  const userId = useLoaderData();

  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/pricing">Pricing</a>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <ul>
          <li>
            {userId ? (
              <Form
                method="post"
                action="/logout"
              >
                <button className="cta">Logout</button>
              </Form>
            ) : (
              <Link
                to="/auth"
                className="cta"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
