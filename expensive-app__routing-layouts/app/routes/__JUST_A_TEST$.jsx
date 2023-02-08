import { json, redirect, Response } from "@remix-run/node"

export function loader ({ params }) {
    if (params['*'] === 'exp') {
        return redirect('expenses');
    }

    // throw json({ message: "Page not found" }, { status: 404, statusText: 'Page not found' });

    throw new Response('Splate root', {
        status: 404,
        statusText: 'Splat Route'
    });
}