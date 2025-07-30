// app/routes/_authed.tsx
import { clerkClient, getAuth } from "@clerk/tanstack-react-start/server";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { ConvexReactClient } from "convex/react";
import { api } from "../../convex/_generated/api";

// Server function para auth + user data
const authStateFn = createServerFn({ method: "GET" }).handler(async () => {
  const { userId } = await getAuth(getWebRequest());

  if (!userId) {
    throw redirect({
      to: "/sign-in/$", 
    });
  }

  // 2. Get fresh Clerk user data
  const clerkUser = await clerkClient().users.getUser(userId);
  
  // 3. Get Convex user data (for relationships) - Create server-side client
  const convexClient = new ConvexReactClient(process.env.VITE_CONVEX_URL!);
  const convexUser = await convexClient.query(api.users.getCurrentUser, { 
    clerkId: userId 
  });

  // 4. Convert ALL data to plain serializable objects
  const serializableClerkUser = {
    id: clerkUser.id,
    firstName: clerkUser.firstName || "",
    lastName: clerkUser.lastName || "",
    email: clerkUser.emailAddresses[0]?.emailAddress || "",
    imageUrl: clerkUser.imageUrl || "",
  };

  const serializableConvexUser = convexUser ? {
    id: convexUser._id.toString(), // Convert Id<"users"> to string
    clerkId: convexUser.clerkId,
  } : null;

  const serializableUserContext = {
    id: serializableConvexUser?.id || null,
    clerkId: userId,
    name: `${serializableClerkUser.firstName} ${serializableClerkUser.lastName}`.trim(),
    email: serializableClerkUser.email,
    imageUrl: serializableClerkUser.imageUrl,
    isInDatabase: !!convexUser,
  };

  return { 
    userId: userId,
    clerkUser: serializableClerkUser,
    convexUser: serializableConvexUser,
    userContext: serializableUserContext,
  };
});

export const Route = createFileRoute("/_authed")({
  // ✅ Use beforeLoad to make auth data available to all child routes
  beforeLoad: async () => {
    const authData = await authStateFn();
    return authData;
  },
  component: AuthedLayout,
});

function AuthedLayout() {
  const authData = Route.useRouteContext()
  const { userContext } = authData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Emma Connect</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {userContext.name}!
              </span>
              
              {userContext.imageUrl && (
                <img 
                  src={userContext.imageUrl} 
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
              )}
              
              <a 
                href="/api/auth/sign-out" 
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}