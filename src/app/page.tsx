"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@base-ui/react";
import { SignIn } from '@clerk/nextjs'
import { ProjectsView } from "../features/projects/components/projects-view";

const Home= () => {
  return <ProjectsView />
};

export default Home;