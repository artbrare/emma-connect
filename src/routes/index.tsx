import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/tanstack-react-start";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { user, isLoaded } = useUser();

  if(!isLoaded) {
    return <></>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="p-6 border-b flex justify-between items-center">
        <h1 className="text-2xl font-bold">Emma Connect</h1>

        <div className="flex items-center gap-4">
          <SignedIn>
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.firstName || "User"}!
            </span>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Your Intelligent Personal Assistant
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Emma Connect handles your finances, tracks your food, manages your
            calendar, and talks to you through WhatsApp.
          </p>

          <SignedOut>
            <SignInButton mode="modal">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Started with Emma 🚀
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Button size="lg" className="text-lg px-8 py-6">
              Welcome back, {user?.firstName}! 🎉
            </Button>
          </SignedIn>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Finance Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Track expenses and income without the hassle
              </p>
              <SignedIn>
                <Button className="mt-4 w-full" variant="outline">
                  Manage Finances
                </Button>
              </SignedIn>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calorie Counter</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Monitor your nutrition without judgment
              </p>
              <SignedIn>
                <Button className="mt-4 w-full" variant="outline">
                  Track Calories
                </Button>
              </SignedIn>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Smart Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Schedule management that actually helps
              </p>
              <SignedIn>
                <Button className="mt-4 w-full" variant="outline">
                  View Calendar
                </Button>
              </SignedIn>
            </CardContent>
          </Card>
        </div>

        <SignedOut>
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Sign in to access all Emma Connect features
            </p>
            <SignInButton mode="modal">
              <Button variant="outline">Create Account</Button>
            </SignInButton>
          </div>
        </SignedOut>
      </main>
    </div>
  );
}
