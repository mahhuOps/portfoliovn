// middleware.ts at project root
import createMiddleware from "next-intl/middleware";
import {locales} from "./lib/i18n";

export default createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "never"
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"]
};
