import { Form } from "@remix-run/react";
import AuthForm from "~/components/auth/AuthForm";
import SiteHeader from "~/components/nav/SiteHeader";

export default function AuthPage() {
  return (
    <div className="container mx-auto">
      <SiteHeader />
      <AuthForm />
    </div>
  );
}
