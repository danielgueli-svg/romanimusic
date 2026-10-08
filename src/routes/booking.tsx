import { createFileRoute, redirect } from "@tanstack/react-router";

/** Static Intermusica-look booking tip lives at public/booking/ (Worker assets). */
export const Route = createFileRoute("/booking")({
  beforeLoad: () => {
    throw redirect({ href: "https://www.romanimusic.com/booking/", statusCode: 301 });
  },
});
