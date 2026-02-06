"use client";

import Image from 'next/image';

/**
 * JWT Authentication Flow - Using generated image
 */

export default function JwtFlowDiagram() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <Image 
        src="/diagrams/jwt-flow.png"
        alt="JWT Authentication Flow - Complete request-response cycle with JWT tokens"
        width={1920}
        height={1080}
        className="w-full h-auto rounded-lg"
        priority
      />
    </div>
  );
}
