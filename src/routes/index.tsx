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

  if (!isLoaded) {
    return <></>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute opacity-[0.025]"
          style={{
            top: "-100px",
            left: "-50px",
            width: "400px",
            height: "400px",
            background: "#64748b",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            transform: "rotate(15deg)",
          }}
        />
        <div
          className="absolute opacity-[0.03]"
          style={{
            top: "100px",
            right: "-100px",
            width: "350px",
            height: "350px",
            background: "#3b82f6",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            transform: "rotate(-30deg)",
          }}
        />
        <div
          className="absolute opacity-[0.02]"
          style={{
            top: "300px",
            left: "30%",
            width: "300px",
            height: "300px",
            background: "#8b5cf6",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            transform: "rotate(45deg)",
          }}
        />
        <div
          className="absolute opacity-[0.025]"
          style={{
            bottom: "-50px",
            left: "10%",
            width: "320px",
            height: "320px",
            background: "#64748b",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            transform: "rotate(-15deg)",
          }}
        />
        <div
          className="absolute opacity-[0.03]"
          style={{
            bottom: "200px",
            right: "5%",
            width: "280px",
            height: "280px",
            background: "#3b82f6",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            transform: "rotate(60deg)",
          }}
        />
        <div
          className="absolute opacity-[0.022]"
          style={{
            top: "50%",
            left: "-80px",
            width: "250px",
            height: "250px",
            background: "#8b5cf6",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            transform: "rotate(-45deg)",
          }}
        />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 min-h-screen">
        <nav className="p-6 border-b border-slate-200/50 flex justify-between items-center bg-white/80 backdrop-blur-sm">
          <h1
            className="text-2xl font-bold 
  bg-gradient-to-br from-blue-600 to-cyan-500 
  hover:from-blue-700 hover:to-cyan-600 
  bg-clip-text text-transparent 
  transition-all duration-300 cursor-default 
  hover:scale-[1.02]"
          >
            Emma Connect
          </h1>
          <div className="flex items-center gap-4">
            <SignedIn>
              <span className="text-sm text-gray-600">
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
            <h2 className="text-4xl font-bold tracking-tight mb-4 text-gray-900">
              Your Intelligent Personal Assistant
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
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
            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-gray-900">
                  Finance Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Track expenses and income without the hassle
                </p>
                <SignedIn>
                  <Button className="mt-4 w-full" variant="outline">
                    Manage Finances
                  </Button>
                </SignedIn>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-gray-900">Calorie Counter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Monitor your nutrition without judgment
                </p>
                <SignedIn>
                  <Button className="mt-4 w-full" variant="outline">
                    Track Calories
                  </Button>
                </SignedIn>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-gray-900">Smart Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
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
              <p className="text-gray-600 mb-4">
                Sign in to access all Emma Connect features
              </p>
              <SignInButton mode="modal">
                <Button variant="outline">Create Account</Button>
              </SignInButton>
            </div>
          </SignedOut>
        </main>
      </div>
    </div>
  );
}
