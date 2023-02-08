import AuthForm from "~/components/auth/AuthForm";
import authStyles from "~/styles/auth.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: authStyles,
  },
];

export async function action ({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get('mode') || 'login';

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  console.log(credentials);

  await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));

  if (authMode === 'login') {
    // do login
  } else {
    // do signup
  }

  return null
}

export default function AuthPage() {
  return <AuthForm />;
}
