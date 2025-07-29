import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/protected')({
  component: RouteComponent,
  loader: async ({ context }) => {
    const userId = context.userId;
    const name = context.firstName

    return {userId, name}
  }
})

function RouteComponent() {
  const state = Route.useLoaderData();
  
  return <div>Hello {state.name}</div>
}
