'use client'

import Image from 'next/image';

/**
 * JWT vs Session Authentication - Using generated image
 */

export default function JwtVsSessionDiagram() {
  return (
    <div className="w-full">
      <Image 
        src="/diagrams/jwt-vs-session.png"
        alt="JWT vs Session Authentication - Understanding the key differences"
        width={1920}
        height={1080}
        className="w-full h-auto rounded-lg"
        priority
      />
    </div>
  )
}
