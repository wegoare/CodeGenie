"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function TestPage() {
  const data = useQuery(api.test.hello);

  return (
    <div>
      <h1>Convex Test</h1>
      <p>{data}</p>
    </div>
  );
}