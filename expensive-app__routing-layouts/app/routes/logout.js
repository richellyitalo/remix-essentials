import { json } from "@remix-run/node";
import { destroySession } from "~/data/auth.server";

export async function action ({ request }) {
  if (request.method !== "POST") {
    throw json({
      message: "Invalid method requested"
    }, {
      status: 400
    });
  }

  return await destroySession(request);
}