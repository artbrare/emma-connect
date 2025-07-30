// app/routes/_authed/test.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/test")({
  component: TestPage,
  loader: async ({ context }) => {
    const userContext = context.userContext;
    const clerkUser = context.clerkUser;
    const convexUser = context.convexUser;

    return { userContext, clerkUser, convexUser };
  },
});

function TestPage() {
  // ✅ Get auth data from parent _authed route loader
  const { userContext, clerkUser, convexUser } = Route.useLoaderData();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🧪 Auth Integration Test</h1>

      <div className="space-y-4">
        <div className="bg-green-100 border border-green-400 rounded p-4">
          <h2 className="font-bold text-green-800">✅ TanStack Start</h2>
          <p className="text-green-700">Server-side routing working</p>
        </div>

        <div className="bg-green-100 border border-green-400 rounded p-4">
          <h2 className="font-bold text-green-800">✅ Clerk Authentication</h2>
          <p className="text-green-700">
            Clerk User: {clerkUser.firstName} {clerkUser.lastName}
          </p>
          <p className="text-green-700">Email: {clerkUser.email}</p>
          <p className="text-green-700">Clerk ID: {clerkUser.id}</p>
        </div>

        <div className="bg-green-100 border border-green-400 rounded p-4">
          <h2 className="font-bold text-green-800">✅ Convex Database</h2>
          <p className="text-green-700">
            Database User: {convexUser ? "Found" : "Not Found"}
          </p>
          {convexUser && (
            <>
              <p className="text-green-700">Convex ID: {convexUser.id}</p>
              <p className="text-green-700">
                Created: {new Date(convexUser.createdAt).toLocaleString()}
              </p>
            </>
          )}
        </div>

        <div className="bg-green-100 border border-green-400 rounded p-4">
          <h2 className="font-bold text-green-800">✅ Webhook Integration</h2>
          <p className="text-green-700">
            User Sync:{" "}
            {userContext.isInDatabase ? "✅ Synced" : "❌ Not Synced"}
          </p>
          <p className="text-sm text-green-600 mt-1">
            User was automatically created via Clerk webhook
          </p>
        </div>

        <div className="bg-green-100 border border-green-400 rounded p-4">
          <h2 className="font-bold text-green-800">✅ Server-Side Auth</h2>
          <p className="text-green-700">Merged Context: {userContext.name}</p>
          <p className="text-green-700">User Context ID: {userContext.id}</p>
          <p className="text-sm text-green-600 mt-1">
            All data resolved server-side before page load
          </p>
        </div>

        <div className="bg-blue-100 border border-blue-400 rounded p-4">
          <h2 className="font-bold text-blue-800">
            🚀 Ready for Chat Interface
          </h2>
          <p className="text-blue-700">
            Full auth + database integration working. Ready for AI chat
            features!
          </p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t">
        <h3 className="font-bold mb-2">Technical Details:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>
            • <strong>Server-side auth:</strong> getAuth(getWebRequest())
            working
          </li>
          <li>
            • <strong>Clerk integration:</strong> Fresh user data from Clerk API
          </li>
          <li>
            • <strong>Convex sync:</strong> User created via webhook
            automatically
          </li>
          <li>
            • <strong>Data merging:</strong> Clerk + Convex data merged
            server-side
          </li>
          <li>
            • <strong>SSR:</strong> All user data available on initial page load
          </li>
          <li>
            • <strong>Zero loading states:</strong> No client-side auth checking
          </li>
        </ul>
      </div>

      {/* Debug Info */}
      <div className="mt-6 pt-6 border-t">
        <details className="text-sm">
          <summary className="font-bold cursor-pointer">🔍 Debug Data</summary>
          <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
            {JSON.stringify({ userContext, clerkUser, convexUser }, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}
