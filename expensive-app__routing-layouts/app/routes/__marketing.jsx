import { Outlet } from "@remix-run/react";
import MainHeader from "~/components/navigation/MainHeader";
import { getSessionUserId } from "~/data/auth.server";
import marketingStyles from "~/styles/marketing.css";

export async function loader ({ request }) {
  return await getSessionUserId(request);
}

export default function PricingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: marketingStyles,
    },
  ];
}
