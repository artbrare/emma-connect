/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { ClerkProvider } from "@clerk/tanstack-react-start";
import { createServerFn } from "@tanstack/react-start";
import { getAuth } from "@clerk/tanstack-react-start/server";
import { getWebRequest } from "@tanstack/react-start/server";
import appCss from "@/styles/app.css?url";

const fetchClerkAuth = createServerFn({ method: "GET" }).handler(async () => {
  const { userId } = await getAuth(getWebRequest()!);
  return {
    userId,
  };
});

export const Route = createRootRoute({
  beforeLoad: async () => {
    const { userId } = await fetchClerkAuth();
    return {
      userId,
    };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Emma Connect - Your Intelligent Personal Assistant",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <ClerkProvider>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </ClerkProvider>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
