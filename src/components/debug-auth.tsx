"use client";

import { useAuth } from "@clerk/nextjs";

export function DebugAuth() {
  const { userId, isLoaded } = useAuth();

  console.log("Auth loaded:", isLoaded);
  console.log("User ID:", userId);

  return null;
}