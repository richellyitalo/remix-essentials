import { redirect, Response } from "@remix-run/node"

export function loader ({ params }) {
    if (params['*'] === 'exp') {
        return redirect('expenses');
    }
    
    throw new Response('Splate root', {
        status: 404,
        statusText: 'Splat Route'
    });
}