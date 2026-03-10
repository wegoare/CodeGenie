"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@base-ui/react";
import { SignIn } from '@clerk/nextjs'

const Projects = () => {
  const projects = useQuery(api.projects.get)||[]; 

  const createProject = useMutation(api.projects.create);

  if (!projects) return <p>Loading...</p>;

  const handleCreate = async () => {
    await createProject({
      name: "New project123",
    });
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      
      <Button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleCreate}
      >
        Add new
      </Button>

      {projects.map((project) => (
        <div
          className="border rounded p-2 flex flex-col"
          key={project._id}
        >
          <p>{project.name}</p>
          <p>Owner ID: {project.ownerId}</p>
        </div>
      ))}
    </div>
  );
};

export default Projects;