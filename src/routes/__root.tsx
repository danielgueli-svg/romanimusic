import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { LocaleProvider, useI18n } from "@/i18n/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_NAME },
      { name: "description", content: SITE_TAGLINE },
      { name: "theme-color", content: "#F6F1E7" },
      { name: "author", content: SITE_NAME },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,560;0,9..144,640;1,9..144,400&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;1,400&display=swap",
      },
    ],
  }),
  component: RootDocument,
  notFoundComponent: NotFound,
});

function RootDocument() {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="text-fg" suppressHydrationWarning>
        <PreviewHostBridge />
        <LocaleProvider>
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        </LocaleProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center text-fg">
      <p className="text-xs uppercase tracking-[0.2em] text-mark">404</p>
      <h1 className="mt-3 font-display text-3xl">{t("notFound.title")}</h1>
      <p className="mt-3 max-w-md text-sm text-muted">{t("notFound.body")}</p>
      <a href="/" className="mt-6 text-sm text-fg underline">
        {t("notFound.back")}
      </a>
    </div>
  );
}
