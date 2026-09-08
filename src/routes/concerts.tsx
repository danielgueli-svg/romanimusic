import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/concerts")({
  beforeLoad: () => {
    throw redirect({ to: "/events" });
  },
});
