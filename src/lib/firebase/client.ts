"use client";

import { getApps, initializeApp } from "firebase/app";
import { getAI, GoogleAIBackend } from "firebase/ai";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

export const firebaseApp = getApps().length > 0 ? getApps()[0]! : initializeApp(firebaseConfig);

// Init App Check only in browser
if (
  typeof window !== "undefined" &&
  process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY &&
  !(window as Window & { __appCheckInitialized?: boolean }).__appCheckInitialized
) {
  initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY),
    isTokenAutoRefreshEnabled: true,
  });
  (window as Window & { __appCheckInitialized?: boolean }).__appCheckInitialized = true;
}

export const firebaseAI = getAI(firebaseApp, { backend: new GoogleAIBackend() });
