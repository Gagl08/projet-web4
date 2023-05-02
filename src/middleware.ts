export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard", "/profile", "/chat", "/chat/:path*"],
};
