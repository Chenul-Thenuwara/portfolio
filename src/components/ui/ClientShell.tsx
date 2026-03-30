"use client";

import dynamic from "next/dynamic";

// These components use browser-only APIs (mousemove, WebGL, window)
// They must live inside a Client Component boundary for `ssr: false` to work
const CinematicCursor = dynamic(
  () => import("@/components/cursor/CinematicCursor"),
  { ssr: false }
);

const CinematicOverlay = dynamic(
  () => import("@/components/ui/CinematicOverlay"),
  { ssr: false }
);

export default function ClientShell() {
  return (
    <>
      <CinematicOverlay />
      <CinematicCursor />
    </>
  );
}
