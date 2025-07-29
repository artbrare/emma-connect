import { clerkClient, getAuth } from "@clerk/tanstack-react-start/server";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

const authStateFn = createServerFn({ method: "GET" }).handler(async () => {
  const { userId } = await getAuth(getWebRequest());

  if (!userId) {
    throw redirect({
      to: "/sign-in/$",
    });
  }

  const user = userId ? await clerkClient().users.getUser(userId) : null;

  return { userId, firstName: user?.firstName };
});

export const Route = createFileRoute("/_authed")({
  component: RouteComponent,
  beforeLoad: () => authStateFn(),
  loader: async ({ context }) => {
    return { userId: context.userId, firstName: context.firstName };
  },
});

function RouteComponent() {
  return <Outlet/>;
}
