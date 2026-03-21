import { defineMiddleware } from "astro:middleware";
import { decrypt } from "@/lib/auth/session";

const ROLE_ROUTE_PREFIXES: Record<"student" | "teacher" | "analyst", string[]> = {
  student: ["/students"],
  teacher: ["/teachers"],
  analyst: ["/analyst"],
};

export const onRequest = defineMiddleware(async ({ cookies, locals, url, redirect }, next) => {
  const session = cookies.get("session")?.value;

  if (session) {
    try {
      const payload = await decrypt(session);
      locals.user = {
        id: payload.id as string,
        role: payload.role as 'student' | 'teacher' | 'analyst',
        name: payload.name as string,
      };
    } catch (error) {
      cookies.delete("session");
    }
  }

  // Allow Astro internal routes and static assets to bypass auth redirects.
  const isInternalRoute =
    url.pathname.startsWith("/_actions") ||
    url.pathname.startsWith("/_astro") ||
    url.pathname.startsWith("/api");

  const isStaticFile = /\.[a-z0-9]+$/i.test(url.pathname);

  if (isInternalRoute || isStaticFile) {
    return next();
  }

  // Basic route protection
  const isAuthPage = url.pathname.startsWith("/auth");
  const isPublicPage =
    url.pathname === "/" ||
    url.pathname === "/favicon.svg" ||
    url.pathname === "/403";

  if (!locals.user && !isAuthPage && !isPublicPage) {
    return redirect("/auth");
  }

  if (locals.user && isAuthPage) {
    return redirect("/home");
  }

  if (locals.user) {
    const rolePrefixes = ROLE_ROUTE_PREFIXES[locals.user.role];

    const isRoleScopedRoute =
      url.pathname.startsWith("/students") ||
      url.pathname.startsWith("/teachers") ||
      url.pathname.startsWith("/analyst");

    if (isRoleScopedRoute) {
      const canAccessRoleRoute = rolePrefixes.some((prefix) => url.pathname.startsWith(prefix));

      if (!canAccessRoleRoute) {
        return redirect("/403");
      }
    }
  }

  return next();
});
