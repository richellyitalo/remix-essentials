import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

import mainStyles from "~/styles/shared.css";
import Error from "./components/util/Error";

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links = () => [
  {
    rel: "stylesheet",
    href: mainStyles,
  },
  {
    rel: "preconnect",
    crossOrigin: "true",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap",
  },
];

function Document({ children, title }) {
  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const catchData = useCatch();
  
  return (
    <Document title={catchData.statusText}>
      <Error title={catchData.statusText}>
        <p>
          {catchData.data?.message ||
            "Something wrong. Please update and try again."}
        </p>
        <p>
          Back to <Link to="/">Main page</Link>.
        </p>
      </Error>
    </Document>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <Document title="An error occurred">
      <Error title="An error occurred">
        <p>
          {error.message || "Something wrong. Please update and try again."}
        </p>
        <p>
          Back to <Link to="/">Main page</Link>.
        </p>
      </Error>
    </Document>
  );
}

// export function ErrorBoundary({error}) {
//   return (
//     <Document>
//       <Error>{error.message}</Error>
//     </Document>
//   );
// }

// export function ErrorBoundary({ error }) {
//   return (
//     <Document>
//       <Error>
//         <h1>Error</h1>
//         <p>{error.message}</p>
//         <p>The stack trace is:</p>
//         <pre>{error.stack}</pre>
//       </Error>
//     </Document>
//   );
// }
