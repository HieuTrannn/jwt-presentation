"use client";

import Image from "next/image";

/**
 * Refresh Token Strategy - Using generated image
 */

export default function RefreshTokenFlowDiagram() {
  return <div className="w-full">
    <Image
      src="/diagrams/refresh-token-flow.png"
      alt="Refresh Token Strategy - Secure session management with short-lived access tokens"
      width={1920}
      height={1080}
      className="w-full h-auto rounded-lg"
      priority
    />
  </div>;
}
